---
layout: default
title: var tag
permalink: /botscript/var/
---

This tag defines a variable which should be saved by Zenbot.

It may contain:

- inner Javascript

## Summary
While processing the user\'s request, bot can save and manage a bunch of custom variables.
Such variables can be a source for another variables, been used for replacing placeholders in outputs and scripts or take a part in the [condition expressions](/expressions/).

Zenbot collects variables through dialog and returns a full set of existing and newly created variables in the REST response\'s _vars_ field:

```json
{
  "context" : "greeting",
  "modal" : false,
  "vars" : [
    {
      "name" : "Text",
      "value" : "call mom",
      "scope" : "context"
    },
    {
      "name" : "Time",
      "scope" : "context",
      "value" : {
        "hour" : 23, "minute" : 0, "second" : 0,
        "part" : "PM",
        "formatted" : "23:00:00"
      }
    }
  ]
}
```

Thus you can fetch a full set of variables available for the current user on your side to make some stuff with them.

{% include note.html text="Note about variables scopes below." %}

**Read introduction to variables in the [special chapter](/vars/variables/).**

## How Zenbot loads variables
**Zenbot preloads a set of existing variables for each user\'s request.**
Thus you can reference these variables in your Botscript and do some stuff with them.

```xml
<context>
  <input pattern="(hi|hello) *">
    <output value="Hello $UserName!" if="full($UserName)"/> <!-- Checks UserName variable exitence -->

    <context if="empty($UserName)"> <!-- UserName does not extist or has empty value -->
      <output value="Hi! What is your name?"/>

      <input pattern="$Text">
        <!-- Save UserName variable with the same value as Text pattern -->
        <var name="UserName" value="$Text" scope="user"/> <!-- Define a persistence scope of variable -->
        <output value="Nice to meet you $UserName!"/>
        <context/>
      </input>

    </context>
  </input>
</context>
```

{% include note.html text="Use $ symbol to reference the variable by name." %}

## Variable scope
Each variable has a scope of persistence.
It defines how long this particular variable will live in the bot.

There are three types of scopes:

### **input** scope
The default scope for each variable. It means that the variable will be removed once request is processed.

Such variable will not be visible for the next request for the same user.

### **context** scope
The default scope for each pattern\'s variable.
It means that this variable will live as long as the root context is extended by the context where this variable appeared.

```xml
<context>
  <input pattern="$Text">
    <var name="MyVar" value="some value" scope="context"/>

    <context>
      ...
      <!-- MyVar and Text variables are available here -->
      <var name="Result" value="$Text $MyVar"/>
    </context>
  </input>
</context>
```

### **user** scope
This scope means that the variable must be saved permanently for the current user.
Thus n the example above user\'s name is a user-scoped variable, so our bot will remember user\'s name forever.

## Value
Each variable must have a value. But what can we use as a value for our variables?

### Simple text
You can write a simple text as a value for your variable. No more no less...

```xml
<var name="MyVar" value="Well, it is a simple text..."/>
```

### Pattern reference
When Zenbot matches patterns in the context, it creates a set of variables - one per each inner pattern.
Just look:

```xml
<input pattern="* remind [me] [to] {$Text $Date $Time}">
  <!-- Here Text, Date and Time variables with context scope are available -->
  <output value="I will remind you $Text $Date at $Time"/>
  <!-- So we can reference these vars by name -->
  <var name="NoteText" value="$Text"/>
  <var name="NoteDate" value="$Date"/>
  <var name="NoteTime" value="$Time"/>
  <var name="Note" value="$Text $Date $Time"/> <!-- Clue all together -->
</input>
```

Thus we can reference each pattern in the variable\'s value to assign this variable to the pattern\'s content.

### Expression
You can write some [expression](/expressions/) which will be evaluated to assign the result to the variable.

```xml
<var name="TwoAndTwo" value="2 + 2"/>
<var name="Name" value="capitalize($Text)"/>
<var name="Response" value='get("name", $JsonResponse)'/>
```

### Javascript
You can even use [Javascript](/javascript/) expressions as a value for your variables.

There are two possible forms:

#### Inline Javascript

```xml
<var name="JsTime" value="javascript: new Date().getTime()"/>
```

#### Regular Javascript
Enclose a Javascript code inside inner _script_ tag:

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

{% include note.html text="Note that only last expression of script becomes a value of variable." %}

As you can see Zenbot provides a really flexible way to manage variables.
It can be calculated by four different ways and saved in three different scopes.

## Attributes

### **name** attribute
Each variable must have a non unique name. Such name must not contain spaces and special symbols.

### **value** attribute
Each variable must have a value.
It can be defined through value attribute or through inner _script_ tag which contains Javascript code.

### **scope** attribute
Define a scope of variable in this optional attribute if you woudld like to control the variable\'s lifespan.
There are three possible values: _input_ (default value), _context_ and _user_.

### **if** attribute
This optional attribute contains an [expression](/expressions/) of variable\'s condition.
If it is defined Zenbot will evaluate it first and if it returns 1, Zenbot will evaluate the variable\'s value.
Otherwise this variable will be skipped.

```xml
<var name="MyVar" value="$Text" if="full($Text)"/>  <!-- Assign Text's content to MyVar if it is not empty -->
<var name="MyVar" value="Empty" if="empty($Text)"/> <!-- Assign "Empty" text to the MyVar if Text is empty -->
```