---
layout: default
title: WeChat
permalink: /messengers/wechat/
---

You WeChat bot can understand a natural language though a Zenbot integration.

## How to create a WeChat bot

### Sign up form
To create a WeChat bot you have to fill a [Sign up form](https://mp.weixin.qq.com/cgi-bin/readtemplate?t=register/step1_tmpl) to obtain an official WeChat account.

### Basic API
Once your account has been approved (it may take some time), please go to the "Developers section" in the WeChat console and provide **URL** and any **Token** for your bot.

Please use a URL like `https://zenbot.org/api/wechat/<id of your Zenbot here>` as a URL for incoming requests in your WeChat bot console.

_You can see this URL in "WeChat Settings" section in Zenbot web console._

### WeChat bot Token
Paste your WeChat bot token in "WeChat settings" section in Zenbot web console and press "Save settings" button.

## Test your WeChat bot
Now you can send some text requests though a WeChat client to your bot and receive responses from Zenbot regarding a Botscript.

{% include note.html text="Note that there may be a delay between a request and response because Zenbot severs are placed outside China." %}

## Variables
Each time Zenbot receives a request from WeChat, it generates a set of special variables you can use inside a Botscript.

- **req_wechat_user** - an ID of WeChat user who has sent a request
- **req_wechat_to** - an ID of WeChat bot

Find more available variables in [Global Variables](/vars/variables/) chapter.

## Restrictions
Please note that WeChat doesn\'t provide any extended info about the user, like latitude and longitude, current time and GMT offset.
Thus you have to obtain this data on your own if you need it.