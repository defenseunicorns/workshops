## Exercise #3 - UDS Core

Now deploy UDS Core and dig into the various components it automates.

### Deploy UDS Core K3d demo (~10-20 mins)

```sh
uds deploy k3d-core-demo:0.31.2 --confirm
```

In another terminal window, monitor the deployment:

```sh
while :; do uds zarf package list; helm ls -A; sleep 10; clear; done
# Ctrl+c when done to exit
```

### After successful deploy, inspect deployed resources

```sh
uds zarf tools kubectl get pods -A
uds zarf tools kubectl get packages.uds.dev -A
uds zarf tools kubectl get exemptions -A
uds zarf tools kubectl get netpol -A
uds zarf tools kubectl get gateways,virtualservices,authorizationpolicies -A
uds zarf tools kubectl get servicemonitors,podmonitors -A
```

### Connect to Keycloak, setup admin user, disable MFA

#### For local machine

```sh
uds zarf connect keycloak
```

#### For Instruqt (create admin user using script)

```sh
curl -sOL https://raw.githubusercontent.com/defenseunicorns/uds-core/refs/tags/v0.31.2/tasks/utils.yaml && uds run -f utils.yaml keycloak-admin-user && kubectl get secret -n keycloak keycloak-admin-password --template='{{ index .data.password | base64decode}}'; echo
```

Continue following steps below at [https://keycloak.admin.uds.dev](https://keycloak.admin.uds.dev) (user: admin & password: (from output above))

- Select "Unicorn Delivery Service - uds" realm from top left dropdown
- Configure > Authentication (left nav) > Flows (tab) > UDS Authentication > MFA Login (step) > choose "Disabled" from dropdown
- Configure > Authentication (left nav) > Flows (tab) > UDS Authentication > MFA Login (step) > Username Password Form (step) > drag out above of MFA Login
- Configure > Authentication (left nav) > Required Actions (tab) > Configure OTP > toggle Enabled option to "Off"
- Ctrl+c when done to exit

### Register a user

- Open in a browser: [sso.uds.dev](https://sso.uds.dev)
- Register now (at the bottom)

### Add user to group “UDS Core/Admin” in Keycloak UDS realm

- Open in a browser: [keycloak.admin.uds.dev](https://keycloak.admin.uds.dev)
- Select "Unicorn Delivery Service - uds" realm from top left dropdown
- Manage > Users (left nav) > [[username]] > Groups (tab) > "Join Group" button
- UDS Core > Admin > select checkbox & "Join" button

### Login to an admin tool

- Open in a browser: [grafana.admin.uds.dev](https://grafana.admin.uds.dev)
- Dashboards (left nav) > Loki Dashboard quick search
- Namespace: keycloak & pod: All & search: [[username]]

### Tear down

```sh
k3d cluster list
k3d cluster delete --all
```xercise #3 - UDS Core
Now deploy UDS Core and dig into the various components it automates.
Deploy UDS Core K3d demo (~10-20 mins)
uds deploy k3d-core-demo:0.31.2 --confirm
In another terminal window, monitor the deployment
while :; do uds zarf package list; helm ls -A; sleep 10; clear; done
# Ctrl+c when done to exit
After successful deploy, inspect deployed resources
{
uds zarf tools kubectl get pods -A
uds zarf tools kubectl get packages.uds.dev -A
uds zarf tools kubectl get exemptions -A
uds zarf tools kubectl get netpol -A
uds zarf tools kubectl get gateways,virtualservices,authorizationpolicies -A
uds zarf tools kubectl get servicemonitors,podmonitors -A
}
Connect to Keycloak, setup admin user, disable MFA
# For local machine
uds zarf connect keycloak

# For Instruqt (create admin user using script)
curl -sOL https://raw.githubusercontent.com/defenseunicorns/uds-core/refs/tags/v0.31.2/tasks/utils.yaml && uds run -f utils.yaml keycloak-admin-user && kubectl get secret -n keycloak keycloak-admin-password --template='{{ index .data.password | base64decode}}'; echo
# Continue following steps below at https://keycloak.admin.uds.dev (user: admin & password: (from output above)

# select "Unicorn Delivery Service - uds" realm from top left dropdown
# Configure > Authentication (left nav) > Flows (tab) > UDS Authentication > MFA Login (step) > choose "Disabled" from dropdown
# Configure > Authentication (left nav) > Flows (tab) > UDS Authentication > MFA Login (step) > Username Password Form (step) > drag out above of MFA Login
# Configure > Authentication (left nav) > Required Actions (tab) > Configure OTP > toggle Enabled option to "Off"
# Ctrl+c when done to exit
Register a user
# open in a browser
sso.uds.dev
# register now (at the bottom)
Add user to group “UDS Core/Admin” in keycloak uds realm
# open in a browser
keycloak.admin.uds.dev
# select "Unicorn Delivery Service - uds" realm from top left dropdown
# Manage > Users (left nav) > [[username]] > Groups (tab) > "Join Group" button
# UDS Core > Admin > select checkbox & "Join" button
Login to an admin tool
# open in a browser
grafana.admin.uds.dev
# Dashboards (left nav) > Loki Dashboard quick search
# namespace: keycloak & pod: All & search: [[username]]
Tear down
k3d cluster list
k3d cluster delete --all
