## Exercise #5 - Maru (UDS task) Runner

Explore how you can use **Maru (UDS task) Runner** to automate tasks.

For information on Maru (UDS task) Runner, explore the links below:
- [DOCS](https://uds.defenseunicorns.com/reference/cli/uds-runner/)
- [maru-runner Github](https://github.com/defenseunicorns/maru-runner)

### Review contents of the main tasks file

```sh
uds zarf tools yq tasks.yaml
```

### Get a list of tasks

```sh
uds run --list
```

### Run the default task

```sh
uds run
uds run default
```

### Run the "example" task

```sh
uds run example
```

### Run the "example" task with an argument

```sh
uds run example --set GREET=Hi
```

### Run the "example" task with an argument via env

```sh
UDS_GREET=Hey uds run example
```

### Review contents of the additional tasks file and reference from the main tasks files

```sh
uds zarf tools yq tasks/additional-tasks.yaml tasks.yaml
```

### Run the "compliment" task

```sh
uds run compliment
```
