Notice: This branch is only to be used for educational purposes. This should not be used in any production environment.

# Workshops

Repo to track and build content to be used for Growth Workshops

## Resources

- Workshop _[Repo](https://github.com/defenseunicorns/workshops)_
- UDS _[Docs](https://uds.defenseunicorns.com/docs/why-usd/)_
- Zarf _[Docs](https://docs.zarf.dev/)_
- _[UDS Core](https://github.com/defenseunicorns/uds-core)_

## Agenda

- UDS Flow
- Deploy _[UDS Core](https://github.com/defenseunicorns/uds-core)_
- Zarf _[Tutorial](https://docs.zarf.dev/tutorials/0-creating-a-zarf-package/)_
- UDS Bundle Tutorial in /tutorial/tutorials.md
- Deploying Apps and Developing UDS Bundles

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
