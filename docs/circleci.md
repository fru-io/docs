---
title: CircleCI
description: How to configure and integrate Fru.io with CircleCI using an API token 
---
# Tutorial: How to integrate CircleCI with Fru-Live

This tutorial will illustrate how to perform a one-time setup to configure [CircleCI](https://circleci.com/) in order to run regular automatic deployments into [Fru-Live](https://Fru.io/Fru-live/). With this setup, you can connect an existing CI/CD process to Fru-Live.

This tutorial uses [Drupal](https://docs.fru.io/ drupal-guide/) as an example. Fru.io has explicit support for multiple CMSs and PHP applications.

**Why you might need this:**

- You want to demo work to clients or your team so they can approve work in a user acceptance testing (UAT) environment.
- You want to run functional tests.

### Table of contents:
- [Prerequisites](#prerequisites)
- [Resources](#resources)
- [Steps](#steps)
  -  [Set up and configure your CircleCI project](#1-set-up-and-configure-your-CircleCI-project)
  - [Get your Fru.io API token](#2-Get-your-Fru-Live-API-token)
  - [Add the Fru.io token to CircleCI](#3-Add-the-Fru-Live-token-to-CircleCI)
  - [Include the Fru.io orb in your CircleCI config](#4-Include-the-Fru-Live-orb-in-your-CircleCI-config)
  - [Configure with orb commands](#5-Configure-with-orb-commands)
  - [Run your build](#6-Run-your-build)

### Prerequisites
- A fully configured [account](account-types.md) on [Fru-Live](https://dash.fru.io/ )
- A Fru.io [API token](https://docs.fru.io/ authentication/#authenticating-with-a-token)
- A CircleCI account
- A CircleCI organization configured to allow [uncertified orbs](https://circleci.com/docs/2.0/using-orbs/#certified-vs-3rd-party-orbs)
- A GitHub repository configured with the [Fru.io GitHub app](https://docs.fru.io/ github/#install-the-Fru-live-github-app)

### Resources
- [The Fru.io CircleCI orb](https://circleci.com/orbs/registry/orb/Fru/Fru-live)

### Files you will need to create or configure 
- .circleci/config.yml

## Steps
### 1. Set up and configure your CircleCI project 
- Follow your usual procedures to start or configure a project. Add a new project from the repository list in CircleCI, click "start building" to add configuration manually in the following steps.
### 2. Get your Fru.io API token
- In the Fru.io dash, under [settings](https://dash.fru.io/ settings/), click the copy icon at the right of the Fru API Token field to copy your API token.
### 3. Add the Fru.io token to CircleCI
- Visit settigs for your project in CircleCI and add the Fru.io API Token as a new environmental variable such as `Fru_LIVE_AUTH`.
### 4. Include the Fru.io orb in your CircleCI config
- Add or alter the CircleCI config file in your project under .circleci/config.yml to include the [Fru.io orb](https://circleci.com/orbs/registry/orb/Fru/Fru-live) as follows and as shown in the [example](#Example-config.yml): 
```
orbs:
  Fru-live: Fru/Fru-live@latest
```
- Use `@latest` or the version number found on the [Fru.io orb registry page](https://circleci.com/orbs/registry/orb/Fru/Fru-live).
- When the build runs, the Fru.io orb will install Homebrew and the Fru.io CLI if not present.

### 5. Configure with orb commands
Use the following Fru.io orb commands as appropriate for your project and use case, or add additional commands from the Fru.io CLI. Use these to configure your circleci/config.yml to run your required build steps:

- **Fru-live/install** This orb command will install the Fru.io CLI. You may not need to do this step if your image already includes the Fru.io CLI.
- **Fru-live/auth** Logs in with your API token environmental variable (see example below). You can also provide a `default-org` if your account has access to multiple [organizations](https://docs.fru.io/ organizations/).
- **Fru-live/ci-branch-multi** This will create new sites for every push that happens to the repository.
- **Fru-live/delete** This deletes the site following a test run or a manual UAT step.

### Example config.yml:
```
version: 2.1

parameters:
  Fru-org:
    type: string
    default: 'your-organization'

orbs:
  Fru-live: Fru/Fru-live@0.17.0

jobs:
  build:
    docker:
      - image: circleci/php:7.2-node-browsers
    steps:
      - checkout
      - run: sudo composer self-update
      - restore_cache:
          keys:
            - composer-v1-{{ checksum "composer.lock" }}
            - composer-v1-
      - run: composer install -n --prefer-dist
      - save_cache:
          key: composer-v1-{{ checksum "composer.lock" }}
          paths:
            - vendor
      - Fru-live/install
      - Fru-live/auth:
          Fru-live-token: Fru_LIVE_AUTH
          default-org: '<<pipeline.parameters.Fru-org>>'
      - Fru-live/ci-branch-multi:
          prefix: 'stg'
          site-type: 'drupal'
          extra-params: '--docroot=public --run-composer-install'
      - run: BEHAT_PARAMS='context[parameters][base_url]=https://preview-${Fru_SITENAME}-<<pipeline.parameters.Fru-org>>.site.Fru.live' ./vendor/bin/behat
      - Fru-live/delete
```

### 6. Run your build
Trigger your build as usual, such as by pushing changes to your repository. In the above example the cleanup step is run immediately. You may want to include a step to wait for manual QA etc. 

### What next? 
We’d love to help you be successful with Fru-Live. Please visit our [Help & Support page](https://docs.fru.io/ support/).

What do you think? Send us your feedback about Fru.io using the [Feedback form](https://dash.fru.io/ feedback/).
