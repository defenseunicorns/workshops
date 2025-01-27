# Deployment Guide for Authorization Demo

Add Authorization to an app built without it using [Authservice](https://github.com/istio-ecosystem/authservice) which is integrated into [UDS](https://github.com/defenseunicorns/uds-core).

## Prerequisites

- [uds-cli](https://arc.net/l/quote/usdacfia)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [k3d](https://k3d.io/stable/)

## Steps

### 1. **Deploy the demo**
```sh
uds run default
```
> **Note** This and all further commands need to be run from this demos directory ```workshops/4-demonstrations/core-apps/authorization```

### 2. **Brows to podinfo**
   
Open a web browser and got to ```https://podinfo.uds.dev```

### 3. **Place podinfo behind SSO**
```sh
uds run apply-sso-config
```
> **Note** To watch authservice in action, pull up k9s before applying the sso config ```uds zarf tool monitor``` Hint: press 0 (zero) if nothing is showing up.

### 4. **Brows to podinfo again**
```https://podinfo.uds.dev```

> **Note** Authservice will need to restart before podinfo will be accessible.  This will happen automatically and should only take 10-20 sec.

### 5. **Optional: Remove sso config**
```
uds run remove-sso-config
```

This will apply the original configuration to podinfo and remove the sso requirement. 

## Cleanup

To remove the deployed resources, run:
```sh
uds run delete uds
```

## Additional Information


**Keycloak** settings: ```https:keycloak.admin.uds.dev``` 
    **username**: admin
    **password**: Run the cmd: ```uds run get-keycloak-admin-password``` in your terminal.

Refer to the `tasks.yaml` file for detailed task definitions.

> **Note:** 2FA is disabled for this demo. 
