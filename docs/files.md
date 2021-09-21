---
title: Files
description: List, backup, push, pull, and restore databases on Fru hosting 
---
# Files

## Listing Files
`Fru.io list` can list different types of objects including [backups](https://docs.fru.io/ backups/), [databases](https://docs.fru.io/ databases/), [execs](https://docs.fru.io/ exec/), [files](https://docs.fru.io/ files/), [restores](https://docs.fru.io/ restores/), and [sites](https://docs.fru.io/ sites/).

The following command returns the file assets for the `mysite` [site](sites.md). In this example, there is one file named foo.jpg in your files directory.
```
$ Fru.io list files mysite
FILE ASSETS
 PATH
 foo.jpg
```

## File Backups
File [backups](https://docs.fru.io/ backups) are created on demand and are not run on a schedule. Once a [backup](https://docs.fru.io/ backups) has been generated it can be [restored](https://docs.fru.io/ restores/) to a [site](https://docs.fru.io/ sites/).

`Fru.io backup` initiates a [job](https://docs.fru.io/ jobs) to create a [backup](https://docs.fru.io/ backups) of files. The output will contain a [job](jobs.md) name you can use to get more information.

```
$ Fru.io backup files mysite
Initiated files backup: Fru-demo/mysite-d6m5h
```
`Fru.io describe` will give you the [job's](https://docs.fru.io/ jobs) status.
```
$ Fru.io describe backup file Fru-demo/mysite-d6m5h
Name:      mysite-d6m5h
Org:       Fru-demo
Created:   29s ago (2020-04-23 17:33:41 -0400 EDT)
FileStore: mysite
Type:      export
Status:    Completed
```

## File Restores
`Fru.io restore files` initiates a [job](https://docs.fru.io/ jobs) to create a [backup](https://docs.fru.io/ backups) of files. The output will contain a [job](jobs.md) name you can use to get more information.

```
$ Fru.io restore files mysite
Initiated files restore Fru-demo/mysite-wtm5z

```
`Fru.io describe` will give you the [job's](https://docs.fru.io/ jobs) status.
```
$ Fru.io describe restore files Fru-demo/mysite-wtm5z
Name:      mysite-wtm5z
Org:       Fru-demo
Created:   20s ago (2020-04-23 18:39:38 -0400 EDT)
FileStore: mysite
Type:      import
Status:    Completed
```

## Pushing Files
`Fru.io push` can move [files](https://docs.fru.io/ files/) and [databases](https://docs.fru.io/ databases/) from your local environment to a [site](https://docs.fru.io/ sites/).

The following command pushes a file named foo.jpg from local to live.
```
$ Fru.io push files mysite foo.jpg
Uploaded: foo.jpg
      To: backups/on-demand/foo.jpg
```

## Pulling Files
`Fru.io pull` can move [files](https://docs.fru.io/ files/) and [databases](https://docs.fru.io/ databases/) from a [site](https://docs.fru.io/ sites/) to your local environment.

The following command downloads a file named `foo.jpg` from the `mysite` [site](sites.md) to the current local working directory.
```
$ Fru.io pull files mysite foo.jpg
Asset(s) downloaded.
```
The following command downloads all files from the `mysite` site to the local `/home/Fru-demo/tmp` directory.

```
$ Fru.io pull files mysite --dest ~/tmp
trimmed: foo.jpg
localDestPath /home/Fru-demo/tmp/foo.jpg
Downloaded foo.jpg (1/2)
trimmed: bar.jpg
localDestPath /home/Fru-demo/tmp/bar.jpg
Downloaded bar.jpg (2/2)
Asset(s) downloaded.
```
