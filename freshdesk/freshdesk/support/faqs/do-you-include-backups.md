---
title: 'Do you include backups?'
description: null
freshdesk:
    title: 'Do you include backups?'
    id: 36000109075
    type: 1
    category_id: 36000115505
    folder_id: 36000178516
    agent_id: 36007655997
    status: 2
    tags: []
---

Yes, all of our hosting plans include backups. Daily backups are provided for a week; weekly backups are provided for a month.

Backups run nightly and can be accessed directly from your [s3 bucket](<https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html>). To browse these files, download an SFTP client like [Cyberduck](<https://cyberduck.io/>) and enter the AWS credentials from the 1Password AWS note.

Alternatively, you can bring your own S3 bucket and we’ll configure Fru Live to automatically upload backups to it. In this case, our backup retention policy is disabled and you’ll handle backup retention per your business requirements.

