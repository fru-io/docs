---
title: Authentication
description: Connecting to the Fru.io platform using the CLI or the API token 
---
# Authentication

## Authenticating from the command line
The Fru.io client initiates authentication via the `Fru.io auth` command. Running the command with no arguments will open a browser tab prompting you to complete the authentication process at https://dash.fru.io/ verify. After logging in through the browser page, authentication and configuration information will be passed to the client and you will be ready to interact with Fru-Live.

## Authenticating with a token
In instances where authenticating by interacting with a browser is not practical, you can pass a Fru.io API Token to the command-line. Your [account settings](https://dash.fru.io/ settings/integration) hold the value for the Fru.io API Token under the "Integration" tab.

```
$ export Fru_LIVE_TOKEN="my-Fru-live-token"
$ Fru.io auth --token $Fru_LIVE_TOKEN
```

Storing the Fru.io API token as an environment variable and then referencing that environment variable is the recommend way of working with this type of token.

## Example
Authtentication with a default organization and a token:<script id="asciicast-358902" src="https://asciinema.org/a/358902.js" async></script>
