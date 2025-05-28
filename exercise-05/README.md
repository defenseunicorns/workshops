# exercise-05

## **Exercise #5 - Create UDS Package**

Now we will build upon the Podinfo Zarf package to create a UDS Package.

1. Kick off the deploy for the UDS Core K3d demo (~10-20 mins)

    ```console
    uds deploy k3d-core-demo:0.36.0 --confirm
    ```

1. Review the updated zarf.yaml

    ```console
    uds zarf tools yq zarf.yaml
    ```

1. Review the updated uds-package.yaml

    ```console
    uds zarf tools yq uds-package.yaml
    ```

1. Build the updated zarf package (aka UDS package)

    ```console
    uds zarf package create --confirm ./ --output ../build
    ```

1. Confirm zarf package is built

    ```console
    ls -l ../build/zarf-package-*.zst
    ```

    ```console
    zarf package inspect definition ../build/zarf-package-*.zst
    ```
