---
title: Frequently asked questions
description: FAQ for using the DDEV hosting environment 
---
# Frequently asked questions

## General questions
### How can I create a site?
The [Getting Started guide](https://docs.ddev.com/getting-started/) shows how to get started with DDEV-Live.

### How do I work with Composer on the platform?
Composer does not run on a Drupal [site](sites.md) by default. To run `composer install` on [site](sites.md) creation, include the flag `--run-composer-install`. Additionally if arguments are required for Composer, pass them in using the `--composer-args <args>` flag.

### What does it mean when a site is ready?
After the `create site` command, a [site](sites.md) is ready when the background processes (like [databases](databases.md) and [files](files.md) system provisioning) have completed successfully, and DDEV-Live is able to successfully serve the site. This can take several minutes.
We’re working on improving the output of the `create` commands. Please let us know if you have [feedback](https://dash.ddev.com/feedback/) to share.

### How do I know when a site is ready?
Use the `describe site` command to see if a [site](sites.md) is ready. For example, `ddev-live describe site <org>/<site>`. The output will display several sections regarding status and health. These sections are not populated until the system reports on them, and the status messages change as the system provisions the [site](sites.md).
It may take some time before your [site](sites.md) comes online.
When your [site](sites.md) is ready, the `describe site` command output includes the preview URL for your [site](sites.md) so you can confirm that it is displaying as expected.

### Is there a site creation timeout?
Yes, the CLI will hang after 60 seconds by default, while waiting for the [site](sites.md) creation to complete. This means the command is still executing on the platform and you should wait a while then check the status again. Use  `--timeout <int>` to set a different timeout interval.

### What happens when I push to a [GitHub](github.md) repo connected to DDEV-Live?
When you push to a connected [GitHub](github.md) repo, DDEV-Live automatically updates your site.

### How can I make a backup of my database or files?
DDEV-Live includes commands to create a [backup](backups.md) and [restore](restores.md) for either a site’s [database](databases.md) or [files](files.md). You need to specify the [organization](organizations.md) and [site](sites.md) name. For example, `ddev-live backup database org1/demo2` and `ddev-live backup files org1/demo2`.

### Do I always have to specify the organization?
No, you can set a default [organization](organizations.md) with `ddev-live auth --default-org <org>`.
When a default [organization](organizations.md) is set, you can ommit the `--org <org>` flag and generally not specify the org:
- Reference a resource by name alone: `ddev-live describe site <site>` instead of `ddev-live describe site <org>/<site>`.

### Will you support other CMS solutions or other Git [Providers](providers.md)?
We support Drupal, WordPress, and Typo3 [sites](sites.md) with code hosted on [GitHub](github.md). DDEV-Live will generally support other PHP applications and CMSs such as TYPO3 or Sulu. Support for other languages, WordPress, Bitbucket and GitLab is planned for the future.

## Privacy and security
### What is the data privacy policy?
DDEV-Live is covered by the DDEV [Privacy Policy](https://www.ddev.com/privacy-policy/).

### Is my site publicly accessible?
Your [site](sites.md) will be live on our ddev.live domain, which is a publicly accessible URL. You can also add your own TLD.

## Support
We want to help you be successful with DDEV-Live. If you have a question that is not answered here, please email our [Support](mailto:support@ddev.com) team.

You can view the [uptime and status](https://status.ddev.com/) of the DDEV-Live hosting platform, and subscribe to updates.

We want to hear from you. Please send us your feedback using the [Feedback form](https://dash.ddev.com/feedback/) or by running `ddev-live feedback` from the command line. We aim to improve  DDEV-Live to meet your needs, so we encourage you to really exercise the platform and try things out.
