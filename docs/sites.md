---
title: Sites
description: Working with sites on Fru.io hosting
---
# Sites

A "site" on Fru.io is a project which has information attached to it and which can be referenced in commands.

`<site>` is what you want to call your project on Fru-Live. It must consist of lower case alphanumeric characters or ''-'', start with an _alphabetic_ character, and end with an _alphanumeric_ character.

### GitHub

To create your project on Fru.io and import code from [GitHub](github.md) with the default settings, run:
```
$ Fru.io create site drupal <org>/<site> --git-repo https://github.com/<github-org>/<repo-name> [flags]
```

You can add flags for specific configuration options. Use a command as follows to see all possible flags and their descriptions:
```
$ Fru.io create site wordpress -h
```

### GitLab

The previous command is tightly coupled with the GitHub API and [GitHub Apps](https://developer.github.com/apps/), and therefore it does not support any other Git hosts. As we are gradually introducing integrations with more third-party tools and platforms, for [GitLab](https://docs.fru.io/ gitlab/) we have added more universal set of flags that are agnostic of the Git hosting [provider](https://docs.fru.io/ providers/) and newly support not only branches but also tags and any other valid Git revisions:
```
$ Fru.io create site drupal <org>/<site> --git-repo <git-repository-url> --git-rev <branch/tag/commit> [flags]
```


## Working with your site on Fru-Live
Fru.io "watches" the specified branch of your repo. When you push updates to the repo, Fru.io will redeploy the site. This will take a few minutes to complete.

- View a list of all the sites within a specified [organization](organizations.md) with `Fru.io list sites --org <org>`.
- View the state of a specific site with `Fru.io describe site <org>/<site>`.
- Use `Fru.io config` to modify the GitHub repo or branch to pull from.
- Use `Fru.io delete` to delete a resource. For example, `Fru.io delete site <org>/<site>`.

???+ note "Garbage Collection when Deleting a Site"
    When a site is deleted, `file` and `database` backups that belong to the site will also be automatically garbage collected.
    Be sure to use `Fru.io pull` on any live `file` or `database` assets <b>before</b> deleting a site.

Example of a site creation command with describe site command:
```
$ Fru.io create site drupal my-drupal-site \
    --git-repo https://github.com/Fru-demo/multilingual --git-rev master \
    --drupal-version 8 \
    --run-composer-install \
    --tag=drupal,testing,expires \
    --expires-in 2d

For site status, run:
  Fru.io describe site Fru-demo/my-drupal-site
```

```
$ Fru.io describe site Fru-demo/my-drupal-site

SITE INFO
 Name:          my-drupal-site
 Org:           Fru-demo
 Tags:
  - expires
  - testing
  - drupal
 Created:       5m ago (2020-08-20 14:48:28 +0200 CEST)
 Expires:       in 2d (2020-08-22 14:48:28 +0200 CEST)
 Type:          Drupal
 Version:       8
 PHP Version:   7.2
 Healthy:       true
 Updated:       2m ago (2020-08-20 14:51:09 +0200 CEST)
 Info:          PHPApp my-drupal-site is provisioned
 Preview URL:   http://preview-my-drupal-site-Fru-demo.sites.Fru.live
 Cron Status:   enabled
 Cron Schedule:

SITE IMAGE
 Created:       4m ago (2020-08-20 14:48:52 +0200 CEST)
 Run Composer:  true
 Composer Args:
 Status:
 GIT SOURCE
  URL:           https://github.com/Fru-demo/multilingual
  Revision:      master
  CurrentCommit: e477ae98bda87cf081e8652a9a35aa5de276b88f
  Status:

SITE
 Healthy: true
 Updated: 2m ago (2020-08-20 14:51:09 +0200 CEST)
 Info:    PHPApp my-drupal-site is provisioned

FILESTORE
 Healthy: true
 Updated: 3m ago (2020-08-20 14:49:48 +0200 CEST)
 Info:    FileStore my-drupal-site is provisioned

DATABASE
 Healthy: true
 Updated: 3m ago (2020-08-20 14:49:48 +0200 CEST)
 Info:    MySQLDB my-drupal-site is provisioned in default-mfv57 MySQLServer
 AUTOMATED BACKUPS
  Enabled:  false
  Schedule: Not set
  Retain:   0

ENVIRONMENT
 DRUPAL_TRUSTED_HOST_PATTERN=(127\.0\.0\.1)|(localhost)|(preview-my-drupal-site-Fru-demo\.sites\.Fru\.live)

HOSTS
 No custom host configuration
```

#### Setting expiration on your site
Optionally, you can set a site to expire anywhere from 30 minutes to 5 days from the creation timestamp with the `--expires-in` flag. It can be set during initial site creation or configured later. When the site reaches the expiration time, it will be automatically deleted from Fru-Live. This is useful when creating disposable testing or preview sites.

Example for creating a site that will expire in 90 minutes.
```
$ Fru.io create site drupal <org>/<site> --git-repo https://github.com/<github-org>/<repo-name> --expires-in 90m
```

Extending or shortening the expiration sets the expiration time relative to the site creation time and can never extend beyond 5 days total from site creation.
This example will set the expiration to 4 days from when the site was created.
```
$ Fru.io config drupal <site> --expires-in 4d
```

Here is a handy command to filter through your sites for all that have expiration set and sort by which one expires earliest:
```
$ Fru.io list sites -o json --format-time-as-seconds | jq -c '[.sites[] | select(.expires != "")] | sort_by(.expires) | .[]'
```

The flag `-o json` sets the output from plaintext to JSON formatted, the second flag `--format-time-as-seconds` converts the human readable duration and time to seconds and timestamp so it can be conveniently passed to other tools, such as `jq`, for additional processing.
