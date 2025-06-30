## Exercise #3 - UDS Core

Now deploy UDS Core and dig into the various components it automates.

For information on UDS, explore the links below:
- [DOCS](https://uds.defenseunicorns.com/)
- [UDS Core Github](https://github.com/defenseunicorns/uds-core)

---

### Deploy UDS Core K3d demo (~10-20 mins)

```sh
uds deploy k3d-core-demo:0.45.1 --confirm
```

In another terminal window, monitor the deployment:

```sh
while :; do uds zarf package list; helm ls -A; sleep 10; clear; done
# Ctrl+c when done to exit
```

---

### After successful deploy, inspect deployed resources

```sh
uds zarf tools kubectl get pods -A
uds zarf tools kubectl get packages.uds.dev -A
uds zarf tools kubectl get exemptions -A
uds zarf tools kubectl get netpol -A
uds zarf tools kubectl get gateways,virtualservices,authorizationpolicies -A
uds zarf tools kubectl get servicemonitors,podmonitors -A
```

---

### Connect to Keycloak, setup admin user, disable MFA

#### For local machine

```sh
uds zarf connect keycloak
# follow prompt to get connection URL for the browser
```

- define an admin user: `admin`
- set the admin user password: **YOURPASSWORDHERE**
- login (as admin user)


#### For Instruqt (create admin user using script)

```sh
curl -sOL https://raw.githubusercontent.com/defenseunicorns/uds-core/refs/tags/v0.45.1/tasks/utils.yaml && uds run -f utils.yaml keycloak-admin-user && kubectl get secret -n keycloak keycloak-admin-password --template='{{ index .data.password | base64decode}}'; echo
```

---

Continue following steps below at [https://keycloak.admin.uds.dev](https://keycloak.admin.uds.dev) (user: admin & password: (set manually OR from output above))

### In Keycloak's UI, disable MFA

- Manage realms > choose "uds - Unicorn Delivery Service" (should be reflected in the top left "Current realm")
- Configure > Authentication (left nav) > Flows (tab) > UDS Authentication > Conditional OTP (flow) > choose "Disabled" from dropdown
- Configure > Authentication (left nav) > Required Actions (tab) > Configure OTP > toggle Enabled option to "Off"
- Ctrl+c (in the terminal session) when done to exit the Keycloak tunneling

---

### Register a user

- Open in a browser: [sso.uds.dev](https://sso.uds.dev)
- Register now (at the bottom)

---

### Add user to group “UDS Core/Admin” in Keycloak UDS realm

- Open in a browser: [keycloak.admin.uds.dev](https://keycloak.admin.uds.dev)
- Manage realms > choose "uds - Unicorn Delivery Service" (should be reflected in the top left "Current realm")
- Manage > Users (left nav) > [[username]] > Groups (tab) > "Join Group" button
- UDS Core > Admin > select checkbox & "Join" button

---

### Login to an admin tool

- Open in a browser: [grafana.admin.uds.dev](https://grafana.admin.uds.dev)
- Dashboards (left nav) > Loki Dashboard quick search
- Namespace: `keycloak` & pod: All & search: [[username]]

---

### Tear down

```sh
k3d cluster list
k3d cluster delete --all
```