## Requirements

### System Requirements

- Either a Linux or Apple macOS environment (ARM or Intel) with 'sudo' access.
- An internet connection to pull down the required artifacts/packages in this tutorial.

### Prerequisites

Before beginning this tutorial you will need the following:
- A text editor or development environment such as VSCode
- UDS CLI installed on your $PATH Install UDS CLI
- Docker installed and running Docker Desktop
  - Note that the Docker environment may need additional RAM resources to complete this guide, up to 24GB. Without enough RAM allocated, some containers may fail to deploy.
- K3D installed and running
- UDS-core installed into K3D The k3d-core-slim-dev bundle will accomplish both tasks for you K3D Core Slim Dev Bundle as well as ensuring any required Custom Resource Definitions (CRD's) are installed as well.
- Helm

### Quick start using Homebrew

Install homebrew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
#Follow any post-installation instructions required by Homebrew
```

Install required packages
```
#Install required components and tools:
brew tap defenseunicorns/tap && brew install \
zarf \
k3d \
kubectl \
k9s \
helm \
uds
```
