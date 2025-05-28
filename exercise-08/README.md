# exercise-08

## **Exercise #8 - Update UDS Bundle**

Now let’s do an exercise to update a UDS Bundle.

1. Update the UDS Config to change the replicas

    ```console
    uds zarf tools yq uds-config.yaml
    ```

1. Re-deploy the UDS Bundle

    ```console
    uds deploy ../build/uds-bundle-*.zst --confirm
    ```

1. Check if the replicas changed

    ```console
    uds zarf tools kubectl get deploy,pods -n podinfo
    ```

1. Update the bundle with an additional helm override option

    ```console
    sed -i.bak 's/^##//g' uds-bundle.yaml && rm uds-bundle.yaml.bak && uds zarf tools yq uds-bundle.yaml
    ```

1. Rebuild the bundle

    ```console
    uds create --confirm --output ../build
    ```

1. Set the additional variable

    ```console
    sed -i.bak 's/^##//g' uds-config.yaml && rm uds-config.yaml.bak && uds zarf tools yq uds-config.yaml
    ```

1. Re-deploy the updated UDS Bundle

    ```console
    uds deploy ../build/uds-bundle-*.zst --confirm
    ```

1. Verify the logo changed

    ```console
    # open in a browser
    podinfo.uds.dev
    ```

1. Remove the UDS Bundle

    ```console
    uds remove ../build/uds-bundle-*.zst --confirm
    ```

1. Check what all got cleaned up

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

1. Tear down

    ```console
    k3d cluster list
    k3d cluster delete --all
    ```
