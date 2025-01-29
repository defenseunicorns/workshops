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
> The deployment of this app can be monitored by running `uds zarf tools monitor`. There you can monitor all namespaces or the 'svelte-ui' namespace.

Svelte has been successfully deployed when the pod is healthy and you can access http://svelte.uds.dev in your browser.
