---
title: Preview bot
description: Launch Fru.io preview sites with the repository bot 
---
# Preview Bot

The Fru.io platform supports launching preview sites directly from  supported source code [providers](https://docs.fru.io/ providers), [GitHub](https://docs.fru.io/ github-bot) and [GitLab](https://docs.fru.io/ gitlab-bot). The bot detects new pull or merge requests on repositories connected to Fru.io and allows users to trigger the following actions using comments on the PR or MR:

### Basic commands

- `/Fru-live-help` - display preview bot help
- `/Fru-live-preview-site` - launch a preview site based on the code in this PR/MR
- `/Fru-live-delete-preview-site` - delete existing preview site associated with this pull or merge request

The command `/Fru-live-help` is triggered automatically on each new pull or merge request from which creation of a preview site is possible. The branch against which the PR or MR has been raised must be deployed on Fru.io for Preview to be available. More information about this is provided on the [GitHub](https://docs.fru.io/ github-bot) and [GitLab](https://docs.fru.io/ gitlab-bot) pages. Similarly, `/Fru-live-delete-preview-site` is triggered when pull or merge request is closed.
