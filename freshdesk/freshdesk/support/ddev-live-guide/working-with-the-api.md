---
title: 'Working with the API'
description: null
freshdesk:
    title: 'Working with the API'
    id: 36000106931
    type: 1
    category_id: 36000115505
    folder_id: 36000178531
    agent_id: 36007655997
    status: 2
    tags: []
---

# API account

If you do not have API credentials, please[open a ticket](<https://support.drud.com/support/tickets/new>) and request one. We'll create an account, notifying you to set your password.

## API documentation

Our API and its documentation are in active development. Attached below is a Swagger.yaml file for accessing the current API endpoints. You can import this into your tool of choice that supports Swagger.

## Authentication

The Fru.io API uses JWTs as an API token. You can request a JWT by submitting a POST request to [/user](<https://api.Fru-live.drud.io/docs/#/auth/login>)

You'll receive a long string of letters and numbers back from that request, and that's what you'll need to include in authenticated requests to other API endpoints. The header that you'll need to send should look like this:

Authorization: Bearer [your JWT]

If you're submitting requests through the Swagger UI, you can also copy your JWT, click the "Authorize" button at the top right of the page, and paste the JWT into the "Value" field. This way, subsequent requests to authenticated endpoints will succeed.

## Supported Actions

Through the API, you can perform the following actions:

- Get a list of all projects that you have access to
- Get details about a single project, including Git push URLs
- *Sync assets and databases between environments*
- *Get a list of backups for a given project + environment*
- *Kick off a new backup*
- *Check the status of a backup job*
- *Delete a backup*
- *Upload a backup*
- *Download a backup*
- *Restore a backup to a given project + environment*
- *Check the status of a restore job*

## API roadmap

Additional functionality on our roadmap for the API includes:

- Create/update/delete projects and environments
- Self-service registration of users and organizations
- Ad-hoc command execution inside of a project/environment
- Self-service management of PHP version and environment addons (varnish, memcached, etc)
- There's a work-in-progress, command-line client (and go client library)

