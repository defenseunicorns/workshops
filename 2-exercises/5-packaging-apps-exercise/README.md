# WORK IN PROGRESS

```console
cp -rfv template/ test-pkg-podinfo
```


```console
cd test-pkg-podinfo
```


```console
bash -xv setup.bash "#TEMPLATE_APPLICATION_NAME#"="podinfo" "#TEMPLATE_APPLICATION_DISPLAY_NAME#"="Podinfo" "#TEMPLATE_APPLICATION_PORT#"="9898" "#TEMPLATE_CHART_REPO#"="https://stefanprodan.github.io/podinfo" "#TEMPLATE_CHART_VERSION#"="6.9.0"
```

```console
zarf dev find-images ./ -f upstream
```

# Copy the images into the end of the zarf.yaml