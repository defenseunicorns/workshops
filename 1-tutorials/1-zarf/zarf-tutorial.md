## Exercise #1 - Zarf

First, let’s do an exercise with **Zarf**, the air-gap-friendly package/deployment tool.

For information on zarf, explore the links below:
- [Website](https://zarf.dev/)
- [Docs](https://docs.zarf.dev/)
- [GitHub](https://github.com/zarf-dev/zarf)

---

### 1. Define a zarf.yaml that Packages the Podinfo Helm Chart

```bash
cat <<EOF > zarf.yaml
kind: ZarfPackageConfig
metadata:
  name: podinfo
  version: 0.0.1
components:
  - name: podinfo
    required: true
    charts:
      - name: podinfo
        version: 6.4.0
        namespace: podinfo
        url: oci://ghcr.io/stefanprodan/charts/podinfo
        valuesFiles:
          - values.yaml
    images:
      - ghcr.io/stefanprodan/podinfo:6.4.0
      - ghcr.io/stefanprodan/podinfo:sha256-57a654ace69ec02ba8973093b6a786faa15640575fbf0dbb603db55aca2ccec8.sig
EOF
```

---

### 2. Download an Example Values File and Review the zarf.yaml

```bash
curl -O https://raw.githubusercontent.com/zarf-dev/zarf/refs/heads/main/examples/helm-charts/values.yaml
uds zarf tools yq zarf.yaml
```

---

### 3. Build the Zarf Podinfo Package

```bash
uds zarf package create ./ --confirm
ls -l zarf-package-*.zst
```

NOTES:
* [Packaging Info around zstd](https://github.com/zarf-dev/zarf/blob/d11d623c2c8966a6c3f159a201dc909cd1545832/site/src/content/docs/ref/packages.mdx#local-tarball-path-tar-and-tarzst)

---

### 4. Look at the Package Software Bill Of Materials (SBOM)

```bash
uds zarf package inspect sbom zarf-package-*.zst
open podinfo/sbom-viewer-ghcr.io_stefanprodan_podinfo_*.html  # Or open file directly in your browser
```

---

### 5. Setup a Local Dev K8s Cluster

```bash
k3d cluster create zarf-test
```

---

### 6. Perform a Zarf Init

```bash
uds zarf init
# ? Do you want to pull this init package? y
# ? Deploy this Zarf package? y
# ? Deploy the k3s component? N
# ? Deploy the git-server component? N
```

---

### 7. Check What is Deployed

```bash
uds zarf tools kubectl get pods -A
```

```bash
uds zarf tools kubectl get svc -n zarf -l release=zarf-docker-registry
```

```bash
uds zarf tools kubectl get validatingwebhookconfiguration,mutatingwebhookconfigurations --field-selector metadata.name=zarf
```

---

### 8. Deploy the Zarf Podinfo Package

*(If adventurous, and running locally, turn off the wifi before running the command then back on after deploy completes)*
```bash
uds zarf package deploy zarf-package-*.zst --confirm
```

---

### 9. Check Results

```bash
helm ls -n podinfo
```

```bash
uds zarf tools kubectl get all -n podinfo
```

```bash
uds zarf tools registry ls 127.0.0.1:31999/stefanprodan/podinfo
```

```bash
uds zarf tools kubectl -n podinfo get pods -l app.kubernetes.io/name=podinfo -o jsonpath='{.items[0].spec.containers[*].image}'
```

---

### 10. View the Podinfo Service

```bash
uds zarf connect --namespace=podinfo --name=podinfo --remote-port=9898 --local-port=9999
# Ctrl+c when done to exit
```

NOTE: If you went the adventurous route, podinfo does reference external CSS urls so remember that it 'renders' but it's empty on the screen. Feel free to run `curl https://127.0.0.1:9999`

---

### 11. Tear Down

```bash
k3d cluster list
k3d cluster delete --all
```
