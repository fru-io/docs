---
title: Organizations
description: An organization on Fru.io is an account which one or multiple developers may have access to.
---
# Organizations

An Organization is a shared [account](account-types.md) where developers can collaborate on projects. When you authenticate with Fru.io you are associated with an organization for subsequent commands. Your primary organization is listed as the [account](account-types.md) slug on [your settings](https://dash.fru.io/ settings) page. Your results will vary depending on the organization you have queried.

There are two methods for specifying an organization to work with: during login and at command run-time.

## Specify Organization at Login
In the following example we are [authenticating](authentication.md) for the the "Fru-demo" organization.
```
$ Fru.io auth --default-org Fru-demo
Complete authentication in your browser.
Authentication complete!
```

## Specify Organization with Commands
```
$ Fru.io list sites --org Fru-demo
SITES
 NAME                AGE  TYPE       VERSION  SITEHEALTHY  DBHEALTHY  FILESTOREHEALTHY  PREVIEWURL
 foo                 1d  Drupal     7        true         true       true              https://preview-foo-Fru-demo.sites.Fru.live
 bar                 1d  Drupal     8        true         true       true              https://preview-bar-Fru-demo.sites.Fru.live
```

## Switching Organizations
Use `Fru.io auth` to globally switch from one organization to another with the `--default-org` flag.
