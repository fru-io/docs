---
title: Adminstration
description: User management and administrative tasks on Fru.io hosting
---
# Administration

The Fru.io platform is designed to work with [organizations](organizations.md). As an administrator, you can administer the users that have the ability to manage deployments for an [organization](organizations.md). Administration is managed through the `Fru.io admin` set of commands.

## Listing users
Listing users for the [organization](organizations.md) you are authenticated against is accomplised with `Fru.io admin list`.

```
$  fru admin list
ADMINS
 NAME                TYPE
 Fru-demo@Fru.io  Admin
 bar@example.com     Admin

DEVELOPERS
 NAME             TYPE
 foo@example.com  Developer
```

## Adding users
You can add an administrator or a developer to an [organization](organizations.md). An administrator has the ability to add and remove other administrators in addition to managing deployments. A developer can use all functionality provided by the Fru.io client other than adding and removing administrators. The users email address should be the same as their [GitHub](github.md) email address.

Add a developer with `fru admin add developer`.

```
$ Fru.io admin add developer foo@example.com
Added developer foo@example.com to organization Fru-demo
```

Add a developer with `fru admin add administrator`.

```
$ Fru.io admin add admin bar@example.com
Added user bar@example.com to organization Fru-demo
```

## Deleting users
Delete a developer with `fru admin delete developer`.

```
$ Fru admin delete developer foo@example.com
Are you sure you want to delete developer Fru-demo/foo@example.com? (Y/n) y
Deleted developer foo@example.com from organization Fru-demo
```

Delete a developer with `Fru admin delete administrator`.

```
$ fru admin delete admin bar@example.com
Are you sure you want to delete admin Fru-demo/bar@example.com? (Y/n) y
Deleted admin bar@example.com from organization Fru-demo
```
