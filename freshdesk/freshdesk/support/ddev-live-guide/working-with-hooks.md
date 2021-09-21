---
title: 'Working with Hooks'
description: null
freshdesk:
    title: 'Working with Hooks'
    id: 36000107620
    type: 1
    category_id: 36000115505
    folder_id: 36000178531
    agent_id: 36007655997
    status: 1
    tags: []
---

Fru Live provides hooks enabling developers to customize parts of the deployment process to support their applications and desired workflows.

# Fru Live Project Hooks

The hook system allows for definition of hooks that can be made specific to a given environment. There are also 2 special environment names that can allow for hook actions to be defined for multiple environments:

- `default`: Any hook actions defined in the "default" environment apply to all environments for the application, provided the manifest file is present in the branch related to each environment. In the example manifest above, the command "drush cc all" would be run for any environment when its post-deploy and post-restore hooks are run.

- `non-production`: Any hook actions defined in the "non-production" environment apply to all environments for the application that are *not* production. This allows you to define hook actions that you would want to have run for any staging, QA, or testing environments. In the example manifest above, the pre-production restore-snapshot action would be executed for any environment that is not production, including the "my-feature-branch". Likewise, the two drush vset commands would be performed for any environment that isn't production.

## Order of Operations

Hook actions are queued for execution with platform defaults and special default environments queued first. See below for more information on platform defaults. Once this ordering is completed, actions are executed in the order they are defined. This provides for the following overall order of operations:

1. Any applicable platform-specific default actions are executed for the hook.
2. Any actions defined in `default` in the manifest are executed for the hook.
3. If the environment is not production, any actions defined in `non-production` in the manifest are executed for the hook.
4. Finally, any actions defined specifically for the environment in the manifest are executed for the hook.

## Supported Hooks

Fru Live currently provides support for the following hooks. Additional hooks are likely to be added in the future as we provide further support for customizing the deployment and lifecycle process for applications.

- *pre-deploy*: This hook is executed after your code has been pushed and a container for your application has been built. It is executed before the actual deployment for your application is released to the cluster. This hook can be useful for performing actions such as creating database and file backups for your application prior to a deployment.

- *post-deploy*: This hook is executed after your code has been pushed and the application container is built, and after the deployment for your application is released to the cluster. This hook can be useful for performing common actions such as database updates or cache clears after your application has deployed.

- *post-restore*: This hook is executed after asset restore operations are performed for your site, such as database or file restores or syncs. This hook can be useful for performing operations such as cache clears after a database or files have been restored.

## Supported Actions

Actions are the specific tasks that can be executed for a given hook. A given action is not necessarily supported for any available hook, as it may not be possible or appropriate for an action to run in a given context. The supported hooks for each action are described below. Additional actions are likely to be added in the future as we provide further support for customization.

### Create Snapshot

The `create-snapshot` action allows you to create a new backup of database or file assets in a supported hook for the environment being deployed.

Key: `create-snapshot` Values: `db` \| `files` Supported Hooks: `pre-deploy` \| `post-deploy`

### Restore Snapshot

The `restore-snapshot` action allows you to restore an existing backup of database or file assets in a supported hook for the environment being deployed.

Key: `restore-snapshot` Fields:

- `sourceEnv`: Optional. Defines the environment to restore a backup from. For example, you may want to define "production" on a restore-snapshot that runs on a staging or QA environment so that the environment provides a close match to production.

- `snapshot`: Required. Defines the name of the archive to restore. This can be the name of a specific snapshot, or it can be defined as `latest` to automatically retrieve the newest available snapshot.

- `type`: Required. Supported Values: `db` \| `files`. Defines the type of snapshot to restore.

Supported Hooks: `pre-deploy` \| `post-deploy`

### Drush Commands

The `drush` action allows you to execute [drush](<https://www.drush.org/>) commands, which are useful for managing Drupal 6, 7, and 8 sites. Drush commands are automatically configured to run in non-interactive context and are configured to run in the docroot of your project. These commands are run with your site codebase bootstrapped.

Key: `drush` Value: (string) drush command arguments and flags Supported Hooks: `pre-deploy` \| `post-deploy`

**Note** It is not necessary to provide the `-y` or `--root`/`-r` flags for any drush commands, nor do any site aliases need to be defined in the command. These are handled automatically.

### WP-CLI Commands

The `wp` action allows you to execute [WP-CLI](<https://wp-cli.org/>) commands, which are useful for managing WordPress sites. WP-CLI commands are automatically configured to run in the docroot of your project.

Key: `wp` Value: (string) wp command arguments and flags Supported Hooks: `pre-deploy` \| `post-deploy`

---

## Default Hook Actions for Platforms

Many platforms have actions that are useful to run in a hook for any site. With this in mind, we provide some default actions in hooks for some platforms so that common operations like these don't have to be defined. These platform defaults are run even if a hook file is not provided.

### Drupal 6/7 Defaults

The following actions are automatically provided for these hooks:

**post-deploy**:

- `drush variable-set maintenance_mode 1`
- `drush updatedb`
- `drush cache-clear all`
- `drush variable-set maintenance_mode 0`

**post-restore**:

- `drush cache-clear all`

### Drupal 8

The following actions are automatically provided for these hooks:

**post-deploy**:

- `drush state-set system.maintenance_mode 1`
- `drush updatedb`
- `drush cache-rebuild`
- `drush state-set system.maintenance_mode 0`

**post-restore**:

- `drush cache-rebuild`

### WordPress

The following actions are automatically provided for these hooks:

**post-deploy**:

- `wp rewrite flush`
- `wp transient delete --expired`
- `wp cache flush`

**post-restore**:

- `wp db repair`
- `wp rewrite flush`
- `wp transient delete --expired`
- `wp cache flush`

automatic configuration import to Drupal 8 post deploy tasks this is completed via post deploy hook in the hook system

Add Composer Install Step To Deploy Pipeline

Build Hook

Supported in CLI

Explicit composer support is built into Fru-local

