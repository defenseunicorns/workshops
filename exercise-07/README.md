# exercise-07

## **Exercise #7 - Deploy UDS Bundle**

Now that we have a UDS Bundle, let’s deploy it.

1. Deploy the UDS Bundle

    ```console
    uds deploy --confirm ../build/uds-bundle-*.zst
    ```

1. Check what all got deployed

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

1. Connect to Keycloak, setup admin user, disable MFA

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

1. Register a user

    ```console
    # open in a browser
    sso.uds.dev
    # register now (at the bottom)
    ```

1. Add user to group “UDS Core/Admin” in keycloak **uds** realm

    ```console
    # open in a browser
    keycloak.admin.uds.dev
    # select "Unicorn Delivery Service - uds" realm from top left dropdown
    # Manage > Users (left nav) > [[username]] > Groups (tab) > "Join Group" button
    # UDS Core > Admin > select checkbox & "Join" button
    ```

1. See the results

    ```console
    # open in a browser
    podinfo.uds.dev
    ```

1. Look at Keycloak

    ```console
    # open in a browser
    keycloak.admin.uds.dev
    # select "Unicorn Delivery Service - uds" realm from top left dropdown
    # Clients
    # Sessions
    ```

1. Look at Grafana

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
