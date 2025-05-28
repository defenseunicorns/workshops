# exercise-09

## **Exercise #9 - UDS DevEx**

Let's see how to use UDS task runner (Maru) for DevEx.

1. Ensure the correct docker context is set

    ```console
    docker context ls
    docker context set <DESIRED_CONTEXT>
    # OR
    export DOCKER_HOST=$(docker context ls --format json | grep <DESIRED_CONTEXT> | zarf tools yq -rp json .DockerEndpoint) && echo $DOCKER_HOST
    ```

1. Clone the podinfo repo

    ```console
    git clone https://github.com/stefanprodan/podinfo.git
    ```

1. Review the updated specs and env file

    ```console
    {
    uds zarf tools yq zarf.yaml
    uds zarf tools yq uds-bundle.yaml
    uds zarf tools yq uds-config.yaml
    }
    ```

    ```console
    cat uds.env
    ```

1. Review some additional files

    ```console
    uds zarf tools yq uds-dev-config.yaml
    ```

    ```console
    cat uds-dev.env
    ```

1. Review task files

    ```console
    {
    uds zarf tools yq tasks.yaml
    uds zarf tools yq create-deploy.yaml
    uds zarf tools yq dev.yaml
    }
    ```

1. List available tasks

    ```console
    uds run --list
    ```

1. Run the dev-all task

    ```console
    uds run dev-all
    ```

1. Check the app

    ```console
    # open in a browser
    podinfo.uds.dev
    ```

1. Modify the podinfo app

    ```console
    sed -i.bak 's/"greetings/"-DEV- greetings/' podinfo/cmd/podinfo/main.go && rm podinfo/cmd/podinfo/main.go.bak
    grep greetings podinfo/cmd/podinfo/main.go
    ```

1. Run the dev-loop task

    ```console
    uds run dev-loop
    ```

1. Check the app again

    ```console
    # open in a browser
    podinfo.uds.dev
    ```

1. Run the default task (mimic a pipeline run rather than dev loop)

    ```console
    uds run
    ```

1. Check the app again

    ```console
    # open in a browser
    podinfo.uds.dev
    ```

1. Tear down

    ```console
    uds run clean
    ```
