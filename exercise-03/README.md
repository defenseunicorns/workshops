# exercise-03

## **Exercise #3 - UDS Core**

Now deploy **UDS Core** and dig into the various components it automates.

1. Deploy UDS Core K3d demo (~10-20 mins)

    ```console
    uds deploy k3d-core-demo:0.36.0 --confirm
    ```

1. In another terminal window, monitor the deployment

    ```console
    while :; do uds zarf package list; helm ls -A -rd | head; sleep 10; clear; done
    # Ctrl+c when done to exit
    ```

1. After successful deploy, inspect deployed resources

    ```console
    {
    uds zarf tools kubectl get pods -A 
    uds zarf tools kubectl get packages.uds.dev -A
    uds zarf tools kubectl get exemptions -A
    uds zarf tools kubectl get netpol -A
    uds zarf tools kubectl get gateways,virtualservices,authorizationpolicies -A
    uds zarf tools kubectl get servicemonitors,podmonitors -A
    }
    ```

1. Connect to Keycloak, setup admin user, disable MFA

    ```console
    uds zarf connect keycloak
    ```

    ```console
    # select "Unicorn Delivery Service - uds" realm from top left dropdown
    # Configure > Authentication (left nav) > Flows (tab) > UDS Authentication > MFA Login (step) > choose "Disabled" from dropdown
    # Configure > Authentication (left nav) > Flows (tab) > UDS Authentication > MFA Login (step) > Username Password Form (step) > drag out above of MFA Login
    # Configure > Authentication (left nav) > Required Actions (tab) > Configure OTP > toggle Enabled option to "Off"
    # Ctrl+c when done to exit
    ```

1. Register a user

    ```console
    # open in a browser
    sso.uds.dev
    # register now (at the bottom)
    ```

1. Add user to group “UDS Core/Admin” in Keycloak **uds** realm

    ```console
    # open in a browser
    keycloak.admin.uds.dev
    # select "Unicorn Delivery Service - uds" realm from top left dropdown
    # Manage > Users (left nav) > [[username]] > Groups (tab) > "Join Group" button
    # UDS Core > Admin > select checkbox & "Join" button
    ```

1. Login to an admin tool

    ```console
    # open in a browser
    grafana.admin.uds.dev
    # Dashboards (left nav) > Loki Dashboard quick search
    # namespace: keycloak & pod: All & search: [[username]]
    ```

1. Tear down

    ```console
    k3d cluster list
    k3d cluster delete --all
    ```
