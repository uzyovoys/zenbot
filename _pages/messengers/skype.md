---
layout: default
title: Skype
permalink: /messengers/skype/
---

You can easily integrate your bot with [Skype Bot Platform](https://www.skype.com/en/developer/) to make your chatbot accessible in Skype.

## How to create a Skype bot
There are four steps to integrate your bot with Skype.

### Create a new app
Create a new application in [Microsoft Application Registration Portal](https://apps.dev.microsoft.com).
Obtain **App ID** of new application and create a new password.

### Create a new Skype bot
Create a new Skype bot in [Skype Bot Platform](https://developer.microsoft.com/en-us/skype/bots/manage).
Provide your **App ID** in the Skype bot\'s settings.

### Set Messaging Webhook
In the Skype bot\'s setting provide the URL for Messaging Webhook like `https://zenbot.org/api/skype/<id of your Zenbot>`.

_You can see this URL in your Zenbot\'s web console._

### Save your Skype settings
Save previously obtained App ID and Password in your bot\'s settings in Zenbot web console.

Just copy your App ID and paste it to **Client ID** and Password to **Client Secret**, and press Save button.

![Zenbot Skype settings](/img/skype.png)

## Test you Skype bot
Add your newly created Skype bot to your Skype list. Now you can select your bot in Skype\'s contacts list and send a direct text message.
Your Zenbot\'s bot will respond with some text regarding the [Botscript](/botscript/).

## Variables
Each time Zenbot receives a request from Skype, it produces a set of special variables.

- **req_skype_user** - an ID of Skype user
- **req_skype_token** - Skype bot token
