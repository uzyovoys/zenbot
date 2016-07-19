---
layout: default
title: Slack
permalink: /messengers/slack/
---

Zenbot provides a [Slack]("https://slack.com/") integration, so that your Slack bot can easily start to talk with users on natural language.

## How to create a Slack bot
There is a [complete guide](https://api.slack.com/bot-users) on how to create a Slack bot.
You just need a couple of clicks to obtain your Slack bot\'s Token.

Simply copy this token and paste it into "Slack settings" in your Zenbot\'s bot settings.

![Slack settings](/img/slack.png)

{% include note.html text="Note that you do not have to install any webhooks for your Slack bot." %}

## Slash commands
Zenbot enables your bot react on any [Slash commands](https://api.slack.com/slash-commands) as well as regular messages.

{% include note.html text="Slash commands allows the user to request your bot in any channel." %}

To make it work just use a URL like `https://zenbot.org/api/slack/<your bot id>` as a URL for your slash command inside an "Integration Settings" section on the "Slash Commands" configuration page.

In your Botscript define an input pattern which looks like `/<you slash command>`.
For example, if you would like your bot to respond on a slash command like `/doit something`, you have to define an input pattern `/doit $Text`.

## Distribute your Slack bot
If you would like to share your Slack bot, you have to create **Slack application** with bundled bot to distribute it to another teams.
[This guide](https://api.slack.com/slack-apps) completely describes this process.

All you have to do - is to create Slack app in your Slack team account, provide **Redirect URI** and obtain **Client ID** and **Client Secret**.

### Redirect URI
The application creation process requires you to define a **Redirect URI** for OAuth authorization.

Just paste here the URI which looks like `https://zenbot.org/api/slack/<your bot id>`.

_You can find this URL on your bot\'s settings page in Zenbot web console._

### Client ID and Secret
Once you have created your Slack application, you have to open "App Credentials" and copy your app\'s "Client ID" and "Client Secret" and paste them into appropriate fields in your bot\'s setting page in in Zenbot\'s [web console](https://zenbot.org).

{% include note.html text="Note that Zenbot cannot connect your bot with your Slack app before this step." %}

### Success and Error redirect URLs
As you can see there are two more _optional_ fields inside the "Slack settings" section.
There are "OAuth Success Redirect URL" and "OAuth Error Redirect URL".

Once user has successfully installed your Slack app, Zenbot redirects her to the "OAuth Success Redirect URL".
Otherwise Zenbot redirects her to the "OAuth Error Redirect URL".

You _can_ define your own URLs for this, otherwise Zenbot will use default URLs.

{% include note.html text="Thus in the case of successful installation Zenbot will redirect user to the Slack web client page.
Otherwise Zenbot will show a page with error message." %}

## Test your Slack bot
Now you can select your bot in Slack\'s contacts list and send a direct text message.
Your Zenbot\'s bot will respond with some text regarding the [Botscript](/botscript/).

{% include note.html text="Note that you can use only direct messages to communicate with your bot." %}

## Variables
Each time Zenbot receives a request from Slack, it generates a set of special variables you can use inside a Botscript.

- **req_slack_token** - the token of Slack bot
- **req_slack_channel** - ID of the channel from where the request was sent
- **req_slack_user** = ID of the user who has sent the request