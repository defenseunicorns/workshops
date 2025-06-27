# UDS Bundle - Build, Deploy, and Update

## **Create UDS Package**

Now we will build upon the Podinfo Zarf package to create a UDS Package.

### Pre-flight check to verify environment is ready (namely that Docker running)

```console
docker ps
```

### Kick off the deploy for the UDS Core K3d demo (~10-20 mins) - can continue with next steps in another window

```console
uds deploy k3d-core-demo:0.45.1 --confirm
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

### Ensure UDS Core is ready before continuing

```console
helm ls -Aa
```

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

### Connect to Keycloak and setup admin user

```console
uds zarf connect keycloak
# follow prompt to get connection URL for the browser
```

- define an admin user: `admin`
- set the admin user password: **YOURPASSWORDHERE**
- login (as admin user)

### In Keycloak's UI, disable MFA

- Manage realms > choose "uds - Unicorn Delivery Service" (should be reflected in the top left "Current realm")
- Configure > Authentication (left nav) > Flows (tab) > UDS Authentication > Conditional OTP (flow) > choose "Disabled" from dropdown
- Configure > Authentication (left nav) > Required Actions (tab) > Configure OTP > toggle Enabled option to "Off"
- Ctrl+c (in the terminal session) when done to exit the Keycloak tunneling

### Register a user

- open in a browser: `sso.uds.dev`
- register now (at the bottom)

### Add user to group “UDS Core/Admin” in keycloak **uds** realm

- open in a browser: `keycloak.admin.uds.dev`
- Manage realms > choose "uds - Unicorn Delivery Service" (should be reflected in the top left "Current realm")
- Manage > Users (left nav) > [[username]] > Groups (tab) > "Join Group" button
- UDS Core > Admin > select checkbox & "Join" button

### See the results

- open in a browser: `podinfo.uds.dev`

### Look at Keycloak

- open in a browser: `keycloak.admin.uds.dev`
- select "Unicorn Delivery Service - uds" realm from top left dropdown
- Clients
- Sessions

### Look at Grafana

- open in a browser: `grafana.admin.uds.dev`
- Dashboards (left nav) > New (far right button) > New dashboard (from drop down) > Add visualization (button)
- select Prometheus as the datasource
- "A" > Code (toggle from Builder) > paste this code PromQL query:
  - `go_memstats_heap_alloc_bytes{pod_name=~"podinfo.*"}`
- Under Options > Legend > Custom (from drop down) > enter this:
  - `{{pod_name}}`
- Adjust Timeframe to "Last 15 minutes" & Refresh to "Auto" (from drop downs)

## **Update UDS Bundle**

Now let’s update a UDS Bundle.

### Update the UDS Config to change the replicas

```console
sed -i.bak 's/4/3/g' uds-config.yaml && rm uds-config.yaml.bak && uds zarf tools yq uds-config.yaml
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

-  open in a browser: `podinfo.uds.dev`

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
