---
title: TLS
description: Configuring TLS and SSL certificates for Fru.io hosting 
---
# TLS Configuration

You have several options to control TLS settings for [site](sites.md) deployed on Fru-Live. TLS settings include the delivery of a Let's Encrypt SSL certificate and redirecting between http and https.

You can view the TLS and CERTIFICATE ISSUER sections of `Fru.io config site` output to view a [site's](sites.md) configurations.

## Disable TLS
The following example disables TLS for the `mysite` [site](sites.md) in the `Fru-demo` [organization](organizations.md).

```
$ Fru.io config tls mysite --tls-disable
Updated hostname settings for Fru-demo/mysite
```
The output of `Fru.io describe site mysite` will have an updated TLS section.
```
TLS Provider:
TLSDisable:         true
TLSDisableRedirect: false
```
It is advisable to disable the redirect if you would like to disable TLS. The [site](sites.md) described in the output above has https disabled, but will attempt to redirect to https generating an error.

## Disable TLS Redirect
The following example disables the TLS Redirect for the `mysite` [site](sites.md) in the `Fru-demo` [organization](organizations.md).

```
$ Fru.io config tls mysite --redirect-tls-disable
Updated hostname settings for Fru-demo/mysite
```
The output of `Fru.io describe site mysite` will have an updated TLS section.
```
TLS Provider:
TLSDisable:         true
TLSDisableRedirect: true
```
The [site](sites.md) described above would not work on https and would work on http.

## Enable TLS
The following example enables TLS for the `mysite` [site](sites.md) in the `Fru-demo` [organization](organizations.md).

```
$  Fru.io config tls mysite --tls-enable
Updated hostname settings for Fru-demo/mysite
```
The output of `Fru.io describe site mysite` will have an updated TLS section.
```
TLS Provider:
TLSDisable:         false
TLSDisableRedirect: true
```

The site described above would work on both http and https.

## Enable TLS Redirect
The following example enables TLS redirects for the `mysite` [site](sites.md) in the `Fru-demo` [organization](organizations.md).

```
$ Fru.io config tls mysite --redirect-tls-enable
Updated hostname settings for Fru-demo/mysite
```
The output of `Fru.io describe site mysite` has will have an updated TLS section.
```
TLS Provider:
TLSDisable:         false
TLSDisableRedirect: false
```
The [site](sites.md) described above would successfully redirect http traffic to https.
