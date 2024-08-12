# Deploying Mattermost into [UDS Core](https://uds.defenseunicorns.com/core/)

This exercise will lead you through building and deploying Mattermost using UDS Bundle, UDS Tasks, and Zarf Packages.

This package will consist of

- Zarf configured Kubernetes namespaces for postgres-operator's cross namespace secret creation
- Zarf configured secret management with minio
- UDS Bundle with all of the configuration to deploy Mattermost into a cluster

This deploys a mattermost server you can run on your local machine, packaged up as a single artifact (UDS Bundle tarball).

### Prerequisite:

- UDS Core Deployed and Running
  OR
- Build and configure k3d/uds core into your own UDS Bundle (Follow up exercise at the end)

### Lets Begin

The meat and potatoes of the package are already here. Running these will fail initially. The files they are referencing have commented out pieces to make sure you get eyes on the key pieces to make this example package work. We encourage you to follow the bread crumbs starting in the [task.yaml](tasks.yaml) file at the calls you will be making defined below.

```bash
# List all available UDS Tasks defined in the tasks.yaml
# Study what these tasks do
uds run --list
```

### Context on what these tasks are doing so you can do them too

UDS tasks are here to make life simpler, but you could perform all of these tasks running the same `uds` commands that the tasks are ultimately using. If you wanted to.

## Components

### Local

The uds-bundle.yaml has multiple components in in, some of which are local references and others are remote oci references. This is to show the multiple avenues to package up applications. For air gapped deployment, The entire UDS Bundle will be built into one single artifact `uds-*.tar.zst`.

The ./core-slim (not used until "addition exercises" at the end), ./dev-secrets, and ./namespaces are all local references (and are pre-built). Take a look at each to see what is happening. They are referenced in `uds-bundle.yaml` with the `path:` definition.

**note:** for convenience, some zarf packages are committed to the repo. This is not recommended, instead we would publish those as OCI artifacts (`uds zarf tools registry push ...`).

### Remote

In this example the components of this application that pull from an oci registry are in `uds-bundle.yaml` directly. All of the applications that pull from the internet have the `repository:` definition followed by the oci registry url. Take a look at the `uds-bundle.yaml to to see these components.

## Build and deploy the UDS Bundle

### Once all of the code is uncommented, you can build and deploy a UDS Bundle with the two commands below

```sh
uds run build-mattermost-bundle
uds deploy . --confirm
#open a browser to https://chat.uds.dev
```
