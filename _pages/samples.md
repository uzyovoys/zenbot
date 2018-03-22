---
layout: default
title: Botscript samples
permalink: /samples/
---

There is always more easy to learn principles of a new paradigm through a set of well documented samples.

Thus we provide such samples in our [Github repository](https://github.com/uzyovoys/zenbot) so that you can test each of them to learn Zenbot more easy.

### How to use
Just fork this repository, create your test bot through [Zenbot web console](https://zenbot.org) and upload sample\'s Botscript.
Then you can test the newly created bot through web console, [REST API](/rest/) or even messengers like [Facebook Messenger](/messengers/facebook/), [Slack](/messengers/slack/) or [Telegram](/messengers/telegram/).

### Zenhub
[Zenhub website](http://hub.zenbot.org) contains a collection of production ready bots for different channels like Slack and Telegram which are powered by Zenbot platform.

### Samples
***

#### [Hello World](https://github.com/uzyovoys/zenbot/tree/master/helloworld)
A very simple bot which greets user by name or asks her about her name and stores it in the database for further usage.

***

#### [Reminders](https://github.com/uzyovoys/zenbot/tree/master/reminders)
This bot implements a flow of a new reminder creation.

You can find here how to use an idea of [context referencing](/botscript/conversations/) and empty contexts.

***

#### [Doit bot](http://hub.zenbot.org/doitbot)
You find the production version of the previous sample [here](http://hub.zenbot.org/doitbot).

This simple bot creates reminders for user and notifies her through the messenger.
It also utilizes such Zenbot\'s tools like [custom entities](/pattern/entities/) and HTTP actions.

{% include note.html text="This bot works well with English and Russian languages under both Telegram and Slack messengers." %}

***

#### [Weather](https://github.com/uzyovoys/zenbot/tree/master/weather)
This sample illustrates the usage of [Custom Entities](/pattern/entities/) and [context management](/botscript/conversations/).

Note that you have to upload _cities_ entity CSV before you can test this bot.

Then you can ask it about weather in different cities and dates.

***