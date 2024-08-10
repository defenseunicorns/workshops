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
- Build and configure k3d/uds core into your own UDS Bundle (Follow up exercise)

## Quickstart - at the finish you will be able to build and deploy a UDS Bundle with the two commands below

```sh
# copy the core-slim zarf package to the local directory core-slim
uds run build-mattermost-bundle
uds deploy . --confirm
#open a browser to https://chat.uds.dev
```

### Lets Begin

The meat and potatoes of the package are already here. Running these will fail initially. The files they are referencing have commented out pieces to make sure you get eyes on the key pieces to make this example package work. We encourage you to follow the bread crumbs starting in the [task.yaml](tasks.yaml) file at the calls you will be making defined below.

## Components

The uds-bundle.yaml has multiple components in in, some of which are local references and others are remote oci references.

The ./core-slim, ./dev-secrets, and ./namespaces are all local references. Take a look at each to see what is happening.

**note:** for convenience, some zarf packages are committed to the repo. This is not recommended, instead we would publish those as OCI artifacts (`uds zarf tools registry push ...`)

# Potential Exercises

1. How would you add a task to deploy the bundle?
2. How would you add podinfo to the bundle?
