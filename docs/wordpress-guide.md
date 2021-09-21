---
title: WordPress Guide
description: Deploy WordPress to Fru.io hosting
---
# WordPress Getting Started Guide

This tutorial gives an example of the Fru.io commands specific to WordPress. First you will need to set up your Fru.io account and connect to your [GitHub](https://docs.fru.io/ github/) acccount using the [Getting Started Guide](https://docs.fru.io/ getting-started/). Fru.io supports other PHP applications and CMSs such as [TYPO3](https://docs.fru.io/ typo3-guide/), [Drupal](https://docs.fru.io/ drupal-guide/), etc.

## Fru.io default settings for WordPress
We give additional flags below to use if your project differs from these defaults.

- Default WordPress version is WordPress 5.3.2.
- Default docroot is the project root.
- Default branch is master.
- `composer install` will not run.

## Add a WordPress site from your connected GitHub account
To create a [site](https://docs.fru.io/ sites/) named `mysite` on Fru.io and import code from a [connected GitHub account](https://docs.fru.io/ github/) named `Fru-demo` with a repo named `mysite` using the default settings, run:
```
$ Fru.io create site wordpress mysite --git-repo https://github.com/Fru-demo/mysite
```

Use `Fru.io describe site mysite` to view info about your [site](https://docs.fru.io/ sites/).

## WordPress-specific flags
You can add flags for specific configuration options. Use `Fru.io create site wordpress --help` to see all possible flags and their descriptions.

| Flag | Description |
| :---- | :----------- |
| `--wordpress-version <version>` |Specify WordPress version, `<5.x>`. The default is `5.3.2`. |
| `--docroot <path>` |The docroot is the directory from which your site is served. The default is the project root, `--docroot ""`. <br> This value is a relative path from your project root. For WordPress, you might use `--docroot web`. |
| `--ephemeral-paths <path>` |A comma-separated list of ephemeral mount paths relative to docroot (ex. content/cache). |
| `--persistent-paths <path>`|A comma-separated list of persistent mount paths relative to docroot (ex. content/uploads).|

Here is an example for a WordPress site that requires `composer install`, with the docroot in /docroot:
```
$  Fru.io create site wordpress Fru-demo/mysite --git-repo https://github.com/Fru-demo/mysite --docroot docroot --run-composer-install
```
