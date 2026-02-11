## Exercise #5 - Maru (UDS task) Runner

Explore how you can use **Maru (UDS task) Runner** to automate tasks.

For information on Maru (UDS task) Runner, explore the links below:
- [DOCS](https://uds.defenseunicorns.com/reference/cli/uds-runner/)
- [maru-runner Github](https://github.com/defenseunicorns/maru-runner)

---

### 1. Review contents of the main tasks file

```bash
uds zarf tools yq tasks.yaml
```

---

### 2. Get a list of tasks

```bash
uds run --list
```

---

### 3. Run the default task

```bash
uds run
uds run default
```

---

### 4. Run the "example" task

```bash
uds run example
```

---

### 5. Run the "example" task with an argument

```bash
uds run example --set GREET=Hi
```

---

### 6. Run the "example" task with an argument via env

```bash
UDS_GREET=Hey uds run example
```

---

### 7. Review contents of the additional tasks file and reference from the main tasks files

```bash
uds zarf tools yq tasks/additional-tasks.yaml tasks.yaml
```

---

### 8. Run the "compliment" task

```bash
uds run compliment
```
