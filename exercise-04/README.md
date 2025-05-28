# exercise-04

## **Exercise #4 - UDS (Maru) Runner**

Explore how you can use **UDS (Maru) Runner** to automate tasks.

1. Review contents of the main tasks file

    ```console
    uds zarf tools yq tasks.yaml
    ```

1. Get a list of tasks

    ```console
    uds run --list
    ```

1. Run the default task

    ```console
    uds run
    ```

1. Run the "example" task

    ```console
    uds run example
    ```

1. Run the example task with an argument

    ```console
    uds run example --set GREET=Hi
    ```

1. Run the example task with an argument via env

    ```console
    UDS_GREET=Hey uds run example
    ```
