## Exercise #3 - UDS Core

Now deploy UDS Core and dig into the various components it automates.

For information on UDS, explore the links below:
- [DOCS](https://uds.defenseunicorns.com/)
- [UDS Core Github](https://github.com/defenseunicorns/uds-core)

---

### 1. Deploy UDS Core K3d demo (~10-20 mins)

```sh
uds deploy k3d-core-demo:0.52.1 --confirm
```

In another terminal window, monitor the deployment:

```sh
while :; do uds zarf package list; helm ls -A; sleep 10; clear; done
# Ctrl+c when done to exit
```

---

### 2. After successful deploy, inspect deployed resources

```sh
uds zarf package list
```

```sh
helm ls -A
```

```sh
uds zarf tools kubectl get pods -A
```

```sh
uds zarf tools kubectl get packages.uds.dev,exemptions.uds.dev -A
```

```sh
uds zarf tools kubectl get gw,netpol,authorizationpolicies,virtualservices -A
```

```sh
uds zarf tools kubectl get servicemonitors,podmonitors -A
```

---

### 3. Connect to Keycloak, setup admin user, disable MFA

```sh
uds zarf connect keycloak
# follow prompt to get connection URL for the browser
```

- define an admin user: `admin`
- set the admin user password: **YOURPASSWORDHERE**
- login (as admin user)

---

### 4. In Keycloak's UI, disable MFA

Continue following steps below at [https://keycloak.admin.uds.dev](https://keycloak.admin.uds.dev) (user: admin & password: (set manually OR from output above))

- Manage realms > choose "uds - Unicorn Delivery Service" (should be reflected in the top left "Current realm")
- Configure > Authentication (left nav) > Flows (tab) > UDS Authentication > Conditional OTP (flow) > choose "Disabled" from dropdown
- Configure > Authentication (left nav) > Required Actions (tab) > Configure OTP > toggle Enabled option to "Off"
- Ctrl+c (in the terminal session) when done to exit the Keycloak tunneling

---

### 5. Register a user

- Open in a browser: [sso.uds.dev](https://sso.uds.dev)
- Register now (at the bottom)

---

### 6. Add user to group “UDS Core/Admin” in Keycloak UDS realm

- Open in a browser: [keycloak.admin.uds.dev](https://keycloak.admin.uds.dev)
- Manage realms > choose "uds - Unicorn Delivery Service" (should be reflected in the top left "Current realm")
- Manage > Users (left nav) > [[username]] > Groups (tab) > "Join Group" button
- UDS Core > Admin > select checkbox & "Join" button

---

### 7. Login to an admin tool

- Open in a browser: [grafana.admin.uds.dev](https://grafana.admin.uds.dev)
- Dashboards (left nav) > Loki Dashboard quick search
- Namespace: `keycloak` & pod: `All` & search: [[username]]

---

### 8. Tear down

```sh
k3d cluster list
k3d cluster delete --all
```