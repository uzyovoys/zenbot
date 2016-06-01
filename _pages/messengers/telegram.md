---
layout: default
title: Telegram
permalink: /messengers/telegram/
---

Zenbot implements [Telegram](https://telegram.org) bot API, so you do not have to have an external hosting to make your natural language speaking bot for Telegram.
Just provide your Telegram\'s bot Authorization token in Zenbot\'s bot settings, and it will start speaking with your users over Telegram.

## How to create Telegram bot
There is a [complete guide](https://core.telegram.org/bots#3-how-do-i-create-a-bot) about how to create Telegram bot and obtain it\'s Authorization token.

Just provide this token in your Zenbot\'s bot Telegram settings.

![Telegram settings](/img/telegram.png)

## Test your Telegram bot
Select your bot in Telegram and send a text message.
Your bot will respond with text responses regarding the [Botscript](/botscript/).

Note that telegram can also interpret HTML tags in responses.
Thus your bot can respond with HTML links and Telegram will load snippets of web pages on fly in chat window.

## Botan analytics
Zenbot currently supports a [Botan analytics](http://botan.io/) service API to track your Telegram bot\'s statistics.

This service enables your bot to store it\'s analytics data automatically for each user\'s request.
Further you can track bot\'s metrics through a [special Botan bot](https://telegram.me/Botaniobot?start=src%3Dbotanio) in Telegram.

To enable Botan integration for your bot, just obtain a Botan token and provide it through the [web console](https://zenbot.org) in the "Telegram settings" section.

{% include note.html text="Note that Zenbot will track only identifiers of inputs.
So if the matched input has not an \"id\" attribute, it will not be tracked." %}