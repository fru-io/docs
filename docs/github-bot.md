---
title: Usage of GitHub preview bot
description: Launch Fru.io preview sites interacting from GitHub pull requests 
---
# Usage of GitHub preview bot

The [GitHub integration guide](https://docs.fru.io/ github/) explains how to install the Fru.io GitHub app. The Fru Preview bot requires a publicly visible email configured for your account in order to be able to perform authorization on each command.

You can [create new sites](https://docs.fru.io/ sites/#github) from each repository selected as part of the GitHub app installation. With the Fru Preview bot, you can also clone existing sites and deploy them with code directly from a pull request as preview site for testing purposes. The commands are triggered as pull request comments, all you have to do is post the following comment:

```
/Fru-live-preview-site
```
The bot will build your Preview site and return a URL.

There are three pre-conditions for the Fru Preview bot to be able to create preview sites:

- The **Repository** has to be part of your Fru.io [GitHub app](https://docs.fru.io/ github/) installation.
- The **Command** has to be triggered by the pull request author.
- The **Existing origin site** on Fru.io references the repository and pull request's base branch. This is used as a reference to copy the database and file assets.

A list of supported commands for the bot is available at [https://docs.fru.io/ preview-bot](https://docs.fru.io/ preview-bot).
