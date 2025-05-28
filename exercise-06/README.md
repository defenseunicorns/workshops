# exercise-06

## **Exercise #6 - Build UDS Bundle**

Since we have a UDS package, let’s incorporate it in a UDS Bundle.

1. Review a bundle definition

    ```console
    uds zarf tools yq uds-bundle.yaml
    ```

1. Define a UDS config

    ```console
    uds zarf tools yq uds-config.yaml
    ```

1. Create the UDS Bundle

    ```console
    uds create --confirm --output ../build
    ```

1. Confirm bundle was created

    ```console
    ls -l ../build/uds-bundle-*.zst
    ```

    ```console
    uds inspect ../build/uds-bundle-*.zst
    ```
