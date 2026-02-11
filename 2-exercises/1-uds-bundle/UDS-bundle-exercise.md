# UDS Bundle - Build, Deploy, and Update

## **Create UDS Package**

Now we will build upon the Podinfo Zarf package to create a UDS Package.

---

### 0. Pre-flight check to verify environment is ready (namely that Docker running)

```bash
docker ps
```

---

### 1. Kick off the deploy for the UDS Core K3d demo (~10-20 mins) - can continue with next steps in another window

```bash
export LATEST_UDS_VERSION="0.61.0"
ls -1 ../../wip/uds-bundle-k3d-core-demo-*.zst >/dev/null 2>&1 || uds pull k3d-core-demo:${LATEST_UDS_VERSION} -o ../../wip/
uds deploy ../../wip/uds-bundle-k3d-core-demo-*.zst --confirm
```

NOTE: Alternatively, this could also be deployed directly from the OCI reference by running `uds deploy k3d-core-demo:${LATEST_UDS_VERSION} --confirm`

---

### 2. Review the zarf.yaml

```bash
 uds zarf tools yq zarf.yaml
```

---

### 3. Review the uds-package.yaml

```bash
uds zarf tools yq uds-package.yaml
```

---

### 4. Build the zarf package (aka UDS package)

```bash
uds zarf package create --confirm ./ --output ./build
```

---

### 5. Confirm zarf package is built

```bash
ls -l ./build/zarf-package-*.zst
```

```bash
zarf package inspect definition ./build/zarf-package-*.zst
```

---

## Since we have a UDS package, let’s incorporate it in a UDS Bundle.

---

### 6. Review a bundle definition

```bash
uds zarf tools yq uds-bundle.yaml
```

---

### 7. Define a UDS config

```bash
uds zarf tools yq uds-config.yaml
```

---

### 8. Create the UDS Bundle

```bash
uds create --confirm --output ./build
```

---

### 9. Confirm bundle was created

```bash
ls -l ./build/uds-bundle-*.zst
```

```bash
uds inspect ./build/uds-bundle-*.zst
```

---

## **Deploy UDS Bundle**

Now that we have a UDS Bundle, let’s deploy it.

---

### 10. Ensure UDS Core is ready before continuing

```bash
helm ls -A
```

---

### 11. Deploy the UDS Bundle

```bash
uds deploy --confirm ./build/uds-bundle-*.zst
```

---

### 12. Check what all got deployed

```bash
uds zarf package list
```

```bash
helm ls -n podinfo
```

```bash
uds zarf tools kubectl get deploy,pods -n podinfo
```

```bash
uds zarf tools kubectl get packages.uds.dev,exemptions.uds.dev -n podinfo
```

```bash
uds zarf tools kubectl get gw,netpol,authorizationpolicies,virtualservices -n podinfo
```

```bash
uds zarf tools kubectl get servicemonitors,podmonitors -n podinfo
```

---

### 13. Connect to Keycloak and setup admin user

```bash
uds zarf connect keycloak
# follow prompt to get connection URL for the browser
```

- Define an admin user: `admin`
- Set the admin user password: **YOURPASSWORDHERE**
- Login (as admin user)

---

### 14. In Keycloak's UI, disable MFA

- Manage realms > choose "uds - Unicorn Delivery Service" (should be reflected in the top left "Current realm")
- Configure > Authentication (left nav) > Flows (tab) > UDS Authentication > Conditional OTP (flow) > choose "Disabled" from dropdown
- Configure > Authentication (left nav) > Required Actions (tab) > Configure OTP > toggle Enabled option to "Off"
- Ctrl+c (in the terminal session) when done to exit the Keycloak tunneling

---

### 15. Register a user

- Open in a browser: [sso.uds.dev](https://sso.uds.dev)
- Create Account (at the bottom)

---

### 16. Add user to group “UDS Core/Admin” in keycloak **uds** realm

- Open in a browser: [keycloak.admin.uds.dev](https://keycloak.admin.uds.dev)
- Manage realms > choose "uds - Unicorn Delivery Service" (should be reflected in the top left "Current realm")
- Manage > Users (left nav) > [[username]] > Groups (tab) > "Join Group" button
- UDS Core > Admin > select checkbox & "Join" button

---

### 17. See the results

- Open in a browser: [podinfo.uds.dev](https://podinfo.uds.dev)

---

### 18. Look at Keycloak

- Open in a browser: [keycloak.admin.uds.dev](https://keycloak.admin.uds.dev)
- select "Unicorn Delivery Service - uds" realm from top left dropdown
- Clients
- Sessions

---

### 19. Look at Grafana

- Open in a browser: [grafana.admin.uds.dev](https://grafana.admin.uds.dev)
- Dashboards (left nav) > New (far right button) > New dashboard (from drop down) > Add visualization (button)
- Select Prometheus as the datasource
- "A" > Code (toggle from Builder) > paste this code PromQL query:
  - `go_memstats_heap_alloc_bytes{pod=~"podinfo.*"}`
- Under Options > Legend > Custom (from drop down) > enter this:
  - `{{pod}}`
- Adjust Timeframe to "Last 15 minutes" & Refresh to "Auto" (from drop downs)

---

## **Update UDS Bundle**

Now let’s update a UDS Bundle.

---

### 20. Update the UDS Config to change the replicas

```bash
sed -i.bak 's/4/3/g' uds-config.yaml && rm uds-config.yaml.bak && uds zarf tools yq uds-config.yaml
```

### 21. Re-deploy the UDS Bundle

```bash
uds deploy ./build/uds-bundle-*.zst --confirm
```

---

### 22. Check if the replicas changed

```bash
uds zarf tools kubectl get deploy,pods -n podinfo
```

---

### 23. Update the bundle with an additional helm override option

```bash
sed -i.bak 's/^##//g' uds-bundle.yaml && rm uds-bundle.yaml.bak && uds zarf tools yq uds-bundle.yaml
```

---

### 24. Rebuild the bundle

```bash
uds create --confirm --output ./build
```

---

### 25. Set the additional variable

```bash
sed -i.bak 's/^##//g' uds-config.yaml && rm uds-config.yaml.bak && uds zarf tools yq uds-config.yaml
```

---

### 26. Re-deploy the updated UDS Bundle

```bash
uds deploy ./build/uds-bundle-*.zst --confirm
```

---

### 27. Verify the logo changed

- Open in a browser: [podinfo.uds.dev](https://podinfo.uds.dev)

---

### 28. Remove the UDS Bundle

```bash
uds remove ./build/uds-bundle-*.zst --confirm
```

---

### 29. Check what all got cleaned up

```bash
uds zarf package list
```

```bash
helm ls -n podinfo
```

```bash
uds zarf tools kubectl get deploy,pods -n podinfo
```

```bash
uds zarf tools kubectl get packages.uds.dev,exemptions.uds.dev -n podinfo
```

```bash
uds zarf tools kubectl get gw,netpol,authorizationpolicies,virtualservices -n podinfo
```

```bash
uds zarf tools kubectl get servicemonitors,podmonitors -n podinfo
```

---

### 30. Tear down

```bash
k3d cluster list
k3d cluster delete --all
```
