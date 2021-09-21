---
title: 'How does deployment to production work?'
description: null
freshdesk:
    title: 'How does deployment to production work?'
    id: 36000070128
    type: 1
    category_id: 36000115505
    folder_id: 36000178516
    agent_id: 36007655997
    status: 1
    tags: []
---

*There aren't manual steps involved with adeploy/merge to production*. \_As long as all of your dependencies are in the git push, they will get deployed. Settings files will be generated and automatically connected to the DB.

Because the Fru LIve build process is not complex, you should expect that whatever you push to Fru Live will get deployed. If there’s a failure in the managed part of the platform, we’ll absolutely take care of it.

