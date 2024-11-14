# Deploying Pod Info into UDS Core

### [UDS Core Docs](https://uds.defenseunicorns.com/core/)

### Prerequisite:

- UDS Core Deployed and Running

### Zarf Package and Deploy Pod Info
- Look at the zarf.yaml file, this zarf package pulls from upstream helm charts and image to build the zarf package
- Look at the uds-package.yaml. This uses PEPR to allow traffic to access the podinfo app from a browser.

```bash
uds zarf package create
uds zarf package deploy {zarf-package.tar.zst}
```
> [!NOTE]
> The deployment of this app can be monitored by running `uds z t m` and monitoring all namespaces or the the 'podinfo' namespace.

Once the package is deployed into the cluster the Pod Info app is accessible via browser at https://podinfo.uds.dev/
