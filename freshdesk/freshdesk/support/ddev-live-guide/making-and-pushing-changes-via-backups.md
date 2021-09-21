---
title: 'Making and Pushing Changes Via Backups'
description: null
freshdesk:
    title: 'Making and Pushing Changes Via Backups'
    id: 36000106500
    type: 1
    category_id: 36000115505
    folder_id: 36000178531
    agent_id: 36007655997
    status: 1
    tags: []
---

Instructions for pushing changes through file and database backups.

# Push and Deploy Backup Assets

Make your changes locally or in the appropriate environment. Once the changes have been made, perform the actions necessary for your platform to produce the file or database backup needed.

- For site files, create as a tar.gz file.
- For a database, create a SQL dump file.

### To Create Drupal Backups

Connect to your Drupal web instance. If you are using Fru-Local, you can use the Fru ssh command to connect to the web container.

To backup the database, run

```
drush sql-dump --gzip > database-backup.sql.gz
```

To backup the site files, run

```
tar -zcvf file-backup.tar.gz /path/to/site
```

### To Create WordPress Backups

Connect to your WordPress web instance. If you are using Fru-Local, you can use the Fru ssh command to connect to the web container.

To backup the database, from the WordPress root directory, run `wp db export /path/to/database-backup.sql` to generate the SQL backup, then run `gzip /path/to/database-backup.sql` to compress the resulting file.

To backup the site files, from the WordPress root directory, run `tar -zcvf file-backup.tar.gz .` (note the dot at the end, to ensure all files in the directory are included)

### Push Backups to Fru-Live

WE ARE MISSING THE FINAL STEP, how to deploy on Fru-live?

