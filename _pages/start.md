---
layout: default
title: Getting started
permalink: /start/
---

Well, there was a good [introduction](/) and now it is time to get closer to Zenbot.

# What Is Zenbot
Zenbot is an online _natural language processing_ (NLP) service and bot hosting.

It allows you to add natural language interface to any application, website or chat bot for widely used messengers like Facebook, Slack and Telegram.

## Natural Language Interface?
Yep! າhe era of artificial intelligence and advanced human-to-computer interfaces is already here!

Zenbot makes it really easy to upgrade your service or application so _it can understand_ the user’s text or voice input.

## Where to Use It?
Well, strictly speaking, you can use this ability everywhere instead of large forms, overloaded interfaces, bunches of buttons and checkboxes and other UI components.

Also there are some areas where user’s voice is one of the most appropriate choices for human-to-machine interface.
Like smart homes, automotive applications, wearable devices, and yes — chat bots!

# How Does It Work?
You have to create a [Botscript](/botscript/) (a simple XML formatted file) and upload it to Zenbot through [web console](https://zenbot.org).

Zenbot creates a bot from your Botscript and proceeds all text requests to your bot managing dialog branching, context understanding and all other AI stuff.

You also can provide some code in your Botscript, so Zenbot can compute it "on-the-fly" while processing a request.

As a result, Zenbot generates some text output and bunch of additional [variables](/vars/variables/). It can also call external HTTP services and even store some data.

{% include note.html text="Note that you do not have to have any external servers! Zenbot hosts all your bots itself." %}

## Messengers Integration and REST API
You can use Zenbot’s [REST API](/rest/) to post text requests from any of your apps or websites and get output.

But moreover, Zenbot is already integrated with such popular messengers as Facebook Messenger, Slack and Telegram!
So you can easily spread your bot over these platforms to make your service available as a chat bot for millions of customers!

{% include note.html text="And once again — you do not have to implement all these messengers API and host such implementation on external servers! Zenbot takes care about this for you. All you need is to provide settings for each messenger platform through Zenbot web console." %}

# How to Start
As you will see, there are no additional requirements to you before you can start using Zenbot.
All you have to do is to [read about Botscript](/botscript/) and imagine how your users would converse with your app or chat bot.

The next point is to [have a look at some examples of Botscripts](/soon/) and start creating your own new awesome bot!

When you’re done, just upload your Botscript through [Zenbot web console](https://zenbot.org) and test it.