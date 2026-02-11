# Tasks

The `tasks` here are designed to be consumed via remote task includes in a single root level `tasks.yaml` in the downstream repo. Includes should follow the standard remote include pattern documented by UDS CLI:

```yaml
includes:
  - deploy: https://raw.githubusercontent.com/defenseunicorns/uds-common/$TAG/tasks/deploy.yaml
```

Pinning to a specific tag of a task (rather than `main`) with renovate watching for updates is **strongly recommended** since tasks do rely on dependencies like command syntax for `zarf` and `uds` as well as the published versions of `uds-core`.

> [!NOTE]
> Zarf is not required for tasks in this repo, the vendored zarf (`uds zarf`) included with UDS CLI is used instead to prevent version mismatches.

## Task Files

There are multiple task files available in this repository with different objectives and required variables.

### [setup.yaml](./tasks/setup.yaml)

| Name | Description |
|------|-------------|
| **k3d-test-cluster** | Creates a k3d cluster for testing based on the K3d + UDS Core Slim Dev bundle |
| **k3d-full-cluster** | Creates a k3d cluster for testing based on the K3d + UDS Core Full bundle |
| **print-keycloak-admin-password** | Print the default keycloak 'admin' password to standard out (if INSECURE_ADMIN_PASSWORD_GENERATION was used on uds-core) |
| **keycloak-admin-user** | Sets up the Keycloak admin user for dev/testing if not already created |
| **print-keycloak-admin-password** | Prints out Keycloak Admin credentials |
| **keycloak-user** | Creates a Keycloak user in the UDS Realm |
| **create-doug-user** | DEPRECATED! Please consider using keycloak-user instead |

### [create.yaml](./tasks/create.yaml)

| Name | Description |
|------|-------------|
| **package** | Create the UDS Zarf Package in the repository |
| **recreate-latest-tag-package** | Recreate the UDS Zarf Package in the repository |
| **test-bundle** | Create the test bundle (bundling package + dependencies for testing) |

### [deploy.yaml](./tasks/deploy.yaml)

| Name | Description |
|------|-------------|
| **package** | Deploy the created UDS Zarf Package |
| **test-bundle** | Deploy the created test bundle (deploying package + dependencies for testing) |

### [remove.yaml](./tasks/remove.yaml)

| Name | Description |
|------|-------------|
| **test-bundle** | Remove the deployed test bundle |

### [utils.yaml](./tasks/utils.yaml)

| Name | Description |
|------|-------------|
| **determine-repo** | Determines the OCI repository that this flavor should go into (i.e. 'unicorn' should be private) |

### [lint.yaml](./tasks/lint.yaml)

This task file defines a set of linting commands to ensure code quality and compliance. It includes tasks to install linting tool dependencies, perform checks on YAML files and OSCAL configurations, validate shell scripts with shellcheck, and verify or add the SPDX license identifier in source files. Both the `license` and `fix-license` tasks parse a `.license_config.yaml` file in the project root directory, but will default to the Defense Unicorns dual-license if the file is not present.

| Name | Description |
|------|-------------|
| **deps** | Install linting tool dependencies |
| **all** | Run all linting commands |
| **yaml** | Run YAML linting checks |
| **oscal** | Run linting checks on OSCAL |
| **shell** | Run shellcheck on all Maru tasks, GitHub workflows, and local shell scripts |
| **license** | Lint for the SPDX license identifier being in source files |
| **fix-license** | Add the SPDX license identifier to source files |
| **tasks** | Dry run all tasks in the base tasks file |

