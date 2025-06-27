# UDS Bundle - Build, Deploy, and Update

## **Create UDS Package**

Now we will build upon the Podinfo Zarf package to create a UDS Package.

### Kick off the deploy for the UDS Core K3d demo (~10-20 mins)

```console
uds deploy k3d-core-demo:0.36.0 --confirm
```

### Review the updated zarf.yaml

```console
 uds zarf tools yq zarf.yaml
```

Review the updated uds-package.yaml

```console
uds zarf tools yq uds-package.yaml
```

### Build the updated zarf package (aka UDS package)

```console
uds zarf package create --confirm ./ --output ./build
```

### Confirm zarf package is built

```console
ls -l ./build/zarf-package-*.zst
```

```console
zarf package inspect definition ./build/zarf-package-*.zst
```

## Since we have a UDS package, let’s incorporate it in a UDS Bundle.

### Review a bundle definition

```console
uds zarf tools yq uds-bundle.yaml
```

### Define a UDS config

```console
uds zarf tools yq uds-config.yaml
```

### Create the UDS Bundle

```console
uds create --confirm --output ./build
```

### Confirm bundle was created

```console
ls -l ./build/uds-bundle-*.zst
```

```console
uds inspect ./build/uds-bundle-*.zst
```

## **Deploy UDS Bundle**

Now that we have a UDS Bundle, let’s deploy it.

### Deploy the UDS Bundle

```console
uds deploy --confirm ./build/uds-bundle-*.zst
```

### Check what all got deployed

```console
{
uds zarf package list
helm ls -n podinfo
uds zarf tools kubectl get pods -n podinfo
uds zarf tools kubectl get packages.uds.dev -A
uds zarf tools kubectl get netpol -n podinfo
uds zarf tools kubectl get virtualservices,authorizationpolicies -A
uds zarf tools kubectl get servicemonitors,podmonitors -A
}
```

### Connect to Keycloak, setup admin user, disable MFA

```console
uds zarf connect keycloak
# Ctrl+c when done to exit
```

```console
# select "Unicorn Delivery Service - uds" realm from top left dropdown
# Configure > Authentication (left nav) > Flows (tab) > UDS Authentication > MFA Login (step) > choose "Disabled" from dropdown
# Configure > Authentication (left nav) > Flows (tab) > UDS Authentication > MFA Login (step) > Username Password Form (step) > drag out above of MFA Login
# Configure > Authentication (left nav) > Required Actions (tab) > Configure OTP > toggle Enabled option to "Off"
# Ctrl+c when done to exit
```

### Register a user

```console
# open in a browser
sso.uds.dev
# register now (at the bottom)
```

### Add user to group “UDS Core/Admin” in keycloak **uds** realm

```console
# open in a browser
keycloak.admin.uds.dev
# select "Unicorn Delivery Service - uds" realm from top left dropdown
# Manage > Users (left nav) > [[username]] > Groups (tab) > "Join Group" button
# UDS Core > Admin > select checkbox & "Join" button
```

### See the results

```console
# open in a browser
podinfo.uds.dev
```

### Look at Keycloak

```console
# open in a browser
keycloak.admin.uds.dev
# select "Unicorn Delivery Service - uds" realm from top left dropdown
# Clients
# Sessions
```

### Look at Grafana

```console
# open in a browser
grafana.admin.uds.dev
# Dashboards (left nav) > New (far right button) > New dashboard (from drop down) > Add visualization (button)
# select Prometheus as the datasource
# "A" > Code (toggle from Builder) > paste this code PromQL query:
# go_memstats_heap_alloc_bytes{pod_name=~"podinfo.*"}
# Under Options > Legend > Custom (from drop down) > enter this:
# {{pod_name}}
# Adjust Timeframe to "Last 15 minutes" & Refresh to "Auto" (from drop downs)
```

## **Update UDS Bundle**

Now let’s update a UDS Bundle.

### Update the UDS Config to change the replicas

```console
uds zarf tools yq uds-config.yaml
```

### Re-deploy the UDS Bundle

```console
uds deploy ./build/uds-bundle-*.zst --confirm
```

### Check if the replicas changed

```console
uds zarf tools kubectl get deploy,pods -n podinfo
```

### Update the bundle with an additional helm override option

```console
sed -i.bak 's/^##//g' uds-bundle.yaml && rm uds-bundle.yaml.bak && uds zarf tools yq uds-bundle.yaml
```

### Rebuild the bundle

```console
uds create --confirm --output ./build
```

### Set the additional variable

```console
sed -i.bak 's/^##//g' uds-config.yaml && rm uds-config.yaml.bak && uds zarf tools yq uds-config.yaml
```

### Re-deploy the updated UDS Bundle

```console
uds deploy ./build/uds-bundle-*.zst --confirm
```

### Verify the logo changed

```console
# open in a browser
podinfo.uds.dev
```

### Remove the UDS Bundle

```console
uds remove ./build/uds-bundle-*.zst --confirm
```

### Check what all got cleaned up

```console
{
uds zarf package list
helm ls -n podinfo
uds zarf tools kubectl get pods -n podinfo
uds zarf tools kubectl get packages.uds.dev -A
uds zarf tools kubectl get netpol -n podinfo
uds zarf tools kubectl get virtualservices,authorizationpolicies -A
uds zarf tools kubectl get servicemonitors,podmonitors -A
}
```

### Tear down

```console
k3d cluster list
k3d cluster delete --all
```
