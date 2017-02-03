---
layout: default
title: Zendesk
permalink: /channels/zendesk/
---

Zenbot enables your bots to automate youbeautiful's support team that uses [Zendesk](https://zendesk.com) as a support tool.

## About Zendesk
Zendesk Support is a beautifully simple system for tracking, prioritizing, and solving customer support tickets.
It provides clear visibility into customer interactions, which helps better serve their needs.

[Learn more](https://www.zendesk.com/support/) about Zendesk Support.

## Support team automation
With Zenbot-Zendesk integration you can easily automate tickets resolving using a conversational bot that will answer on the most frequently asking questions from your customers.

This allows you to _decrease a support team load and increase a speed of response_.
Thus your customers get answers on the most frequently asking questions as quick as a second, and your support team is not distracted from the unique issues.

## How it works
Each time a new ticket is created, Zenbot intercepts it and sends to your bot.
Once your bot returns any output, Zenbot automatically adds a new comment to the ticket and optionally changes it\'s status and adds predefined tags.

It there is no any response from the bot, Zenbot can re-assign a ticket to another (**fallback**) agent, and he can continue to resolve an issue.

{% include note.html text="Please note that Zenbot reacts only on a new comments from an end-user (a ticket's author). Internal and open agents' comments won't be processed by Zenbot." %}

### Conversation mode
Every time a end-user updates the ticket with a new comment, your bot will receive a request in the same conversation.
Thus you can build a question answering flow in the same manner as for any another channel.

### Example
Say your support team receives the same question from customers regarding your product with well-known answer.
And would like to automate this issue resolving.

Here is a little example of the bot that answers on such a question with predefined response.

```xml
<context>
  <input id="purchase" pattern="* how * buy *">
    <output value="Hello $req_user_name! To buy our beautiful product just click a Buy button. Thank you!"/>
    <context>
      <input pattern="* where * (find|it) *">
        <output value="The Buy button is placed at the top of main screen."/>
      </input>
    </context>
  </input>
</context>
```

This example shows how the bot will answer on any question like "Hi! How can I buy your beautiful product?".
If then the end-user will continue a conversation asking "Where can I find this magic button?" the bot will answer with context-related response.

### Response formatting
You can use a native HTML in response

```xml
<output>
  <![CDATA[
  <p>Hello $req_user_name!</p>
  <p>Thank you for your question.</p>
  ]]>
</output>
```

## Channels
Zendesk enables your support team to receive requests from a wide range of channels like email, web widget, chat, Facebook, Twitter, mobile SDK and others.
Zenbot\'s integration is a channel-independent tool, so it doesn\'t matter if a ticket was created over any of available channels.

{% include note.html text="Thus for example you can easily automate your Google Play app reviews answering if a special integration was installed in your Zendesk account from a Zendesk's marketplace." %}

## Requirements
To start use Zenbot as an automation tool for your support team, please create a new agent with admin role in your Zendesk account.
This agent should be a default assignee for every new ticket.
[Learn more](https://www.zendesk.com/blog/tip-of-the-week-auto-assigning-tickets/) about how yo assign tickets automatically to the particular agent.

{% include note.html text="You can use existing admin account it you wish. Please note that end-users will receive an automatic responses from this person." %}

## API Access
To enable Zendesk support in Zenbot\'s web console, you have to obtain an API access token for the agent with admin role who is default assignee fro every new ticket.

To obtain this token please go to Zendesk dashboard, in the left sidebar menu please select **Admin -> API** and enable **Token Access** item.
Then click on the **plus sign icon** and **copy and save a new token**.

<img src="/img/zendesk_token.gif" width="100%" />

Paste this token in Zenbot\'s web console - Zendesk menu item.
Define an agent\'s email and your Zendesk subdomain and click **Save settings** button.

## Ticket status
You can optionally define if you would like Zenbot to change a status of the ticket if the bot returned any response.
Just select an appropriate status from the drop-down menu in Zenbot\'s web console.

## Analytics
Zendesk is the same usual thrid-party integration, thus it is possible to enable any of analytics tools to collect and analyse all customers\' requests and bot responses.
Please read more about supported analytics tools [here](/analytics/).

## Variables
Each time Zenbot receives a request from Zendesk, it generates a set of special variables you can use inside a Botscript.

- **req_zendesk_domain** - your Zendesk subdomain
- **req_zendesk_email** - Zendesk agent\'s email
- **req_zendesk_token** - agent\'s API access token
- **req_zendesk_ticket** - ticket\'s ID
- **req_zendesk_subject** - ticket\'s subject (if any)
- **req_zendesk_recipient** - recipient of the ticket (support team email address for ex.)
- **req_zendesk_user_id** - end-user\'s ID
