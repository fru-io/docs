---
title: 'Getting Started'
description: null
freshdesk:
    title: 'Getting Started'
    id: 36000100053
    type: 1
    category_id: 36000115505
    folder_id: 36000178531
    agent_id: 36007655997
    status: 2
    tags: []
---

##  Getting started with Fru-Live.

# Access and Setup

After signing up for a plan, Drud will invite you to join our [support ticket system](<http://support.drud.com>) and send you an [invite to our API](<https://support.drud.com/support/solutions/articles/36000106931-working-with-the-api>).

---

## Setting Up Your S3 Bucket

First, install [s3cmd](<https://s3tools.org/s3cmd>):

- Linux: `sudo apt-get install s3cmd`

- Mac: `brew install s3cmd`

- Windows: Download and install [http://sourceforge.net/projects/s3tools/files/s3cmd/](<http://sourceforge.net/projects/s3tools/files/s3cmd/>)

Then, upload your files:

```
s3cmd --access_key=<access_key> --secret_key=<secret> --region=us-east-1 --no-check-certificate put <project name>.files.tar.gz s3://<Customer Bucket Name>/<Project Name>/production/<project name>.files.tar.gz
```

And database (please use a gzip format):

```
s3cmd --access_key=<access_key> --secret_key=<secret> --region=us-east-1 --no-check-certificate put <project name>.sql.gz s3://<Customer Bucket Name>/<Project Name>/production/<project name>.sql.gz
```

*where <**accesskey**\> is your S3 access key, <**secret**\> is your S3 secret, <**Customer Bucket Name**\> is your S3 bucket name, and <**project name**\> is your project name.*

---

## Provisioning Your Site

- Once uploaded to S3, please [submit a ticket](<https://support.drud.com/support/tickets/new>) and ask us to provision your site on Fru-Live. *Please indicate the location of the file(s) in S3 to be used in the restore.*

- We'll let you know when it's ready. Then visit your site’s preview URL to [begin working with your site](<https://support.drud.com/support/solutions/articles/36000106365-working-with-Fru-live-sites>).

