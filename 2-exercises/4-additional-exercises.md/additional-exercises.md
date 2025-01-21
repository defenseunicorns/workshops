# Addition Exercises

## Single UDS Bundle: k3d, UDS Core, and all the applications

### Put k3d, UDS Core, and all of the application into a single UDS Bundle.

To get all of the components needed into a single zarf package, to deploy on top of a Kubernetes Distribution (in the case k3d), follow the instructions in ./core-slim/.gitkeep, then add the following code to `uds-bundle.yaml` in this directory under the `packages:` definition.

```bash
  - name: uds-k3d-dev
    repository: ghcr.io/defenseunicorns/packages/uds-k3d
    ref: 0.8.0

  - name: init
    repository: ghcr.io/defenseunicorns/packages/init
    ref: v0.36.1

  - name: core-slim-dev
    path: ./core-slim
    ref: "0.25.2" # Update this to the latest version of uds-core-slim
    overrides:
      keycloak:
        keycloak:
          variables:
            - name: INSECURE_ADMIN_PASSWORD_GENERATION
              description: "Generate an insecure admin password for dev/test"
              path: insecureAdminPasswordGeneration.enabled
              default: true
```
