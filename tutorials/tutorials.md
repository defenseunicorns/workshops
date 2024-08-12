# Creating a UDS Bundle for Mattermost

## Introduction

In this tutorial, we will demonstrate the process to create a UDS (Unicorn Delivery Service) bundle for Mattermost, from defining a `uds-bundle.yaml`, integrating with associated Zarf packages, and finally building the bundle with UDS CLI commands.

Although UDS (and Zarf before it) were designed to support air-gapped environments natively, this tutorial makes use of Github's container registry so an Internet connection is required. As an alternative, you could follow the Zarf tutorials at [Zarf Docs](https://docs.zarf.dev/) to build the required packages ahead of time and reference them locally instead.

## System Requirements

- You'll need an internet connection to pull down the required artifacts/packages required to build the bundle in this tutorial.

## Prerequisites

Before beginning this tutorial you will need the following:

- A text editor or development environment such as VSCode
- UDS CLI installed on your $PATH [Install UDS CLI](https://github.com/defenseunicorns/uds-cli)
- Docker installed and running (for building and testing locally)
- K3D installed and running
- UDS-core installed into K3D
  The `k3d-core-slim-dev` bundle will accomplish both tasks for you [K3D Core Slim Dev Bundle](https://github.com/defenseunicorns/uds-core) as well as ensuring any required Custom Resource Definitions (CRD's) are installed as well.

Quick start using [Homebrew](https://brew.sh/):

```bash
brew tap defenseunicorns/tap && brew install \
zarf \
k3d \
kubectl \
helm \
uds

uds deploy k3d-core-slim-dev:0.25.2 --confirm
```

## Putting Together a UDS Bundle

In order to create a UDS bundle, you first need to have an idea of what application(s) you want to package. In this example, we will be packaging Mattermost, but the steps and tools used below are applicable for other applications as well.

### Creating the Bundle Definition

A `uds-bundle.yaml` file allows us to bundle all required metadata and the associated set of packages we want to deploy. We start a bundle definition by setting the kind to 'UDSBundle' and required metadata including the `name`,`description`, and `version` of the bundle. Create a new `uds-bundle.yaml` with the following content:

```yaml
kind: UDSBundle
metadata:
  name: k3d-mattermost-demo
  description: A UDS bundle for deploying the UDS Mattermost Factory with uds-core slim on a local cluster
  version: 0.0.1

packages:
# Add packages here
```

### Pre-create any namespaces that need to exist early in the installation process

We use a ZarfPackageConfig kind to pre-create any early namespaces. This isn't always required but can be helpful when services require the presence of a namespace ahead of time (typically for cross-namespace secret storage).
Create a `mattermost-ns.yaml` in a `namespaces` sub-directory:

```yaml
kind: Namespace
apiVersion: v1
metadata:
  name: mattermost
```

Create a `zarf.yaml` also in the `namespaces` directory:

```yaml
# Deployed prior to the packages to facilitate use of the postgres-operator cross namespace secret creation
kind: ZarfPackageConfig
metadata:
  name: dev-namespaces
  description: "create namespaces for cross-ns secret functionality of pg operator"
  version: 0.1.0

components:
  - name: deploy-namespace-for-cross-ns-secrets-test
    required: true
    manifests:
      - name: dev-namespaces
        files:
          - mattermost-ns.yaml
```

### Setting up Dev Secrets

We use this ZarfPackageConfig as part of our UDS Bundle to ensure required secrets are created and made available to downstream services. In this case we're having UDS use `kubectl` to pull a couple secrets that were created by the minio install from the dev-minio namespace then save them as variables for later use.
Create a `zarf.yaml` file in a `dev-secrets` sub-directory:

```yaml
kind: ZarfPackageConfig
metadata:
  name: dev-secrets
  version: "0.1.0"

components:
  - name: minio-password
    required: true
    actions:
      onDeploy:
        before:
          - cmd: ./zarf tools kubectl get secret -n dev-minio minio --template='{{ index .data "rootPassword" }}' | base64 -d
            mute: true
            setVariables:
              - name: SECRET_KEY
                sensitive: true
          - cmd: ./zarf tools kubectl get secret -n dev-minio minio --template='{{ index .data "rootUser" }}' | base64 -d
            mute: true
            setVariables:
              - name: ACCESS_KEY
                sensitive: true
```

### Add the required packages

Our Mattermost Zarf UDS package requires a few supporting packages to exist so we'll define those first since UDS packages inside a bundle are processed serially. Supporting packages in this case include pre-creation of some namespaces to support package-specific requirements, minio (an open source AWS S3 alternative providing object storage), a PostgreSQL relational database operator, and some secrets.

Let's add them to our UDSBundle:

```yaml
# Namespaces are deployed prior to the packages to facilitate use of the postgres-operator cross namespace secret creation
- name: dev-namespaces
  path: ./namespaces
  ref: 0.1.0

# Minio is an AWS S3 object storage alternative
- name: dev-minio
  repository: ghcr.io/defenseunicorns/packages/uds/dev-minio
  ref: 0.0.2

# PostgreSQL is a relational database management system
- name: postgres-operator
  repository: ghcr.io/defenseunicorns/packages/uds/postgres-operator
  ref: 1.12.2-uds.2-upstream
  overrides:
    postgres-operator:
      uds-postgres-config:
        variables:
          - name: POSTGRESQL
            description: "Configure postgres using CRs via the uds-postgres-config chart"
            path: postgresql
            default:
              enabled: true
              teamId: "uds"
              volume:
                size: "10Gi"
              numberOfInstances: 1
              users:
                mattermost.mattermost: []
              databases:
                mattermost: mattermost.mattermost
              version: "14"
              ingress:
                - remoteNamespace: mattermost

# Pull required secrets
- name: dev-secrets
  path: ./dev-secrets
  ref: 0.1.0
  exports:
    - name: ACCESS_KEY
    - name: SECRET_KEY
# Add mattermost here
```

### Adding the Mattermost Component

Now let's go ahead and add our Mattermost component, add the following to the bottom of our `uds-bundle.yaml`, still inside the `packages` stanza at the bottom:

```yaml
# Mattermost package
- name: mattermost
  repository: ghcr.io/defenseunicorns/packages/uds/mattermost
  ref: 9.10.1-uds.0-upstream
  imports:
    - name: ACCESS_KEY
      package: dev-secrets
    - name: SECRET_KEY
      package: dev-secrets
  overrides:
    mattermost:
      uds-mattermost-config:
        values:
          - path: "objectStorage.secure"
            value: "false"
          - path: "objectStorage.endpoint"
            value: "minio.dev-minio.svc.cluster.local:9000"
          - path: "objectStorage.bucket"
            value: "uds-mattermost-dev"
          - path: "postgres.host"
            value: "pg-cluster.postgres.svc.cluster.local"
          - path: "postgres.connectionOptions"
            value: "?connect_timeout=10"
          - path: "postgres.username"
            value: "mattermost.mattermost"
        variables:
          - name: MATTERMOST_RESOURCES
            path: "resources"
            default:
              limits:
                cpu: 100m
                memory: 300Mi
              requests:
                cpu: 100m
                memory: 300Mi
```

### Defining Build Tasks

UDS Tasks are commands or scripts that are used to perform various actions associated with the UDS bundle. In this tutorial, we're using them to build each of the underlying zarf packages that we created with our `zarf.yaml` files above as well as bundle those packages into our single UDS bundle.

Create a `tasks.yaml` file in the top-level directory for your bundle:

```yaml
tasks:
  - name: build-namespaces
    actions:
      - cmd: uds zarf package create . --confirm
        dir: ./namespaces

  - name: build-dev-secrets
    actions:
      - cmd: uds zarf package create . --confirm
        dir: ./dev-secrets

  - name: build-mattermost-bundle
    description: "Build the Mattermost UDS bundle"
    actions:
      - task: build-dev-secrets
      - task: build-namespaces
      - cmd: uds create . --confirm
```

### Building the UDS Bundle

Now that we have created all of the artifacts, we're ready to build the complete Mattermost UDS bundle, run the following command which references the tasks we created in our `tasks.yaml` above:

```bash
uds run build-mattermost-bundle
```

This command will create a UDS bundle in the current directory.

## Conclusion

Congratulations! You've built the Mattermost UDS bundle. Now, you can deploy this bundle using either the K3D cluster you have waiting or another cluster of your choosing:

```bash
uds deploy uds-bundle-k3d-mattermost-demo-arm64-0.0.1.tar.zst --confirm
```

## Cleanup and Uninstall

To uninstall the components you installed as part of this tutorial, you can run the following commands:

```bash
k3d cluster delete uds
brew uninstall \
uds \
zarf \
kubectl \
helm \
k3d

brew untap defenseunicorns/tap

# Remove your tutorial directory
```

You can uninstall homebrew itself by following the instructions found in [Homebrew's GitHub](https://github.com/homebrew/install#uninstall-homebrew)

## Troubleshooting

If you encounter an error like "Failed to create bundle: unable to read the uds-bundle.yaml file", make sure you are in the correct directory containing the `uds-bundle.yaml` file.

For other issues, check:

1. All required CLI tools (UDS, Zarf) are correctly installed and up to date.
2. You have necessary permissions to pull images from specified repositories.
3. You have installed UDS-Core and the required CRD's into your kubernetes cluster.
4. Your kubernetes cluster, if not using K3D, has a default `storageclass` set.
5. Check if your network connection is having trouble pulling remote packages or images.
