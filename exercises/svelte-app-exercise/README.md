# Deploying Svelte App into [UDS Core](https://uds.defenseunicorns.com/core/)
This exercise will lead you through building and deploying a Svelte UI application zarf package.

This package will consist of

* A locally built docker image
* Basic manifests needed to deploy the application
* A UDS custom resource to expose this application and create network policies for us. This will leverage the UDS Operator(Pepr) found in UDS Core to automatically create and configure those resources for us.

### [UDS Core Docs](https://uds.defenseunicorns.com/core/)

### Prerequisite:

- UDS Core Deployed and Running

### Lets Begin
The meat and potatoes of the package are already here. Running these will fail initially. The files they are referencing have commented out pieces to make sure you get eyes on the key pieces to make this example package work. We encourage you to follow the bread crumbs found in the [task.yaml](tasks.yaml) file at the calls you will be making defined below.

```bash
# List all available UDS Tasks defined in the tasks.yaml
# Study what these tasks do
uds run --list

# Build the local docker image
uds run build-local-image

# Create the Zarf package
uds run create-zarf-package

# Deploy the Zarf package
uds run deploy-zarf-package

# Build the image, create the zarf package, redeploy, and cycle the pod
uds run update-zarf-package
```

### Context on what these tasks are doing so you can do them too
UDS tasks are here to make life simpler, but you could perform all of these tasks running the same `uds` commands that the tasks are ultimately using. If you wanted to.

```bash
# Build the local docker image
uds run build-local-image
```
There is a [Dockerfile](Dockerfile) at the root of this directory. Pieces may be commented out to force exploration, so go check it out and understand. It contains the instructions to create the needed image for this application. This uds task will run the command to build this image.

```bash
# Create the Zarf package
uds run create-zarf-package
```
There is a [zarf.yaml](zarf.yaml) file at the root of this directory. Pieces may be commented out to force exploration, so go check it out and understand. This zarf file defines the needed components to package up the manifest files, and the image you built. [More docs](https://docs.zarf.dev/ref/components/) on the different pieces you can define in your zarf package(i.e. helm charts, manifests, etc.)

```bash
# Deploy the Zarf package
uds run deploy-zarf-package
```
Once you have created the zarf package, this task will deploy it to the cluster.

```bash
# Build the image, create the zarf package, redeploy, and cycle the pod
uds run update-zarf-package
```
You can use this to run everything once you have deployed and want to make an update to the application itself.

### UDS Core highlight
In this example, one of the manifests we are creating is the [uds-package.yaml](manifests/uds-package.yaml). This is key to automatically exposing the application via a virtual service and creating its network policies. There are other things we can configure that the UDS Operator(Pepr) inside of UDS Core will automatically pick up on and configure for us like Keycloak SSO integration.

