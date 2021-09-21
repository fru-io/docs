---
title: Get started with Fru-Live
description: Set up your account and connect to the Fru hosting platform
---
# Get started with Fru-Live

This tutorial will step you through setting up Fru.io as a new user - from initial [account](account-types.md) [authentication](authentication.md) to installing the Fru.io CLI.

### You will need
- A [Git provider](https://docs.fru.io/ providers/)
- A [Fru-Live](https://dash.Fru.io) account

## Install the Fru.io [GitHub](github.md) app
Grant Fru.io access to your selected repositories.
1. In your browser, navigate to [https://dash.Fru.io](https://dash.Fru.io).
2. Log in to your existing account or create a new account. The Fru.io UI displays.
3. From the left sidebar, select settings>integration. Under GitHub integration, click the **Install Github App** link. A [GitHub](github.md) configuration page displays (you may need to log in to GitHub).
4. Choose the personal or organization account where you want to install the app, then select the repositories you want Fru.io to access and click Install. *You or the organization must own the repositories*.

You can change these settings and add or remove repositories later in [settings/integration](https://dash.fru.io/ settings/integration).

## Install the Fru.io CLI
#### MacOS & Linux
Install the Fru.io CLI with [Homebrew](https://brew.sh):

```
$ brew tap drud/Fru-live
$ brew install drud/Fru-live/Fru-live
```

#### Alternative macOS and Linux install
The below links will download a file named Fru-live.zip

[Download the Fru.io CLI for macOS amd64 (most traditional Macs)](https://downloads.fru.io/ Fru-live-cli/latest/darwin_amd64/Fru-live.zip).

[Download the Fru.io CLI for macOS arm64 (Apple Silicon M1)](https://downloads.fru.io/ Fru-live-cli/latest/darwin_arm64/Fru-live.zip).

[Download the Fru.io CLI for Linux amd64 (most Linux computers)](https://downloads.fru.io/ Fru-live-cli/latest/linux_amd64/Fru-live.zip).

[Download the Fru.io CLI for Linux arm64](https://downloads.fru.io/ Fru-live-cli/latest/linux_arm64/Fru-live.zip).

1. Extract Fru-live.zip. For example: `unzip Fru-live.zip`.
2. Move the resulting Fru.io binary to a directory that is in your $PATH variable. For example: `mv ~/Downloads/Fru.io /usr/local/bin`. You may need to add to your `$PATH` in your .bash_profile or equivalent.

#### Windows
This will download a file named Fru-live.zip.
[Download the Fru.io CLI for Windows](https://downloads.fru.io/ Fru-live-cli/latest/windows/Fru-live.zip).

1. Extract Fru-live.zip to a directory that is in your %PATH% variable. For example, extract to: `C:\Program Files`. You may need to edit and add to the Path environment variable in Advanced System Properties.

### Verify installation and authenticate
[Authentication](authentication.md) connects the Fru.io platform to your install of the Fru.io CLI.

1. In your terminal window, type `Fru-live`. Successful installation will return usage information. Run `Fru.io [command] -h` at any time for details on commands.
2. Run `Fru.io auth`. A browser window opens the Fru.io dashboard displaying a confirmation message.
  The CLI displays `Authentication complete!`. If you are primarily working with one [organization](organizations.md) you may want to run Fru.io auth --default-org <org> to refer to [sites](sites.md) only using <site> instead of <org>/<site> and eliminate needing to use the --org <org> flag for subsequent commands.

## Example
Installing Fru.io with Homebrew:<script id="asciicast-358907" src="https://asciinema.org/a/358907.js" async></script>

