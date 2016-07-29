---
layout: default
title: Facebook Messenger
permalink: /messengers/facebook/
---

Zenbot implements Facebook Messenger\'s API and enables your bots to talk with users over Facebook Messenger.
Moreover - you do not have to have an external hosting for your Facebook\'s chat bot.

{% include note.html text="Nevertheless you can host any of your chat bot related logic on your side and integrate it with Zenbot over REST API." %}

## How to create a Facebook chat bot
There is a [complete guide](https://developers.facebook.com/docs/messenger-platform/quickstart) on how to create chat bot for Facebook Messenger platform.

Thus you have to create Facebook app and Facebook page or use existing one.

### Webhook
When setting up a webhook, provide a URL like `https://zenbot.org/api/facebook/<id of your Zenbot bot here>`.

_You can see this URL in Zenbot web console._

Zenbot already implements everything your bot needs to validate a webhook and catch up messages from users.

{% include note.html text="Note that before setting up a webhook you have to select any Verify Token and provide it inside your bot settings.
Only if this setting is saved you can verify and save webhook in the Facebook's app settings console." %}

### Subscription Fields
You have to check "messages", "messaging_optins" and "messaging_postbacks" to make your bot receive messages from Facebook Messenger.

### Page Access Token
Generate your page Access Token and provide it inside your bot\'s settings.

Zenbot will subscribe your app to the page automatically and will be ready to catch text requests from users over your Facebook app.

## Start message
Each time a user presses "Start" button in the Messenger\'s client, your bot receives a "/start" message following by some _optional payload_.

Thus you have to define `/start $Text` input pattern in your Botscript if your bot has to send some response to the user if she clicks "Start" button.
In this case `$Text` variable will contain _optional payload_ passed by "Start" button\'s "ref" param.

Please read more about this on [Send-to-Messenger Plugin](https://developers.facebook.com/docs/messenger-platform/plugin-reference/send-to-messenger) page.

## Test your Facebook bot
Just open your app\'s Facebook page, click on "Messages" and send some messages.
Your Zenbot\'s bot will reply with text regarding your [Botscript](/botscript/).

## Variables
Each time Zenbot receives a request from Facebook Messenger, it generates a set of special variables you can use inside a Botscript.

- **req_facebook_token** - a page token of the bot
- **req_facebook_user_firstname** - user\'s first name
- **req_facebook_user_lastname** - user\'s last name
- **req_facebook_user_gender** - user\'s gender