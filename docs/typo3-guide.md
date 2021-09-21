---
title: TYPO3 Guide
description: Deploy TYPO3 CMS to Fru.io hosting
---
# TYPO3 Getting Started Guide

This tutorial gives an example of the Fru.io commands specific to TYPO3 CMS. First you will need to set up your Fru.io account and connect to your [GitHub](https://docs.fru.io/ github/) acccount using the [Getting Started Guide](https://docs.fru.io/ getting-started/). Fru.io supports other PHP applications and CMSs such as [Drupal](https://docs.fru.io/ drupal-guide/), [WordPress](https://docs.fru.io/ typo3-guide/), etc.

## Fru.io default settings for TYPO3
We give additional flags below to use if your project differs from these defaults.

- Default TYPO3 version is 9
- Default docroot is empty, the repository's root directory (this is the directory from which your [site](sites.md) is served).
- Default branch is master.
- `composer install` will not run.

## Add a TYPO3 site from your connected GitHub account
To create a [site](https://docs.fru.io/ sites/) named `mysite` on Fru.io and import code from a [connected GitHub account](https://docs.fru.io/ github/) named `Fru-demo` with a repo named `mysite` using the default settings, run:

```
$ Fru.io create site typo3 mysite --git-repo https://github.com/Fru-demo/mysite
```

Use `Fru.io describe site mysite` to view info about your [site](https://docs.fru.io/ sites/).

## TYPO3-specific flags
You can add flags for specific configuration options. Use `Fru.io create site typo3 --help` to see all possible flags and their descriptions.

| Flag | Description |
| :---- | :----------- |
| `--typo3-version <version>` |Specify the TYPO3 version, <8>, <9> or <10>. The default is TYPO3 v9. |
| `--docroot <path>` |The docroot is the directory from which your site is served. The default is the repository's root. <br> This value is a relative path from your project root. For TYPO3, the most common is `--docroot public`. |

Here is an example to create a TYPO3 v10 [site](https://docs.fru.io/ sites/) that requires `composer install`, with the docroot in /public:
```
$  ~ Fru.io create site typo3 mysite --git-repo https://github.com/Fru-demo/mysite --docroot public --run-composer-install --typo3-version 10
```
