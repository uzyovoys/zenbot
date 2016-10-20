---
layout: default
title: Variables and scopes
permalink: /vars/variables/
---

## Summary
While processing the user\'s request, bot can save and manage a bunch of custom named variables.
Such variables can be a source for another variables, been used for replacing placeholders in outputs and scripts or take a part in the [condition expressions](/soon/).

Please read more details about variables usage in [var tag chapter](/botscript/var/).

## How to use variables
Variables in Zenbot enable you to track user\'s profile data and guide them through dialog process to achieve some target.

Just imagine we are developing a reminder service like Todoist, which takes a text of event, it\'s date and time and creates a notification.

Zenbot\'s context and variables allow to create natural language interface for such system with ease.
We have to use variables and expressions to store user\'s data while guiding through a dialog which extracts text, date and time and asks user about missing parts.
At the end of the dialog such bot can send HTTP action to send these data to your backend.

## Pattern variables
Each time the user\'s input text matches on some if patterns, Zenbot creates a variables for each inner named pattern and converts it to the appropriate format if needed.

```xml
<context>
  <input pattern="* remind* [me] {[[to] $Text] [$Date] [$Time]}">
    <!-- Here Zenbot has created a set of variables for Text, Date and Time -->

    <!-- But we have to check if all required of them are defined in user's phrase -->
    <output value="Your event is created." if="full($Text) and full($Time)"/>

    <context if="empty($Text)" modal="true">
      <output value="What do you like I remind you?"/>
      <input pattern="$Text">
        <!-- Jump to the DateTime context to ask about time and date -->
        <context id="DateTime" if="empty($Time)"/>

        <!-- Or create event here if Time was defined -->
        <output value="Ok! Your event is created." if="full($Time)"/>
      </input>
    </context>

    <context id="DateTime" if="empty($Time)" modal="true">
      <!-- Ask about time and date here to complete event creation -->
    </context>
  </input>
</context>
```

In this simple snippet of notification bot we can see how Zenbot automatically creates a set of variables for each inner pattern we have defined in the input\'s pattern.
Thus we can manage them in our Botscript through the dialog process, appending the required set of variables through contexts with additional questions to the user.

{% include note.html text="Note that we haven't use the var tag here because Zenbot automatically creates a named variable for each pattern for us." %}

## Variable scopes
How you have already seen in the Botscript above, Zenbot provides a way to create and manage variables on fly to collect some required data about user to solve the main task (like notification creation).
So when we have deal with variables, we have to answer on the question about how long each of them will live.

From the example above imagine what will happen when user achieves the end of dialog and bot creates an event?
Will the next user\'s request (like "Remind me") have already filled Text, Date and Time variables?
Is it OK to store these variables between user\'s requests to this context?

In the particular example we can answer that Text, Date and Time variables should be removed once user achieves the end of dialog.
Thus the next user\'s request without a Text and Time will be interpreted correctly.

But what if we have created another context which asks the user about her name and should greet her if the name is already known?
Well, in such case Zenbot has to store it permanently to load it for each user\'s request.

To resolve such problems Zenbot provides a mechanism of variables\' scopes.
The scope of variable defines how long should this variable live inside the bot\'s memory.

There are three types of variable scopes:

- input - defines that variable should be removed once request has been processed
- context - variable should be removed once user has been achieved the end of inner context
- user - variables with this scope should be stored for current user permanently

Thus the last task about user\'s name could be solved this way:

```xml
<context>
  <input pattern="(hi|hello) *">

  <!-- Greet user if bot already knows the name -->
  <output value="Hello $UserName" if="full($UserName)"/>

  <context if="empty($UserName)">
    <!-- Ask user about her name -->
    <output value="Hi! What is your name?"/>

    <input pattern="$Text">
      <!-- Store UserName variable with "user" scope -->
      <var name="UserName" value="$Text" scope="user"/>

      <output value="Nice to meet you $UserName!"/>
      <context/> <!-- Jump to the root context while this context is not modal -->
    </input>
  </context>
</context>
```

Please read more details about scopes usage in [var tag chapter](/botscript/var/).

## How Zenbot loads variables
Zenbot loads each variable automatically for each request.
So we do not have to perform any additional steps for variables loading.

## Variable placeholders
In the example above you can see how we can reference a variable by name placing the variable\'s name in the output\'s value, "if" expressions and so on.
Zenbot replaces such placeholders with an actual variable\'s value.
Just place a `$` symbol before the name of variable to define placeholder.

You can use a set of placeholders in the variable (or output) value to build a concatenated string as a result:

```xml
<var name="Notification" value="$Text $Date $Time"/>
```

Such definition will create a variable "Notification" which contains a string with a text of notification, it\'s date and time (formatted as string).

{% include note.html text="Note that you can use the same trick for output value." %}

## Expressions
To calculate the value of variable you can use simple _expressions_ in the "value" attribute.

```xml
<var name="TwoAndTwo" value="2 + 2"/>
```

Here you can see how we have defined a "TwoAndTwo" variable with a simple value, which will be calculated by Zenbot.

Another example shows a usage of _join_ function in the variable expression:

```xml
<input pattern="repeat($Number)">
  <var name="MyNumbers" value='join($Number, ",")'/>
</input>
```

Once user said something like "one two three", our "MyNumbers" variable will have a string value "1,2,3".
Thanks to the [expressions](/soon/) we can use such useful and simple functions to calculate variable values without any programming language.

## REST API variables
Zenbot\'s [REST API](/rest/) returns a set of available variables in each JSON response.
Thus if you would like to integrate your application, website or service with Zenbot through REST API, you will have a full access to the set of variables from your Botscript.

Moreover, you can post or modify such variables with a user\'s request through HTTP POST request body.

## Javascript
You can also use a regular [Javascript programming language](/vars/javascript/) for variable calculation:

```xml
<input pattern="repeat($Number)">
  <var name="Numbers">
    <script>
      <![CDATA[
        var result = '';
        for (var i = 0; i < Number.lenght; i++) {
          result += Number[i] + ' ';
        }
        result;
      ]]>
    </script>
  </var>
  <output value="There are your numbers $Numbers"/>
</input>
```

How you can see, you can reference each external variable inside the Javascript and use them to calculate a resulting variable.

{% include note.html text="Note that you should not to place $ symbol before the variable name inside the Javascript code." %}

Please read more details about variables usage in [var tag chapter](/botscript/var/).

## Global variables
Zenbot provides a set of global variables for each request.
Each of them has "req_" prefix so that you can easily distinguish it from a regular variables.

- **req_bot_id** - the identifier of your bot
- **req_bot_name** - your bot\'s name
- **req_text** - a source text of user\'s request (string)
- **req_score** - matching score (float number)
- **req_lang** - request\'s language code (string)
- **req_lat** - user\'s latitude (optional double number)
- **req_lon** - user\'s longitude (optional double number)
- **req_user** - user\'s identifier (optional string)
- **req_user_name** - user\'s display name (optional string)
- **req_user_email** - user\'s email address (optional string)
- **req_context** - request\'s context identifier (optional string)
- **req_timestamp** - user\'s local time timestamp in milliseconds (number)
- **req_offset** - user\'s local time GMT offset in minutes (number)