## Exercise #2 - Pepr

Now let’s do an exercise with **Pepr**, the Kubernetes controller manager.

For information on Pepr, explore the links below:
- [Docs](https://docs.pepr.dev/)
- [GitHub](https://github.com/defenseunicorns/pepr)

---

### 1. Create a Cluster with a Lightweight Deploy of UDS Core (~5-10 mins)

```sh
uds deploy k3d-core-slim-dev:latest --confirm
```

### 2. See What Got Deployed
```bash
uds zarf tools kubectl get po -A
```

### 3. Try and Do Bad Things
```bash
uds zarf tools kubectl create service nodeport my-svc --tcp=5678:8080
uds zarf tools kubectl run my-pod --image=busybox --privileged=true -- date
```

### 4. Review Pepr Logs
```bash
uds monitor pepr denied
```

### 5. Loosely Define an Application Spec
```bash
uds zarf tools kubectl create deployment my-dep -oyaml --dry-run=client --image=busybox -- date > my-dep.yaml && uds zarf tools yq my-dep.yaml
```

### 6. Deploy the Application
```bash
uds zarf tools kubectl apply -f my-dep.yaml
```

### 7. How Did Pepr Help?
```bash
uds monitor pepr mutated
```

### 8. View the Modified Application Spec
```bash
uds zarf tools kubectl get pods -oyaml $(uds zarf tools kubectl get pods -lapp=my-dep -o jsonpath="{.items[0].metadata.name}") | uds zarf tools yq 'del(.status)'
```

---

### 9. Build & Deploy the Podinfo Zarf Package and Define a Custom Resource
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
curl -O https://raw.githubusercontent.com/zarf-dev/zarf/refs/heads/main/examples/helm-charts/values.yaml
uds zarf package create ./ --confirm
uds zarf package deploy zarf-package-*.zst --confirm
```

Create the custom resource:
```bash
cat <<EOF > uds-package.yaml
apiVersion: uds.dev/v1alpha1
kind: Package
metadata:
  name: podinfo
  namespace: podinfo
spec:
  network:
    expose:
      - service: podinfo
        selector:
          app.kubernetes.io/name: podinfo
        gateway: tenant
        host: podinfo
        port: 9898
    allow:
      - direction: Egress
        selector:
          app.kubernetes.io/name: podinfo
        remoteGenerated: Anywhere
  monitor:
    - selector:
        app.kubernetes.io/name: podinfo
      targetPort: 9797
      portName: http-metrics
EOF
```

View the resource file:
```bash
uds zarf tools yq uds-package.yaml
```

### 10. Deploy the Custom Resource
```sh
uds zarf tools kubectl apply -f uds-package.yaml
```

### 11. Watch - What Did Pepr Do?
```bash
uds zarf tools kubectl get packages.uds.dev -A
uds zarf tools kubectl get netpol -n podinfo
uds zarf tools kubectl get virtualservices -A
uds zarf tools kubectl get authorizationpolicies -n podinfo
uds zarf tools kubectl get servicemonitors,podmonitors -n podinfo
```

---

### 12. See the Results
Open in a browser:
**[podinfo.uds.dev](http://podinfo.uds.dev)**

---

### 13. Tear Down
```bash
k3d cluster list
k3d cluster delete --all
```
