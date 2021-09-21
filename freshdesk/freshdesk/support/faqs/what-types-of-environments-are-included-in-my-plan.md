---
title: 'What types of environments are included in my plan?'
description: null
freshdesk:
    title: 'What types of environments are included in my plan?'
    id: 36000070127
    type: 1
    category_id: 36000115505
    folder_id: 36000178516
    agent_id: 36007655997
    status: 2
    tags: []
---

In Fru-Live, a project is a grouping of environments (e.g. stage and prod), linked together with a GIT repository endpoint.

All environments are functionally the same, with instance sizes (CPU and RAM) shaped towards anticipated traffic and memory requirements. You may request as many as you've allotted for in your hosting agreement, and customize them to fit your workflow.

By default, we will provision a production environment for each of your projects, with a master branch and a site preview URL at `[projectname]-production.site-prod.Frulive.drud.io` when your environment is created.

Staging environments follow this naming convention: `[projectname]-staging.site-stage.Frulive.drud.io.`At your request, we can setup a custom domain for staging such as `staging.[projectname].com` via a CNAME, aliased to the environment.

