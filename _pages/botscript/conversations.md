---
layout: default
title: Context Management
permalink: /botscript/conversations/
---

Zenbot allows you not only to match user’s input through a set of defined [patterns](/pattern/matching/).
It also provides you with a way to make your bot more conversational by _context management tricks_.

## Contexts
A context is one of the core Zenbot concepts which allows a Botscript developer to manage a text conversation with the end user.

> Thus we can understand a context like a set of currently active set of patterns which our bot must understand in a particular moment.

If, say, our user asked about current weather, he/she could ask "And what about tomorrow?" or "And in Singapore?" in the following request.
Thus our bot must understand such request sequences to perform tasks in the _conversational_ manner.

{% include note.html text="Note that a phrase like \"And in Singapore?\" has no meaning if user didn’t't ask about weather previously." %}

## Context Management Tools
Each context is described in the [Botscript](/botscript/) through the [context tag](/botscript/context).

Thus each context has inner inputs with a set of patterns, and each of these inputs can contain a set of inner contexts, which can extend the root context once an input is activated by the user’s phrase.

```xml
<context> <!-- The root context -->
  <input id="greeting">
    <pattern value="(hi|hello) *"/>

    <!-- Greet the user if we know his/her name -->
    <output value="Hello $UserName!" if="full($UserName)"/>

    <!-- Or activate an inner context to ask user about his/her name -->
    <context if="empty($UserName)" modal="true">
      <output value="Hi! What is your name?"/>

      <input pattern="$Text">
        <var name="UserName" value="$Text" scope="user"/>
        <output value="Nice to meet you $UserName!"/>
      </input>
    </context>
  </input>
</context>
```

Thus our bot can manage dialog contexts extending the root context each time it is necessary for its logic.

## Context Referencing
Of course, XML cannot implement a graph. It is more like a tree.
But we might want to jump from one context to another from different places in our dialog.

Zenbot enables you to do this through _context references_.

If your [context tag](/botscript/context/) does not contain any input but has an ID, it is recognized as a reference to another context with such an ID.

```xml
<context>
  <input pattern="* (weather|forecast) * [$Date] *">

    <!-- If we don’t know where is our user from, we need to ask about that -->
    <context if="empty($UserCity)">
      <output value="Where are you from?"/>
      <input pattern="$City">
        <context id="weather"/> <!-- Jump to the "weather" context now -->
      </input>
    </context>

    <context id="weather">
      <!-- Does some weather gathering stuff -->
    </context>
  </input>
</context>
```

In the example above you can see how our bot can, first of all, ask the user about his/her location and then jump to the "weather" context to do the main work after that.
But if our bot already knows the user’s location, it will skip the first context.

{% include note.html text="You can use an empty context tag with no ID attribute to jump to the root context." %}

## Empty Contexts
Note that a context doesn’t need to have any inputs inside if it shouldn’t proceed any sequential requests.

In this case its only purpose is to perform some tasks and maybe return some outputs.

From the example above our "weather" context may have the following content:

```xml
...
<context id="weather">
  <!-- Does some weather gathering stuff -->
  <output value="The weather in $UserCity is pretty good!"/>
</context>
```

You can use an empty context to define a final point of the dialog that can be achieved through references from different branches of the Botscript.

