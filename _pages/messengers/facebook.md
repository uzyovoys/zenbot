---
layout: default
title: Facebook Messenger
permalink: /messengers/facebook/
---

Zenbot implements Facebook Messenger\'s API and enables your bots to talk with users over Facebook Messenger.
Moreover - you do not have to have an external hosting for your Facebook\'s chat bot.

{% include note.html text="Nevertheless you can host any of your chat bot related logic on your side and integrate it with Zenbot over REST API." %}

## How to create Facebook chat bot
There is a [complete guide](https://developers.facebook.com/docs/messenger-platform/quickstart) on how to create chat bot for Facebook Messenger platform.

Thus you have to create Facebook app and Facebook page or use existing one.

### Webhook
When setting up a webhook, provide the next URL:

`https://zenbot.org/api/facebook/<the key of your bot>`

Zenbot already implements everything your bot needs to validate a webhook and catch up messages from users.

{% include note.html text="Note that before setting up a webhook you have to select any Verify Token and provide it inside your bot settings.
Only after this setting is saved you can verify and save webhook in the Facebook's app settings console." %}

### Page Access Token
Generate your page Access Token and provide it inside your bot\'s settings.

Zenbot will subscribe your app to the page automatically and will be ready to catch text requests from users over your Facebook app.

![Zenbot Facebook settings](/img/facebook.png)

## Test your Facebook bot
Just open your app\'s Facebook page, click on "Messages" and send some messages.
Your Zenbot\'s bot will reply with text regarding your [Botscript](/botscript/).

## Start message
Each time user presses "Start" button in Messenger client, your bot will receive "/start" message following by some payload it was provided.

Thus you have to provide `/start $Text` input pattern in your Botscript if you need to response to the start command.
