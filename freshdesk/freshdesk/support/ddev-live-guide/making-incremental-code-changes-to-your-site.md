---
title: 'Making Incremental Code Changes to Your Site'
description: null
freshdesk:
    title: 'Making Incremental Code Changes to Your Site'
    id: 36000106365
    type: 1
    category_id: 36000115505
    folder_id: 36000178531
    status: 1
    tags: []
    agent_id: 36008255312
---

Instructions for pushing incremental changes to your website through code.

# The Fru.io Workflow

To make incremental code changes to your site on Fru-Live, you’ll work with two repositories.

The first is your “source of truth” repository that you already use to manage your website's code. This can be Github or Bitbucket or Gitlab or wherever you currently host your source control. When you host with Fru-Live, your canonical source for your project code is maintained by you and doesn’t change.

The second repository is the accompanying GitLab remote that Fru.io provides to you in 1password. When you’re ready to push your code to a Fru.io environment, you just push to that remote.

*While not required, we strongly recommend you **make your changes locally first. [Fru-Local](<https://Fru.readthedocs.io/en/stable/>) makes it easy to stand up a local instance of your site for testing and making changes, and provides [integration with Fru-Live](<https://Fru.readthedocs.io/en/stable/users/providers/drud-s3/>)**.*

The high-level Fru.io workflow is:

1. Commit and push your changes to the appropriate branch/repo for your site in your “source of truth” repository. *You always push to this location first to ensure it serves as the source of truth for your site.*
2. Once your repo has been updated, commit and push the changes again to the Fru.io GitLab repository for your site. *Be sure to push to the correct branch - in many cases a production and staging branch will be available. It is always advised to push and test first to a staging branch when available).*

*For more background on how repositories work on Fru-Live, [see this FAQ](<https://support.drud.com/support/solutions/articles/36000070126-do-you-provide-version-control-for-managing-my-site->).*

*Depending on your workflow and/or the changes you are making to your site, you may prefer to [push and deploy entire backup assets](<https://support.drud.com/support/solutions/articles/36000106500-making-and-pushing-changes-via-backups>).*

## To Commit and Push Changes to Your GitLab Repository:

- Add the GitLab repository as a remote, using a name of your choice. In the example below, we add the remote with a name of “Fru”. The user, password and repository location will be different for your site.

`git remote add Fru https://user:password@gitlab.Fru-live.drud.io/your/repo.git`

- Checkout the appropriate branch. In this example, the *Fru remote* has a staging branch.

`git checkout staging`

- Commit and push your files. When using the push command, it is important to be sure you are specifying the remote location as well as the branch you want to push to. In this example, we are pushing to our *Fru remote*, and pushing changes from our *local staging branch* to the *remote’s staging branch*.

`git commit -m “Test commit”`

`git push Fru staging:staging`

- With the push to the GitLab staging branch, Fru.io will automatically perform the tasks necessary to deploy the changes. Once the job is complete, you should be able to view your changes with the preview URL for the particular site and environment.

## Commit / Push Everything Needed to Run Your Site

There aren’t manual steps involved with a deploy/merge to a Fru.io environment. Whatever is needed to run your site is pushed to the GIT endpoint via a git push to deploy. Settings files will be generated and automatically connected to the DB.

Because there’s no pre-processing of source code before it gets deployed to an environment, it is important to commit your 3rd party dependencies to your project repo.

A notable examples are legacy systems that run a composer install, npm install, bower install, or some other related package management command to pull in 3rd party dependencies.

If this will not work for your requirements, please let us know. We can work with you to set up Jenkins (or a similar tool) to run a build step for you, and then push the result to your Fru.io Git endpoint.

*Note: it is best practice* [to exclude any large files](<https://git-scm.com/docs/gitignore_>)*(images, pdfs, etc.) from your Git repository.*

