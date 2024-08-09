# Mattermost

A mattermost server you can run on your local machine, packaged up as a single artifact and deployed with `uds deploy .`

## Quickstart

```sh
# copy the core-slim zarf package to the local directory core-slim
uds run create-uds-bundle
uds deploy . --confirm
#open a browser to https://chat.uds.dev
```

## Components

The uds-bundle.yaml has multiple components in in, some of which are local references and others are remote oci references.

The ./core-slim, ./dev-secrets, and ./namespaces are all local references. Take a look at each to see what is happening.

**note:** for convenience, some zarf packages are committed to the repo. This is not recommended, instead we would publish those as OCI artifacts (`uds zarf tools registry push ...`)


# Potential Exercises

1. How would you add a task to deploy the bundle?
2. How would you add podinfo to the bundle?