# Prerequisites

### System Requirements

- Either a Linux or Apple macOS environment (ARM or Intel) with 'sudo' access.
- An internet connection to pull down the required artifacts/packages in this tutorial.
In terms of laptops, we have a total of 8 laptops folks are free to use.  Or if preferred, people can bring their own laptops that meet these minimum requirements:
- Compute with at least - CPU: 4+ cores, Memory: 32GB+, Disk: 100GB free
- Web browser, ideally Chrome
- Ability to install cli tooling (K3d, helm, zarf, uds)

### Prerequisites

Before beginning this tutorial you will need the following:
- A text editor or development environment such as VSCode
- CLI tools installed on your $PATH (see example below using Homebrew)
- Docker installed and running via Docker Desktop or Colima
  - Note that the Docker environment may need additional RAM resources to complete this guide, up to 24GB. Without enough RAM allocated, some containers may fail to deploy.
- (Optional) Stage some UDS bundles

### Install Homebrew and dependencies

Install Homebrew
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
#Follow any post-installation instructions required by Homebrew
```

Install required packages
```bash
brew tap defenseunicorns/tap && brew install \
zarf \
k3d \
kubectl \
k9s \
helm \
tree \
uds
```

### (Optional) Stage UDS bundles
```bash
ls -1 ./wip/uds-bundle-k3d-core-slim-dev-*.zst >/dev/null 2>&1 || uds pull k3d-core-slim-dev:latest -o ./wip/
export LATEST_UDS_VERSION="0.61.1"
ls -1 ./wip/uds-bundle-k3d-core-demo-*.zst >/dev/null 2>&1 || uds pull k3d-core-demo:${LATEST_UDS_VERSION} -o ./wip/
```
