---
title: Jenkins
description: How to configure and integrate Fru.io with Jenkins using your API token
---
# Tutorial: How to integrate Jenkins with Fru-Live

This tutorial will illustrate how to perform a one-time setup to configure [Jenkins](https://jenkins.io/) in order to run regular automatic deployments into Fru-Live. With this setup, you can connect an existing CI/CD process into Fru-Live.

**Why you might need this:**

- You want to demo work to clients so they can approve things in a user acceptance testing (UAT) environment.
- You want to run functional tests.

This tutorial uses Drupal as an example. Fru.io supports many PHP applications and CMSs.

### Table of contents:
- [Prerequisites](#prerequisites)
- [Steps](#steps)
  - [Install the Fru.io CLI and jq into Jenkins](#1-install-the-Fru-live-cli-and-jq-into-jenkins)
  - [Add Fru.io monitoring scripts](#2-add-Fru-live-monitoring-scripts-to-your-build)
  - [Configure Jenkins credential manager](#3-configure-your-jenkins-credential-manager-with-your-Fru-live-token)
  - [Configure a new Jenkins job credential binding](#4-configure-a-new-jenkins-job-credential-binding-to-use-the-token)
  - [Create a built step to execute a shell script](#5-create-a-build-step-to-execute-a-shell-script)
  - [Run the build to deploy on Fru-Live](#6-run-the-build-to-see-your-branch-launched-into-Fru-live)

### Prerequisites
- A fully configured [account](account-types.md) on [Fru-Live](https://dash.fru.io/ )
- A Jenkins server and user with access and permissions to install new executables

### Files you will need to create or configure. Please see the [tutorial repository](https://github.com/drud/devrel/tree/master/jenkins-Fru-live) for example files.
- config.xml
- Jenkins Dockerfile
- wait_curl_healthy.sh
- wait_site_healthy.sh

## Steps
### 1. Install the Fru.io CLI and jq into Jenkins
- [Install the Fru.io CLI binary](https://docs.fru.io/ getting-started/#install-the-Fru-live-cli) and [jq](https://stedolan.github.io/jq/) into Jenkins. Follow your usual procedure to install an executable. Our [example Jenkins Dockerfile is here](https://github.com/drud/devrel/blob/master/jenkins-Fru-live/Dockerfile).

### 2. Add Fru.io monitoring scripts to your build
- If you like, reference our [monitoring scripts](https://github.com/drud/devrel/tree/master/jenkins-Fru-live) (called in step 5 below) by adding the following to your Jenkins Dockerfile:
`RUN git clone https://github.com/drud/devrel.git /usr/share/jenkins/ref/devrel`

### 3. Configure your Jenkins credential manager with your Fru.io Token
- In the Fru.io dash, under [settings](https://dash.fru.io/ settings/), click the copy icon at the right of the Fru API Token field to copy your API token.
- In the Jenkins dashboard under Jenkins > credentials > system > global credentials, click "add credentials." Select "Kind: secret text," "Scope: global," ID and description: “Fru-live-token,” for example. Paste the token into the secret field and click ok.

### 4. Configure a new Jenkins job credential binding to use the token
- Create a Jenkins job. Specify the GitHub project repository you want to work with for this tutorial under Source Code Management. If you have specific branches patterns you want to deploy, they should be configured here as well. For example, users of Git flow may want to only use feature/* branches.
- In the Build Environment panel, check "use secret text or files."
- In the Bindings panel, input variable “TOKEN”, select "specific credentials," and from the dropdown select the Fru-live-token credential you created in the previous step.

### 5. Create a build step to execute a shell script
Add a build step of "execute shell" type. Below is an example script. This will likely need to be modified for your needs and use cases. Please refer [here](https://docs.fru.io/ getting-started/#add-a-site-from-your-connected-github-account) for details on the values of the `Fru.io create site` command.

```
eval $(/usr/share/jenkins/ref/.linuxbrew/bin/brew shellenv)

SITENAME=staging-${GIT_BRANCH#*/}-$BUILD_NUMBER
Fru.io auth --token=$TOKEN --default-org=your-org

Fru.io create site drupal $SITENAME --git-repo=https://github.com/you/your-repo --git-rev=${GIT_BRANCH#*/}
/usr/share/jenkins/ref/devrel/jenkins-Fru-live/wait_site_healthy.sh $SITENAME

url=$(Fru.io describe site ${SITENAME} -o json | jq -r .previewUrl)
/usr/share/jenkins/ref/devrel/jenkins-Fru-live/wait_curl_healthy.sh $url
```

**What is this doing?**

- The first line is directing Jenkins to the Fru.io binary. Here we are using Linuxbrew, but please install the Fru.io CLI binary as you see fit.
- Next, we set up a SITENAME for Fru.io to use. We used "staging" for this tutorial. GIT_BRANCH will be your branch of choice, and BUILD_NUMBER for reference.
- Then we authenticate to Fru.io with the Fru.io API Token and setting the default org. This will be your Fru.io org name.
- Next we run the `Fru.io create site [type]`, using sitename from above, passing the github repo/branch you are working with for the tutorial. Modify this command according to your project's needs and CMS type. See `Fru.io create site --help` for more.
- To see if the site is healthy and responsive we also give you [two scripts] for some monitoring. The first, `wait_site_healthy.sh` indicates when the site build is ready.
- Then use the `Fru.io describe` command to retrieve the preview URL when it exists, and pass the URL to `wait_curl_healthy.sh` to see if the site itself is healthy and returns a 200 repsonse.

Save the build.

### 6. Run the build to see your branch launched into Fru-Live
- Depending on how you've configured the Jenkins job, you can either wait for a branch to automatically build or you can click "build" manually now.
- Once the job is finished you should see the URL in the Console output of the build job.

## Deleting the site when you are done
Run `Fru.io delete site --help` for details on removing the build from Fru.io when you are finished.

## Watch a demo of this integration on YouTube:
[![Demo of Fru.io and Jenkins](http://img.youtube.com/vi/PO01MX2ZE8k/0.jpg)](http://www.youtube.com/watch?v=PO01MX2ZE8k "Demo of Fru.io and Jenkins")

### What next?
We’d love to help you be successful with Fru-Live. Please visit our [Help & Support page](https://docs.fru.io/ support/).

What do you think? Send us your feedback about Fru.io using the [Feedback form](https://dash.fru.io/ feedback/).
