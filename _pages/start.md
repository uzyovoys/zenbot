---
layout: default
title: Getting started
permalink: /start/
---

Well, there was a good [introduction](/) and now it is a time to get closer to Zenbot.

# What Zenbot is
Zenbot is an online _natural language processing_ (NLP) service and bot hosting.

It enables you to add natural language interface to any application, website or chat bot in widely used messengers like Facebook, Slack and Telegram.

## Natural language interface?
Yep! Era of artificial intelligence and advanced human-to-computer interfaces is already here!

Zenbot makes it really easy to upgrade your service or application so _it can understand_ the user\'s text or voice input.

## Where to use it?
Well, strictly speaking you can use this ability everywhere instead of large forms, overloaded interfaces, bunches of buttons and checkboxes and other UI components.

Also there are some areas where user\'s voice is one of the most appropriate choice for human-to-machine interface.
Like smart homes, automotive applications, wearable devices, and yes - chat bots!

# How does it work?
You have to create a [Botscript](/botscript/) (simple XML formatted file) and upload it to Zenbot through [web console](https://zenbot.org).

Zenbot creates a bot from your Botscript and proceeds all text requests to your bot managing dialog branching, context understanding and all other AI stuff.

You also can provide some code in your Botscript, so Zenbot can compute it "on-fly" while processing a request.

As a result, Zenbot generates some text output and bunch of additional variables, can call external HTTP services and even store some data.

{% include note.html text="Note that you do not have to have any external servers! Zenbot hosts all your bots itself." %}

## Messengers integration and REST API
You can use Zenbot\'s REST API to post text requests from any of your app or website and get output.

But moreover, Zenbot has already integrated with such popular messengers as Facebook Messenger, Slack and Telegram!
So you can easily spread your bot over these platforms to make your service available as a chat bot for millions of customers!

{% include note.html text="And once again - you do not have to implement all these messengers APIs and host such implementation on the external servers! Zenbot takes care about this for you. All you need - is to provide settings for each messenger platform through Zenbot web console." %}

# How to start
As you will see, there are no additional requirements to you before you can start use Zenbot.
All you have to do - is to [read about Botscript](/botscript/) and imagine how your users would converse with your app or chat bot.

The next point is to [have a look at some examples of Botscripts](/examples/) and start to create your own to make a new awesome bot!

After all just upload your Botscript through [Zenbot web console](https://zenbot.org) and test it.