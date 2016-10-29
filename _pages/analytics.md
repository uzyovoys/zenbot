---
layout: default
title: Analytics tools
permalink: /analytics/
---

Zenbot can automatically store all bot\'s usage statistics data in your favorite analytics tools.

You don\'t have to call any analytics tools API manually.
Zenbot stores every user\'s request data.

{% include note.html text="Please note that Zenbot will store analytics data only for requests been processed by Botscript inputs with non-empty ID" %}

## Analytics tools
Here you can find the list of supported analytics tools.

### Google Analytics
[Google Analytics](https://analytics.google.com) tracks bot\'s events and stores an anonymous aggregated data.

Each time your bot receives a request, Zenbot stores an event with label "input".
The action will contain a request\'s text and optional category with input ID.

To connect your bot to Google Analytics just create a new  resource, copy Track ID and paste it to the Zenbot\'s web console in Analytics section.

### Mixpanel
[Mixpanel](https://mixpanel.com/) enables you to track every user\'s request and analyze it with a comprehensive analytics tools.

Zenbot stores each user profile and each request once it is connected to your Mixpanel project.

To connect your bot with Mixpanel please create a new project in Mixpanel web dashboard, open "Project settings" and copy a "Token" field value.
Then paste it in Zenbot\'s web console preference under Analytics section.

### Botanalytics
[Botanalytics](http://botanalytics.co/) is designed as an analytics tool for Facebook Messenger bots.

**Please note** that Botanalytics cannot be used if your bot is not connected to Facebook Messenger.
Please read more about Facebook integration [here](/messengers/facebook/).

### Botan
[Botan analytics](http://botan.io/) has been designed to store Telegram bots statistics.

**Please note** that Botan cannot be used if your bot is not connected to Telegram.
Please read more about Telegram integration [here](/messengers/telegram/).
