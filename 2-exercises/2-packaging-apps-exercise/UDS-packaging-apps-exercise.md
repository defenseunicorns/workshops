# UDS Developer Experience (DevEx)

This exercise steps through an example of providing a reusable pattern for the developer experience both locally and in the Continuous Integration workflows.

## **Run through an example using Podinfo**

---

### 0. Pre-flight check to verify environment is ready (namely that Docker running)

```bash
docker ps
```

---

### 1. Create a copy of the template directory for an app and change directories

```bash
cp -rfv template/ test-pkg-podinfo && cd test-pkg-podinfo
```

---

### 2. View directory setup and example placehoders after copying from template

```bash
tree ../template
tree -I template ../
```

```bash
uds zarf tools yq zarf.yaml
```

---

### 3. Replace placeholders using a script

```bash
bash -xv setup.bash "#TEMPLATE_APPLICATION_NAME#"="podinfo" "#TEMPLATE_APPLICATION_DISPLAY_NAME#"="Podinfo" "#TEMPLATE_APPLICATION_SERVICE_NAME#"="podinfo" "#TEMPLATE_APPLICATION_PORT#"="9898" "#TEMPLATE_CHART_REPO#"="https://stefanprodan.github.io/podinfo" "#TEMPLATE_CHART_VERSION#"="6.9.0"
```

---

### 4. Find images used by the chart and update the zarf.yaml

```bash
uds zarf dev find-images ./ -f upstream --kube-version 1.32 --update
```

---

### 5. View the updated zarf.yaml

```bash
uds zarf tools yq zarf.yaml
```

---

### 6. Review the available tasks

```bash
uds run --list
uds zarf tools yq tasks.yaml
```

---

### 7. Run task to install all lint tools and run lint task

```bash
uds run lint:deps && uds run lint:all
```

---

### 8. Run a test install

```bash
uds run test-install
```

---

### 9. Verify deploy was successful

- Did the task complete successfully
- Do resources look healthy in the application namespace

  ```bash
  uds zarf tools kubectl get all -n podinfo
  ```

- Can you access the application in a browser: [podinfo.uds.dev](https://podinfo.uds.dev)

---

### 10. Create a temporary patch file for the bundle

```bash
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

### 11. Merge the patch file into the uds-bundle.yaml

```bash
uds zarf tools yq eval '(.packages[0].overrides) = load("./bundle/tmp-bundle-patch.yaml").overrides' ./bundle/uds-bundle.yaml > ./bundle/uds-bundle.yaml.tmp && mv ./bundle/uds-bundle.yaml.tmp ./bundle/uds-bundle.yaml && uds zarf tools yq ./bundle/uds-bundle.yaml
```

---

### 12. Run the dev task (for iterating using existing cluster)

```bash
uds run dev
```

---

## **Run through another example using PodtatoHead**

---

### 13. Create a copy of the template directory for an app and change directories

```bash
cd ../ && cp -rfv template/ test-pkg-podtato-head && cd test-pkg-podtato-head
```

---

### 14. Replace placeholders using a script

```bash
bash -xv setup.bash "#TEMPLATE_APPLICATION_NAME#"="podtato-head" "#TEMPLATE_APPLICATION_DISPLAY_NAME#"="PodtatoHead"  "#TEMPLATE_APPLICATION_SERVICE_NAME#"="podtato-head-frontend" "#TEMPLATE_APPLICATION_PORT#"="8080" "#TEMPLATE_CHART_REPO#"="oci://ghcr.io/podtato-head/charts/podtato-head" "#TEMPLATE_CHART_VERSION#"="0.3.3"
```

---

### 15. Find images used by the chart and update the zarf.yaml

```bash
uds zarf dev find-images ./ -f upstream --kube-version 1.32 --update
```

---

### 16. View the updated zarf.yaml

```bash
uds zarf tools yq zarf.yaml
```

---

### 17. Review the available tasks

```bash
uds run --list
```

---

### 18. Run a test install

```bash
uds run test-install
```

---

### 19. Verify deploy was successful

- Did the task complete successfully
- Do resources look healthy in the application namespace

  ```bash
  uds zarf tools kubectl get all -n podtato-head
  ```

- Can you access the application in a browser: [podtato-head.uds.dev](https://podtato-head.uds.dev)
- If it wasn't successful, find and fix the issue(s) and run the `dev` task: `uds run dev`

---

### 20. Tear Down
```bash
k3d cluster list
k3d cluster delete --all
```

---

## **CI examples**

Inspect some example CI templates, and see what they have in common with the local development work just completed.

```bash
uds zarf tools yq ../uds-common/templates/*.y*ml
```
