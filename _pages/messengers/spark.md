---
layout: default
title: Cisco Spark
permalink: /messengers/spark/
---

Zenbot has been integrated with a [Cisco Spark](https://www.ciscospark.com/) messenger. Thus you can easily deploy your bot in Cisco Spark and share it with any teams.

## How to create a Spark bot
There is a [comprehensive documentation](https://developer.ciscospark.com/bots.html) regarding Cisco Spark bots.
It is super easy to create a new one - just go to the [My Apps](https://developer.ciscospark.com/apps.html), section, click on the plus sign and choose "Create a Bot" from the wizard.

Enter your Spark bot Display Name, Bot Username and Icon URL. Then Spark will provide you with your new **bot\'s token**.
Copy it and paste in the "Cisco Spark" section in your Zenbot web console.

That is all! Click "Save settings" button, and now your bot can talk with users in Spark messenger.

## Add a Spark bot to your team
Add a new team member with your Spark bot\'s Username (like "mybot@sparkbot.io").
You can find this name in [My Apps](https://developer.ciscospark.com/apps.html) section.

Your bot will be automatically added to your team and you can send a text messages in private 1:1 chat or via mention in any room.

## How to share Spark bot with others
Anybody from other team can easily add your bot via it's username (like "mybot@sparkbot.io").

## Variables
Each time Zenbot receives a request from the user in Spark, it generates a set of special variables you can use in Botscript.

- **$req_spark_token** - the token of your Spark bot
- **$req_spark_room** - a unique ID of the room where the bot was received a request from the user
- **$req_spark_user** - a unique ID of the user who has sent a request
