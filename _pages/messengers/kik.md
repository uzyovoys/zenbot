---
layout: default
title: Kik
permalink: /messengers/kik/
---

You can integrate your bot with [Kik messenger](https://dev.kik.com) bot platform to enable your Kik bot understand a natural language.

## How to create a Kik bot
There is a [reat guide](https://dev.kik.com/#/docs/getting-started) regarding bot development for Kik.
Just perform all related steps and provide the bot\'s **Username** and obtain an **API Key**.

### Setup Username and API Key
In Zenbot web console go to the "Kik Settings" section and provide previously obtained **Username** and **API Key** of your Kik bot.

![Kik settings](/img/kik.png)

Press "Save settings" button, and that is all!
Now your Kik bot can receive text requests and respond regarding your Botscript in Zenbot.

## Variables
Each time Zenbot receives a request from Kik, it generates a set of special variables you can use inside a Botscript.

- **req_kik_chat_id** - an ID of chat from where the request was sent
- **req_kik_user** - a nickname of Kik user
- **req_kik_bot** - Kik bot Username
- **req_kik_key** - Kik bot API Key