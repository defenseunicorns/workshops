# exercise-01

## **Exercise #1 - Zarf**

First let’s do an exercise with **Zarf**, the air gap friendly package/deployment tool.

1. Define a zarf.yaml that packages the podinfo helm chart

    ```console
    zarf tools yq zarf.yaml
    ```

1. Review the values.yaml

    ```console
    zarf tools yq 'del(.ui.logo)' values.yaml
    ```

1. Build the zarf podinfo package

    ```console
    zarf package create ./ --confirm
    ls -l zarf-package-*.zst
    ```

1. Look at the package Software Bill Of Materials (SBOM)

    ```console
    zarf package inspect sbom zarf-package-*.zst --output zarf-sbom
    # open the "sbom-viewer-*.html" file in a browser
    ```

1. Setup a local dev K8s cluster

    ```console
    k3d cluster create zarf-test
    ```

1. Perform a zarf init

    ```console
    zarf init
    # ? Do you want to pull this init package? y
    # ? Deploy this Zarf package? y
    # ? Deploy the git-server component? N
    ```

1. Check what is deployed

    ```console
    zarf tools kubectl get pods -A
    ```

    ```console
    zarf tools kubectl get mutatingwebhookconfigurations
    ```

1. Deploy the zarf podinfo package (if adventurous, and running locally, turn off the wifi before running the command then back on after deploy completes)

    ```console
    zarf package deploy zarf-package-*.zst --confirm
    ```

1. Check results

    ```console
    helm ls -n podinfo --all
    ```

    ```console
    zarf package list
    ```

    ```console
    zarf tools kubectl get all -n podinfo
    ```

1. View the podinfo service

    ```console
    zarf connect --namespace=podinfo --name=podinfo --remote-port=9898 --local-port=9999
    # Ctrl+c when done to exit
    ```

1. Tear down

    ```console
    k3d cluster list
    k3d cluster delete --all
    ```
