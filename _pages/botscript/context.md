---
layout: default
title: context tag
permalink: /botscript/context/
---

This tag describes particular context in the Botscript.

It can contain:

- inputs
- outputs
- general patterns
- variables
- get and post actions

## Summary
Each context in the Botscript contains a part of dialog.

There is one _root context_ in each Botscript which contains all the rest of the Botscript.

```xml
<context> <!-- Root context -->
  <pattern name="MyPattern" value="*"/> <!-- General pattern -->
  <input>
    ...
    <context> <!-- Nested context -->
      ...
    </context>
  </input>
</context>
```

{% include note.html text="You can think about context as a \"hole\" into which the user's text input fails.
It fails through all inputs inside the active context until one of patterns in one of the inputs matches this text.
Then one of the nested contexts is activated and next user's input will fail through it." %}

**What if no one of nested contexts contains appropriate input which matches the user\'s text?**
In such case the text "bubbles" up to the root context and "fails" through it.
If there is no result again, the empty result returns to the caller.

{% include note.html text="Request bubbles up only in the case if active context is not modal.
Read about modal contexts in the input tag chapter." %}

## General patterns
You can define a set of patterns inside context tag. It will not been recognized as an input\'s patterns.
Such patterns are called "General patterns". And its\' main purpose is to define reusable patterns which could be used inside others patterns.

```xml
<context>
  <pattern name="Fruit" value="(apple*|orange*)"/> <!-- General pattern -->
  <input>
    <pattern value="* (want|wanna) * $Fruit"/> <!-- Uses the general pattern -->
  </input>
</context>
```

## Attributes

### **id** attribute
Each context (except root context) has it\'s own unique string identifier.
You can define your own by _id_ attribute like so:

```xml
<context id="my_context">
...
</context>
```

Each time user\'s text request matches one of the patterns, one of the nested contexts will be fetched by Zenbot and it\'s identifier will be returned as a part of response.

You can also use this identifier to reference to another context from the input:

```xml
<context id="my_context">
  <input pattern="*">
    <context id="my_context"/> <!-- Make "my_context" context active if this input matches user's input -->
  </input>
</context>
```

{% include note.html text="Note that id attribute is optional.
You do not have to define it if you do not need to use it. In such case Zenbot will generate it automatically." %}

### **if** attribute
When Zenbot decides which of nested contexts should be activated, it looks in the optional _if_ attribute to find a condition expression to evaluate.

If such condition is defined Zenbot evaluates it with a bunch of existing variables.
If this expression returns 1, Zenbot activates this context. Otherwise Zenbot looks through nested contexts further.

```xml
<input pattern="(hi|hello) *">
  <context id="empty_name" if="empty($UserName)">
    <output value="Hi! What is your name?"/>
    ...
  </context>
  <context id="name_is_present">
    <output value="Hello $UserName!"/>
    ...
  </context>
</input>
```

In this example when user says something like "Hello there", Zenbot looks through nested contexts.
The first one ("empty_name") has a condition `empty($UserName)` which means "Select me if there is no UserName variable or if it is empty".
Zenbot evaluates it with all variables it has for now. And if this expression returns 1 (there is no UserName variable yet),
Zenbot stops looking the context and selects "empty_name" and returns output "Hi! What is your name?"

Otherwise Zenbot continues to look through contexts and sees "name_is_present" without any condition.
Well, good choice - Zenbot will select it and as a result return "Hello Joe!" string (if for example UserName variable contains "Joe" string).

