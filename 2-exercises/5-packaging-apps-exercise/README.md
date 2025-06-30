# UDS Developer Experience (DevEx)

This exercise steps through an example of providing a reusable pattern for the developer experience both locally and in the Continuous Integration workflows.

---

## Run through an example using Podinfo

### Create a copy of the template directory for an app and change directories

```console
cp -rfv template/ test-pkg-podinfo && cd test-pkg-podinfo
```

---

### Replace placeholders using a script

```console
bash -xv setup.bash "#TEMPLATE_APPLICATION_NAME#"="podinfo" "#TEMPLATE_APPLICATION_DISPLAY_NAME#"="Podinfo" "#TEMPLATE_APPLICATION_SERVICE_NAME#"="podinfo" "#TEMPLATE_APPLICATION_PORT#"="9898" "#TEMPLATE_CHART_REPO#"="https://stefanprodan.github.io/podinfo" "#TEMPLATE_CHART_VERSION#"="6.9.0"
```

---

### Find images used by the chart and write them to a temporary patch file

```console
uds zarf dev find-images ./ -f upstream --kube-version 1.32 2>/dev/null | uds zarf tools yq '.components[0].images' > tmp-image-patch.yaml && uds zarf tools yq tmp-image-patch.yaml
```

---

### Merge the patch file into the zarf.yaml

```console
uds zarf tools yq eval '.components[0].images = load("tmp-image-patch.yaml")' zarf.yaml > zarf.yaml.tmp && mv zarf.yaml.tmp zarf.yaml && uds zarf tools yq zarf.yaml
```

---

### Review the available tasks

```console
uds run --list
uds zarf tools yq tasks.yaml
```

---

### Run task to install all lint tools

```console
uds run lint:deps
```

---

### Run a test install

```console
uds run test-install
```

---

### Verify deploy was successful

- Did the task complete successfully
- Do resources look healthy in the application namespace

  ```console
  uds zarf tools kubectl get all -n podinfo
  ```

- Can you access the application in a browser: [podinfo.uds.dev](podinfo.uds.dev)

---

### Create a temporary patch file for the bundle

```console
cat <<EOF > ./bundle/tmp-bundle-patch.yaml
overrides:
  # component of the zarf package
  podinfo:
    # helm chart
    podinfo:
      variables:
        - name: PODINFO_REPLICAS
          path: replicaCount
          default: 3
EOF
uds zarf tools yq ./bundle/tmp-bundle-patch.yaml
```

---

### Merge the patch file into the uds-bundle.yaml

```console
uds zarf tools yq eval '(.packages[0].overrides) = load("./bundle/tmp-bundle-patch.yaml").overrides' ./bundle/uds-bundle.yaml > ./bundle/uds-bundle.yaml.tmp && mv ./bundle/uds-bundle.yaml.tmp ./bundle/uds-bundle.yaml && uds zarf tools yq ./bundle/uds-bundle.yaml
```

---

### Run the dev task (for iterating using existing cluster)

```console
uds run dev
```

---

## Run through another example using PodtatoHead

### Create a copy of the template directory for an app and change directories

```console
cd ../ && cp -rfv template/ test-pkg-podtato-head && cd test-pkg-podtato-head
```

---

### Replace placeholders using a script

```console
bash -xv setup.bash "#TEMPLATE_APPLICATION_NAME#"="podtato-head" "#TEMPLATE_APPLICATION_DISPLAY_NAME#"="PodtatoHead"  "#TEMPLATE_APPLICATION_SERVICE_NAME#"="podtato-head-frontend" "#TEMPLATE_APPLICATION_PORT#"="8080" "#TEMPLATE_CHART_REPO#"="oci://ghcr.io/podtato-head/charts/podtato-head" "#TEMPLATE_CHART_VERSION#"="0.3.3"
```

---

### Find images used by the chart and write them to a temporary patch file

```console
uds zarf dev find-images ./ -f upstream --kube-version 1.32 2>/dev/null | uds zarf tools yq '.components[0].images' > tmp-image-patch.yaml && uds zarf tools yq tmp-image-patch.yaml
```

---

### Merge the patch file into the zarf.yaml

```console
uds zarf tools yq eval '.components[0].images = load("tmp-image-patch.yaml")' zarf.yaml > zarf.yaml.tmp && mv zarf.yaml.tmp zarf.yaml && uds zarf tools yq zarf.yaml
```

---

### Review the available tasks

```console
uds run --list
```

---

### Run a test install

```console
uds run test-install
```

---

### Verify deploy was successful

- Did the task complete successfully
- Do resources look healthy in the application namespace

  ```console
  uds zarf tools kubectl get all -n podtato-head
  ```

- Can you access the application in a browser: [podtato-head.uds.dev](podtato-head.uds.dev)
- If it wasn't successful, find and fix the issue(s) and run the `dev` task: `uds run dev`

---

### Tear Down
```bash
k3d cluster list
k3d cluster delete --all
```

---

## CI examples

Inspect some example CI templates, and see what they have in common with the local development work just completed.

```console
uds zarf tools yq ../uds-common/templates/*.yaml
```
