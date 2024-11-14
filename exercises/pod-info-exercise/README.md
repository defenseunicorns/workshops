# Deploying Pod Info into UDS Core

### [UDS Core Docs](https://uds.defenseunicorns.com/core/)

### Prerequisite:

- UDS Core Deployed and Running

### Zarf Package and Deploy Pod Info

```bash
uds zarf package create
uds zarf package deploy {zarf-package.tar.zst}
```
> [!NOTE]
> The deployment of this app can be monitored by running `uds z t m` and monitoring all namespaces or the the 'podinfo' namespace. 

Once the package is deployed into the cluster the Pod Info app is accessible via browser at https://podinfo.uds.dev/
