---
title: Jobs
description: How Fru.io hosting works withh the concept of jobs 
---
# Jobs

Many of the commands that are issued against the Fru.io platform are processed as a job. In each instance of a command that generates a job you will be given a job ID that allows you to track the status of the job. When a job is complete it is not deleted so that you can continue to check it's status as necessary.

## Getting a Job ID
The following example generates a job as a result of performing a [database backup](https://docs.fru.io/ databases/#database-backups) against a [site](sites.md) named `mysite` for the `Fru-demo` [organization](organizations.md). The job ID will always bethe last line of output that is returned once a command is [executed](exec.md). In this example, the job ID is `Fru-demo/mysite-h9fqh`.
```
$ Fru.io backup database mysite
Initiated database backup: Fru-demo/mysite-h9fqh
```

## Getting a Job's Details
`Fru.io describe` is used to view more details about a specific job. You can describe jobs related to [backups](https://docs.fru.io/ backups/), [databases](https://docs.fru.io/ databases/), [execs](https://docs.fru.io/ exec/), [restores](https://docs.fru.io/ restores/), and [sites](https://docs.fru.io/ sites/).

The following command describes a database backup that was successfully generated for the `mysite` [site](sites.md) against the `Fru-demo` [organization](organizations.md).
```
$ Fru.io describe backup database mysite-jtsg8
Name:     mysite-jtsg8
Org:      Fru-demo
Created:  2d ago (2020-04-29 09:32:42 -0400 EDT)
Database: mysite
Complete: true
Bytes:    31556
Path:     gs://9db61369-7e94-11ea-8154-a2d42e636/database/backups/adhoc/mysite-jtsg8.gz
```
