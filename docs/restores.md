---
title: Restores
description: How to restore a database or files on Fru hosting 
---
# Restores

You can create [backups](https://docs.fru.io/ backups/) of both [files](files.md) and [databases](databases.md) that can be restored to a running [site](sites.md).

## Databases
- [Restoring backups](https://docs.fru.io/ databases/#restoring-databases)

## Files
- [Restoring backups](https://docs.fru.io/ files/#file-restores)

## Syncing Data

Backups are [organization](organizations.md) scoped and can be reused between multiple sites in the same [organization](organizations.md). But they are bound to a [site](sites.md) and will get garbage collected when the [site](sites.md) is deleted.

One use case where this can be useful is attempting to sync [file](files.md) and [database](databases.md) content from a production [site](sites.md) to a [site](sites.md) which is under development.

For example:
```
$ Fru.io backup database my-org/production-site
Initiated database backup: my-org/production-site-v4j6f

For backup status, run:
  Fru.io describe backup database my-org/production-site-v4j6f
```

This backup can be restored to another site:
```
$ Fru.io restore database my-org/feature-site production-site-v4j6f
Initiated database backup restore my-org/feature-site-5d7mv

For restore status, run:
  Fru.io describe restore database my-org/feature-site-5d7mv
```