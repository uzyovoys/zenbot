---
layout: default
title: REST API
permalink: /rest/
---

## Summary
Zenbot is not only a "chat bot platform".
It is more like an universal natural language and dialog API for your application, service or website.

Thus Zenbot provides a REST API, so you can easily integrate your project with your bot to make it talk with end user through your application\'s user interface.

## Endpoint
There is a single endpoint of Zenbot REST API.
You can find it under "General settings" section of your bot in the Zenbot\'s [web console](https://zenbot.org):

![Zenbot web console](/img/apiurl.png)

{% include note.html text="Such URL ends with a unique key of your bot." %}

## Test area
In the [web console](https://zenbot.org) you also can find a Test area for each of your bots to send test requests and see REST API response.

## Methods
You can use GET and POST methods to communicate with this endpoint.

**Note** that you have to set "Content-Type: application/json" to send a JSON data in your POST requests.

## API
Each request should contain at least the text of request.
This text would be processed through your bot and it\'s response will be returned in a JSON format.

You can also provide _user\'s unique identifier_ or (and) _complete current user\'s state_ (set of variables, context identifier and modality of the context).

{% include note.html text="The second way means you have to use POST request." %}

Thus Zenbot allows you to control your bot for each user remotely - you can even change it\'s state on your side and post it with a request, rewriting the current state of this user on Zenbot\'s side.

**User\'s state** contains a set of currently available variables, current active dialog context and it\'s modality.

### Parameters
You have to pass the next set of parameters in your requests to REST API:

#### text
The text of request. **Required for each request.**

#### user
A unique user\'s identifier in your system.
This id will be used by Zenbot to manage current user\'s state.

{% include note.html text="This parameter is required if you wish Zenbot to manage the user's state on Zenbot's side.
Otherwise you have to store and manage user's state on your side." %}

#### context
Identifier of current context to process this request.

It is an optional parameter. You can omit it if you have passed _user_ parameter.
Thus Zenbot will restore the current context from user\'s state automatically.

{% include note.html text="You can also use this parameter to rewrite the current user's context." %}

_You can obtain the current context\'s ID from the response._

#### modal
You can pass there _true_ or _false_ to define current context modality.

It is an optional parameter.

#### timestamp
The current user\'s datetime in UNIX timestamp format (a number of milliseconds from January 1th 1970).

Pass this parameter if your bot has a deal with dates and times, so it could resolve relative dates and times.

For instance your bot may work with such phrases as "Wake me up in 15 minutes" or "Remind about this next monday".
Zenbot has to format output regarding current user\'s datetime.

#### offset
The current user\'s time GMT offset in minutes. **Signed integer**

Pass this parameter if your bot has a deal with dates and times, so it could resolve relative dates and times.

{% include note.html text="Both last parameters should go together." %}

## POST method
If you plan to manage user\'s state on your side or wish to rewrite some variables, please use POST requests with next format:

```json
{
  "text" : "The text of request",
  "user" : "Optional user\'s identifier",
  "context" : "Optional identifier of context",
  "modal" : <Optional true or false>,
  "tomestamp" : <Optional user\'s UNIX timestamp>,
  "offset" : <Optional GMT offset in minutes>,
  "vars" : [Optional array of variables]
}
```

### Variables
Each variable in the POST request has the next format:

```json
{
  "name" : "The name of variable",
  "scope" : "Optional - input, context or user",
  "value" : <The value of this variable>
}
```

The value of variable can be represented as a JSON object or array, or string, integer or boolean value.

{% include note.html text="Please remember to pass Content-Type: application/json header with each POST request." %}

## Response
Each Zenbot\'s response is represented in form of JSON object with the next fields:

#### score
Float number (0 - 1 inclusive) representing the similarity of the text input with the matched pattern.

#### input
The identifier of matched input of your bot.

#### context
The identifier of the context which has extended a root context after this request.
_null_ means the root context.

#### modal
The modality of this context (true or false).

#### output
The text of produced output (if exists).

#### vars
The array of produced variables. Each variable has a format described above.

## Example
There is an example of request and response.

#### GET request URL

`https://zenbot.org/api/Yla8EuWhiqQ2z8Gz?user=testuser&timestamp=1463245595924&offset=-180&text=wake me up tommorow at 5`

#### JSON response

```json
{
  "context": null,
  "modal": false,
  "input": "alarm",
  "output": "Ok! I will wake you up tomorrow at 5 AM.",
  "score": 1.0,
  "vars": [
    {
      "name": "Time",
      "value": {
        "hour": 5,
        "minute": 0,
        "second": 0,
        "part": null,
        "formatted": "05:00:00"
      },
      "scope": "context"
    },
    {
      "name": "Date",
      "value": {
        "day": 15,
        "month": 4,
        "year": 2016,
        "formatted": "05.15.2016",
        "date": 1463284800000
      },
      "scope": "context"
    },
    {
      "name" : "UserName",
      "value" : "Joe",
      "context" : "user"
    },
    {
      "name" : "AlarmTime",
      "value" : 1463302800000,
      "context" : "input"
    }
  ]
}
```