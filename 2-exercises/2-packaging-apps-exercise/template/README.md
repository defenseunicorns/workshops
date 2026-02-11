# UDS Package #TEMPLATE_APPLICATION_DISPLAY_NAME#

## REMOVE SECTION AFTER UPDATING - START

Replace some common placeholders

| value                                 | replace_with                | example                                                |
| ------------------------------------- | --------------------------- | ------------------------------------------------------ |
| `#TEMPLATE_APPLICATION_NAME#`         | application name            | nginx, mattermost, cert-manager, etc...                |
| `#TEMPLATE_APPLICATION_DISPLAY_NAME#` | application name for humans | NGINX, Mattermost Cert Manager, etc...                 |
| `#TEMPLATE_APPLICATION_PORT#`         | application port            | `9898`                                                 |
| `#TEMPLATE_CHART_REPO#`               | chart repository URL        | `https://charts.jetstack.io/`                          |
| `#TEMPLATE_CHART_VERSION#`            | chart version               | `6.4.0`                                                |

## REMOVE SECTION AFTER UPDATING - END

This package is designed to be deployed on [UDS Core](https://github.com/defenseunicorns/uds-core) and is based on the upstream [#TEMPLATE_APPLICATION_DISPLAY_NAME#](#TEMPLATE_CHART_REPO#) chart.

> INSERT HERE 1-2 sentence summary of what the application does.

## Pre-requisites

The #TEMPLATE_APPLICATION_DISPLAY_NAME# Package expects to be deployed on top of [UDS Core](https://github.com/defenseunicorns/uds-core) with the dependencies listed below being configured prior to deployment.

#### Dependency information

Add any dependency information here

## Flavors

| Flavor | Description | Example Creation |
| ------ | ----------- | ---------------- |
| `upstream` | Uses upstream images within the package. | `zarf package create . -f upstream` |
| `registry1` | Uses images from registry1.dso.mil within the package | `zarf package create . -f registry1` |
| `unicorn` | Uses images from chainguard within the package | `zarf package create . -f unicorn` |

## Releases

The released packages can be found in [ghcr](https://github.com/uds-packages/#TEMPLATE_APPLICATION_NAME#/pkgs/container/#TEMPLATE_APPLICATION_NAME#).

## UDS Tasks (for local dev and CI)

*For local dev, this requires you install [uds-cli](https://github.com/defenseunicorns/uds-cli?tab=readme-ov-file#install)

> [!TIP]
> To get a list of tasks to run you can use `uds run --list`!

## Contributing

Please see the [CONTRIBUTING.md](./CONTRIBUTING.md)
