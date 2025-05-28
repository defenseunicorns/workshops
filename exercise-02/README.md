# exercise-02

## **Exercise #2 - Pepr**

Now let’s do an exercise with **Pepr**, the Kubernetes controller manager.

1. Create a cluster with a lightweight deploy of UDS core (~5-10 mins)

    ```console
    uds deploy k3d-core-slim-dev:latest --confirm
    ```

1. See what got deployed

    ```console
    uds zarf tools kubectl get po -A && uds zarf tools kubectl get mutatingwebhookconfigurations,validatingwebhookconfigurations
    ```

1. Try and do bad things

    ```console
    uds zarf tools kubectl create service nodeport my-svc --tcp=5678:8080
    ```

    ```console
    uds zarf tools kubectl run my-pod --image=busybox --privileged=true -- date
    ```

1. Review Pepr logs

    ```console
    uds monitor pepr denied
    ```

1. Review a loosely define an application spec

    ```console
    uds zarf tools yq my-dep.yaml
    ```

1. Deploy the application

    ```console
    uds zarf tools kubectl apply -f my-dep.yaml
    ```

1. How did Pepr help?

    ```console
    uds monitor pepr mutated
    ```

1. View the modified application spec

    ```console
    uds zarf tools kubectl get pods -oyaml $(uds zarf tools kubectl get pods -lapp=my-dep -o jsonpath="{.items[0].metadata.name}") | uds zarf tools yq 'del(.status)'
    ```

1. Rebuild & deploy the podinfo zarf package

    ```console
    uds zarf package create ./ --confirm && uds zarf package deploy zarf-package-*.zst --confirm
    ```

1. Review a custom resource spec

    ```console
    uds zarf tools yq uds-package.yaml
    ```

1. Deploy the custom resource

    ```console
    uds zarf tools kubectl apply -f uds-package.yaml
    ```

1. What did Pepr do?

    ```console
    {
    uds zarf tools kubectl get packages.uds.dev -A
    uds zarf tools kubectl get netpol -n podinfo
    uds zarf tools kubectl get virtualservices -A
    uds zarf tools kubectl get servicemonitors,podmonitors -n podinfo
    }
    ```

1. See the results

    ```console
    # open in a browser
    podinfo.uds.dev
    ```

1. Tear down

    ```console
    k3d cluster list
    k3d cluster delete --all
    ```
