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