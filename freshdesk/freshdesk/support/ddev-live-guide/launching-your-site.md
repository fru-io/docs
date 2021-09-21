---
title: 'Launching Your Site'
description: null
freshdesk:
    title: 'Launching Your Site'
    id: 36000106930
    type: 1
    category_id: 36000115505
    folder_id: 36000178531
    agent_id: 36007655997
    status: 1
    tags: []
---

# The Launch Process

For sites that are already hosted and live on another platform, we provide a site proxy service to forward traffic to another IP.

We will proxy your live site and restore a copy to Fru-Live, providing you a preview URL to review it on Fru Live.

Once you've validated that the production site looks good, let us know that you are ready to migrate to Fru-Live’s full hosting mode, and point your DNS at us:

- Apex domain (yoursite.com), include all 3 A-records:

    - A Record: @ \| 35.168.185.204
    - A Record: @ \| 35.169.15.168
    - A Record: @ \| 52.0.29.214

- www subdomain ([www.](<http://www.drupaleasy.com/>)yoursite.com):

    - CNAME Record: www \| live.drud.com

- subdomain (subdomain.yoursite.com)

    - CNAME Record: subdomain \| live.drud.com

We'll:

1. re-sync your DB and files (if required)
2. Turn off the site proxy
3. Add the hostnames to the environment
4. Turn on TLS

*Note: While LetsEncrypt gets the certificate to us very quickly, there is a delay before the TLS cert is in place and usable (usually less than 10 minutes).*

---

