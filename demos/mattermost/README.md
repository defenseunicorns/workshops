# Mattermost

A mattermost server you can run on your local machine, packaged up as a single UDS bundle and deployed with `uds deploy .`

## Quickstart

# Deploy the k3d cluster, UDS-core, and the Mattermost bundle

```bash
uds deploy k3d-core-demo:0.31.2
uds run build-mattermost-bundle
uds deploy uds-bundle-k3d-mattermost-demo-arm64-0.0.1.tar.zst
```

# Create a keycloak admin user

```bash
zarf connect keycloak #This should open you browser and prompt you to create an admin user
Ctrl-c to close the tunnel after creating the admin user
```

# Connect to Mattermost and register the `doug` user

1. Open your browser to https://chat.uds.dev  
2. Click 'Gitlab' under 'Log in with one of the following:'
3. On the UDS Identity Service screen, at the bottom, select 'Click here' to register now.
4. Complete all of the fields, setting 'Username' to `doug` and create a password.
5. Create an MFA token in Google Authenticator (or whichever tool you use)
6. Open another tab in your browser and go to https://keycloak.uds.dev
7. Login with the `admin` account you created earlier (not the `doug` account)
8. On the top-left, click the dropdown and switch the realm from 'Keycloak/master' to 'Unicorn Delivery Service/uds'
9. Select Users from the tree on the left and click on `doug`
10. Enable the 'Email verified' toggle near the top and then click `Save` at the bottom
11. Scroll back up to the top and click on the `Groups` tab and then select `Join Group`
12. Click the words `UDS Core` (not the checkbox), in the next modal put a checkbox in `Admin` and click `Join`

# Login with the `doug` user

1. Go back to `chat.uds.dev` in your browser and try to login again
2. Login as the `doug` user you created earlier using the password and MFA that you set up previously
3. Win!

## Components

The uds-bundle.yaml has multiple components in it, some of which are local references and others are remote oci references.

The ./core-slim, ./dev-secrets, and ./namespaces are all local references. Take a look at each to see what is happening.

**note:** for convenience, some zarf packages are committed to the repo. This is not recommended, instead we would publish those as OCI artifacts (`uds zarf tools registry push ...`)

## Potential Exercises

1. How would you add a task to deploy the bundle?
2. How would you add podinfo to the bundle?
