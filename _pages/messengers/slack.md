---
layout: default
title: Slack
permalink: /messengers/slack/
---

Zenbot provides a [Slack]("https://slack.com/") integration so that your Slack bot can easily start to talk with users on natural language.

## How to create Slack bot
There is a [complete guide](https://api.slack.com/bot-users) on how to create a Slack bot.
You just need a couple of clicks to obtain your Slack bot\'s Token.

Simply copy this token and paste it into "Slack settings" in your Zenbot\'s bot settings.

![Slack settings](/img/slack.png)

{% include note.html text="Note that you do not have to install any webhooks for your Slack bot." %}

## Test your Slack bot
Now you can select your bot in Slack\'s contacts list and send a direct text message.
Your Zenbot\'s bot will response with some text regarding the [Botscript](/botscript/).

{% include note.html text="Note that you can use only direct messages to communicate with your bot." %}