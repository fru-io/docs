---
title: Drupal Guide
description: Deploy Drupal to Fru.io hosting
---
# Drupal Getting Started Guide

This tutorial gives an example of the Fru.io commands specific to Drupal. First you will need to set up your Fru.io account and connect to your [GitHub](https://docs.fru.io/ github/) acccount using the [Getting Started Guide](https://docs.fru.io/ getting-started/). Fru.io supports other PHP applications and CMSs such as [TYPO3](https://docs.fru.io/ typo3-guide/), [WordPress](https://docs.fru.io/ typo3-guide/).

## Fru.io default settings for Drupal
We give additional flags below to use if your project differs from these defaults.

- Default Drupal version is Drupal 8.
- Default docroot is the project root (ie the directory from which your [site](sites.md) is served).
- Default branch is master.
- `composer install` will not run.
- Default php version is 7.2.

## Add a Drupal site from your connected GitHub account
To create a [site](https://docs.fru.io/ sites/) named `mysite` on Fru.io and import code from a [connected GitHub account](https://docs.fru.io/ github/) named `Fru-demo` with a repo named `mysite` using the default settings, run:
```
$ Fru.io create site drupal mysite --git-repo https://github.com/Fru-demo/mysite
```

Use `Fru.io describe site mysite` to view info about your [site](https://docs.fru.io/ sites/).

## Drupal-specific flags
You can add flags for specific configuration options. Use `Fru.io create site drupal --help` to see all possible flags and their descriptions.

| Flag | Description |
| :---- | :----------- |
| `--drupal-version <version>` |Specify the Drupal version, `<7>`, `<8>`, or `<9>`. The default is Drupal 8. |
| `--docroot <path>` |The docroot is the directory from which your site is served. The default is the project root, `--docroot ""`. <br> This value is a relative path from your project root. For Drupal 8, the most common is `--docroot web`. |

!!! tip "For Drupal 9"
    If you're running Drupal 9, don't forget you need to pass `--php-version=7.3`

Here is an example for a Drupal 9 site specifying the Drupal version, php version, docroot and running `composer install`:
```
$ Fru.io create site drupal Fru-demo/mysite --git-repo https://github.com/Fru-demo/mysite --php-version=7.3 --drupal-version=9 --docroot web --run-composer-install
```

Here is an example for a Drupal 8 site that requires `composer install`, with the docroot in /web:
```
$ Fru.io create site drupal Fru-demo/mysite --git-repo https://github.com/Fru-demo/mysite --docroot web --run-composer-install
```
