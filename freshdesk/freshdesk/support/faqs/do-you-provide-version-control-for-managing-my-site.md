---
title: 'Do you provide version control for managing my site?'
description: null
freshdesk:
    title: 'Do you provide version control for managing my site?'
    id: 36000070126
    type: 1
    category_id: 36000115505
    folder_id: 36000178516
    agent_id: 36007655997
    status: 2
    tags: []
---

Fru Live provides customers a Git endpoint for each project. However, we don’t recommend using this endpoint as the canonical source for your project. Instead, we recommend that you create and maintain a repository internally (Github, Gitlab, etc.) as your central place for development. When you’re ready to push your code to an environment, you push to the GIT remote that we have provided you.

All Fru.io environments associated with a specific site share a repo, and deployments occur based on the branch name. In other words, each environment corresponds to a branch that you’ll be able to push to.

We recommend separate branches for each environment production, staging, and dev. Deployments then become a matter of merging your canonical master into the environment branch, and pushing to Fru-Live.

However, you aren't required to use those branch names: you *could* push your master branch to the production branch on Fru.io and it will work.

*Note: you don’t need to maintain a linear history for deployments. If you `force push` a branch with a single, giant commit of all of your code, that’s what will be deployed.*

For detailed directions on making code changes on Fru-Live, [see this page](<https://support.drud.com/support/solutions/articles/36000106365-making-incremental-code-changes-to-your-site>).

For more on remotes, see [https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes](<https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes>).

