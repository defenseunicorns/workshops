# Deploying Svelte App into UDS Core

### [UDS Core Docs](https://uds.defenseunicorns.com/core/)

### Prerequisite:

- UDS Core Deployed and Running 

### Zarf Package and Deploy Svelte App



```bash
uds run build-ui-image
uds run package-ui
uds zarf package deploy build/{zarf-package.tar.zst}
```
> [!NOTE]
> The deployment of this app can be monitored by running `uds z t m` and monitoring all namespaces or the the 'svelte-ui' namespace. 

Svelte has been successfully deployed when the pod is healthy and you can acess http://svelte.uds.dev in your browser. 
