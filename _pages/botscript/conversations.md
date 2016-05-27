---
layout: default
title: Context management
permalink: /botscript/conversations/
---

Zenbot enables you not only to match user\'s input through a set of defined [patterns](/pattern/matching/).
It also provides you a way to make your bot more conversational by _context management tricks_.

## Contexts
Context is one of the core Zenbot\'s concepts which allows a Botscript\'s developer to manage a text conversation with end user.

> Thus we can understand a context like a set of currently active set of patterns which our bot must understand in the particular moment.

Once user has asked about weather, she would ask "And what about tomorrow?" or "In Singapore?" in the following request.
Thus our bot must understand such sequences of requests to perform tasks in the _conversational_ manner.

{% include note.html text="Note than phrase like \"In Singapore?\" doesn't have any meaning while user didnt't ask about weather previously." %}

## Context management tools
Each context is described in the [Botscript](/botscript/) through the [context tag](/botscript/context).

Thus each context has an inner inputs with a set of patterns, and each of these inputs can contain a set of inner contexts, which can extend a root once an input is activated by user\'s phrase.

```xml
<context> <!-- Root context -->
  <input id="greeting">
    <pattern value="(hi|hello) *"/>

    <!-- Greet user if we know her name -->
    <output value="Hello $UserName!" if="full($UserName)"/>

    <!-- Or activate an inner context to ask user about her name -->
    <context if="empty($UserName)" modal="true">
      <output value="Hi! What is your name?"/>

      <input pattern="$Text">
        <var name="UserName" value="$Text" scope="user"/>
        <output value="Nice to meet you $UserNAme!"/>
      </input>
    </context>
  </input>
</context>
```

Thus our bot can manage dialog\'s contexts extending a root one each time it is necessary for it\'s logic.

## Context referencing
Of course, XML cannot implement a graph. It is more like a tree.
But we might want to jump from one context to another from different places of our dialog.

Zenbot enables you to do this through a _context references_.

Once your [context tag](/botscript/context/) does not contain any input but has an ID, it is recognized as a reference to another context with such ID.

```xml
<context>
  <input pattern="* (weather|forecast) * [$Date] *">

    <!-- If we dont know from where our user are, we have to ask -->
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

In the example above you can see how our bot can previously ask the user about her location and jump to the "weather" context to do the main work after this.
But if our bot already knows the user\'s location, it will skip the first context.

{% include note.html text="You can use empty context tag without ID attribute to jump to the root context." %}

## Empty contexts
Note that the context need not to have any inputs inside it if it shouldn\'t proceed any sequential requests.

In this case it\'s only purpose is to perform some tasks and maybe return some outputs.

From the example above our "weather" context may has such content:

```xml
...
<context id="weather">
  <!-- Does some weather gathering stuff -->
  <output value="The weather in $UserCity is pretty good!"/>
</context>
```

You can use an empty context to define a final point of the dialog, which can be achieved through the references from a different branches of the Botscript.

