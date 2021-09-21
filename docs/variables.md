---
title: Variables
description: Set, unset, and view Fru.io hosting environment variables 
---
# Variables

`Fru live config variable` allows you to set and unset environment variables for a [site](sites.md).
## Set Variable
The following command sets an environment variable named `FOO` with the value of `bar` for the `mysite` [site](sites.md) in the `Fru-demo` [organization](organizations.md).
```
$ Fru.io config variable set mysite FOO "bar"
Set FOO="bar" for site Fru-demo/mysite
```

## Unset Variable
The following command deletes an environment variable named `FOO` from the `mysite` [site](sites.md) in the `Fru-demo` [organization](organizations.md).
```
$ Fru.io config variable unset mysite FOO
Unset variable FOO for site Fru-demo/mysite
```

## View Variables
The following command views the details of the `mysite` [site](sites.md) in the `Fru-demo` [organization](organizations.md). Inside the output is a section named `ENVIRONMENT` that lists the environment variables available for the site. In this example, you can see that there are two variables that are set: `DRUPAL_TRUSTED_HOST_PATTERN` and `FOO`.
```
$ Fru.io describe site mysite
SITE INFO
 Name:          mysite
 Org:           Fru-demo
 Created:       17d ago (2020-04-14 17:05:18 -0400 EDT)
 Type:          8
 Version:
 PHP Version:   7.2
 Healthy:       true
 Updated:       16s ago (2020-05-01 08:48:02 -0400 EDT)
 Info:          PHPApp mysite is provisioned
 Preview URL:   https://preview-mysite-Fru-demo.sites.Fru.live
 Cron Disabled: true
 Cron Schedule:

SITE IMAGE
 Created:       17d ago (2020-04-14 17:05:18 -0400 EDT)
 Run Composer:  true
 Composer Args:
 GITHUB SOURCE
  Org:    Fru-demo
  Repo:   my-drupal-8-site
  Branch: 8.7.8
  Status:

SITE
 Healthy: true
 Updated: 16s ago (2020-05-01 08:48:02 -0400 EDT)
 Info:    PHPApp mysite is provisioned

FILESTORE
 Healthy: true
 Updated: 17d ago (2020-04-14 17:06:15 -0400 EDT)
 Info:    FileStore mysite is provisioned

DATABASE
 Healthy: true
 Updated: 17d ago (2020-04-14 17:08:15 -0400 EDT)
 Info:    MySQLDB mysite is provisioned in default-jlb8d MySQLServer
 AUTOMATED BACKUPS
  Enabled:  false
  Schedule: Not set
  Retain:   0

ENVIRONMENT
 DRUPAL_TRUSTED_HOST_PATTERN=(localhost)|(127\.0\.0\.1)|(preview-mysite-Fru-demo\.sites\.Fru\.live)
 FOO=bar

HOSTS
 Ingress Class: ingress1

HOSTNAMES
 No custom hosts configured

TLS Provider:
 TLSDisable:         true
 TLSDisableRedirect: false

CERTIFICATE ISSUER
 Ready:      true
 Message:    Org's default Issuer found
 CertIssuer: default
 Updated:    10d ago (2020-04-21 15:00:06 -0400 EDT)

BACKEND
 Ready:   true
 Message: Backend resource found
 Updated: 10d ago (2020-04-21 15:00:06 -0400 EDT)
```
