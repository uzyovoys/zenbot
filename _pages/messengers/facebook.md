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

## Get Started Button
You can enable "Get Started Button" in the bot\'s preferences to allow user to start your bot by pressing a special button the first time. 
This enables your bot to process some initial dialog with the user.

Each time the user clicks this button your bot will receive some text input and can generate any response as for regular input. 
The default text command is **/start** but you can change it on the configuration page in Zenbot\'s web console.
Thus you have to define `/start` (or any other) input pattern in your Botscript to handle this and generate some output. 

{% include note.html text="Note that you have to enable Get Started Button in the Zenbot'\s web console" %}

[Read more](https://developers.facebook.com/docs/messenger-platform/thread-settings/get-started-button) about Get Started button in the Facebook Messenger documentation.

## Send to Messenger button
Each time the user presses "Send to Messenger" button of your bot on any website, your bot receives a **/start** message following by some _optional payload_.

Thus you have to define `/start $Text` input pattern in your Botscript if your bot has to send some response to the user if she clicks "Send to Messenger" button.
In this case `$Text` variable will contain _optional payload_ passed by "Send to Messenger" button\'s "ref" param.

Please read more on [Send-to-Messenger Plugin](https://developers.facebook.com/docs/messenger-platform/plugin-reference/send-to-messenger) page.

## Persistent Menu
Your bot can provide a persistent menu which contains a set of useful text commands or links to external websites.
This menu is always available to the user in the bottom left corner of Messenger\'s client.
Once the user taps on one of the menu items, Messenger sends a text command to your bot or opens an URL of website.

You can easily build such menu in Zenbot\'s web console. Just provide the Label and Payload of each menu item and click "Save menu" button.
Note that you can drag and drop items to re-order them.

IF the Payload of a menu item contains a text command, it will be sent to your bot once the user clicks on this menu item.
Thus you have to define a corresponding input pattern in your Botscript to handle this text command.

## Test your Facebook bot
Just open your app\'s Facebook page, click on "Messages" and send some messages.
Your Zenbot\'s bot will reply with text regarding your [Botscript](/botscript/).

## Variables
Each time Zenbot receives a request from Facebook Messenger, it generates a set of special variables you can use inside a Botscript.

- **req_facebook_token** - a page token of the bot
- **req_facebook_user_firstname** - user\'s first name
- **req_facebook_user_lastname** - user\'s last name
- **req_facebook_user_gender** - user\'s gender