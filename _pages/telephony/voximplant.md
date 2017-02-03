---
layout: default
title: Voximplant
permalink: /telephony/voximplant/
---

Zenbot enables your bots to talk with users in telephony channel.
This makes it possible to create a fully robotized call-centers that automatically respond on every phone call and make a lot of useful things.
Like booking hotels, preparing some orders, posting issues and much more.

## About Voximplant
Voximplant is a telephony platform as a service that enables you to create any scenarios for automated phone calls processing.
With Voximplant it is fast and easy to buy a new phone number, create an app and start to process every call with integrated **speech recognition** and **text-to-speech synthesis**.

[Learn more](https://voximplant.com/) about Voximplant.

## Bots in telephony channel
Zenbot is integrated with Voximplant, thus it becomes much more easy to **automate a regular telephony channel**.
Your bot listens a user and responds with speech, making some useful stuff in the background.

## How to start
Here is a step-by-step guide on how to connect your bot with any phone number.

### Create a new application
First of all, you have to create a new Voximplant application through a [Voximplant dashboard](https://manage.voximplant.com/#addApplication).
Just enter the most appropriate name and that is all.

### Buy a new phone number
Voximplant allows you to buy any phone number for production or testing purposes.
Go to the [Available numbers](https://manage.voximplant.com/#numbers) page and buy a new one.

### Bind a phone number to the application
Once you have created an application and bought a phone number, you have to bind it with each other.

Just go to the [My phone numbers](https://manage.voximplant.com/#mynumbers) page and select the application in the dropdown menu.
**Do not forget to click on blue button** to save your changes.

<br/>
<img src="/img/voximplant.gif" width="100%">

### Connect your bot with Voximplant application
In Zenbot\'s web console select your bot and click on "Voximplant" menu item.
Here you have to paste your Voximplant\'s API credentials and application\'s name.

To obtain your API credentials please click on the right-corner dropdown menu in Voximplant dashboard and select "API Access" item.

<br/>
<img src="/img/voximplant_api_access.gif" width="100%">

### Select a language
You must define a language of your Voximplant application, while the speech recognizer can recognize only a single language at a time.
Please select one of supported languages from the dropdown menu and click "Save settings" button.

## Start command and Dialog flow
When the user calls your phone number, Zenbot sends a "/start" command to your bot.
Thus you have to define at least one input with pattern "/start" in your Botscript.

```xml
<context>
  <input pattern="/start">
    ...
  </input>
</context>
```

It is also important to understand that your bot can hang up at some time to finish the conversation.

It happens each time your bot goes in the root context (read more about contexts [here](/botscript/conversations/)).
Thus you have to define an inner context to put the user into the dialog, and jump to the root context each time the bot has to hang up.

```xml
<context>
  <input pattern="/start">
    <output value="Hello! Here is a reception of the best hotel."/> <!-- User hears this prompt -->
    
    <context> <!-- Go to the inner context to continue a conversation -->
      <input pattern="* book *">
        ...
      </input>
      <input pattern="bye *"> <!-- Once the user is saying goodbye... -->
        <output value="Thank you for your call. Bye!"/>
        <context/> <!-- ...jump to the root context to hang up -->
      </input>
    </context>
  </input>
</context>
```

## HTTP requests
Please note that Voximplant has some restrictions regarding the execution time of every HTTP request.
Strictly speaking Voximplant terminates the call if the request gets more than 1 second to process.

Thus if your Botscript contains HTTP requests to any external slow resource, please use **asynchronous** mode.
To achieve this, do not define a variable name in your GET or POST tag:

```xml
<get url="http://someserver.com">
  ...
</get>
```

Such request won\'t block the Botscript execution if an external resource is slow.

## Billing
Please note that Voximplant charges you each time the user calls any of your phone.
[Lear more](http://voximplant.com/pricing/) about Voximplant pricing.

## Analytics
Voximplant is the same usual thrid-party integration, thus it is possible to enable any of analytics tools to collect and analyse all users\' requests and bot responses.
Please read more about supported analytics tools [here](/analytics/).

## Variables
Each time Zenbot receives a request from Voximplant, it generates a set of special variables you can use inside a Botscript.

- **$req_voximplant_app** - the name of the Voximplant application
- **$req_voximplant_key** - an API key
- **$req_voximplant_account** - Voximplant account ID
- **$req_voximplant_caller** - the user\'s ID (phone number as usual)