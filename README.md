Notice: This repo is only to be used for educational purposes and should not be used in a production environment.

# Workshops

Repo to track and build content to be used for workshops

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

## Resources

- Workshop _[Repo](https://github.com/defenseunicorns/workshops)_
- UDS _[Docs](https://uds.defenseunicorns.com/docs/why-usd/)_
- Zarf _[Docs](https://docs.zarf.dev/)_
- _[UDS Core](https://github.com/defenseunicorns/uds-core)_

## Developing UDS Bundles

- _[UDS Common](https://github.com/defenseunicorns/uds-common)_

## Agenda

- UDS Flow
- Deploy _[UDS Core](https://github.com/defenseunicorns/uds-core)_
- Zarf _[Tutorial](https://docs.zarf.dev/tutorials/0-creating-a-zarf-package/)_
- Podinfo deploy, follow instructions in exercises/pod-info-exercise/README.md
- Svelte UDS Bundle, follow instructions in exercises/svelte-app-exercise/svelte-uds-exercise.md
- Mattermost bundle, follow instruction in exercises/mattermost-exercise/mattermost-exercise.md


## Current Layout

`demos`: Completed demos that are built and deployed with the UDS ecosystem. This is also the solution for the exercises.

- Pod Info: images and helm charts pulled from internet
- Svelte UI (images and helm charts non-existent)
- Mattermost

`exercises`: Template and directions to to bring apps into UDS

- <span style="color:green">Easy</span> Pod Info: Build a zarf package/UDS bundle w/ existing helm charts/images.
- <span style="color:yellow">Moderate</span> Mattermost UDS Bundle
- <span style="color:red">Moderate/Hard</span> Svelte App: Build a zarf package/UDS bundle with no images or helm charts.

### Complete Solutions

- Deploy an application /demos/pod-info-demo
- Deploy a web application /demos/svelte-app-demo
- Deploy Mattermost /demos/mattermost

### Exercises

- Mattermost with a UDS Bundle /exercises/mattermost-exercise/mattermost-exercise.md
- Svelte App (no images or helm charts) /exercises/svelte-app-exercise/svelte-uds-exercise.md
- Addition Exercise /exercises/mattermost-exercise/addition-exercises.md
