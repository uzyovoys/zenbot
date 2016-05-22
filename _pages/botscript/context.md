---
layout: default
title: context tag
permalink: /botscript/context/
---

This tag describes particular context in the Botscript.

It can contain:

- [inputs](/botscript/input/)
- [outputs](/botscript/output/)
- general [patterns](/botscript/pattern/)
- [variables](/botscript/var/)
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
It fails through all inputs inside the context until one of patterns in one of the inputs matches this text.
Then one of the nested contexts extends the root context and next user's input will fail through it." %}

**What if no one of inputs contains appropriate pattern which matches the user\'s text?**
In such case empty response will be returned.

### Context extending
Each time the context contains appropriate input with matched pattern, one of the nested contexts extends a root context.
And the next user\'s request will be matched through such _extended_ context.

For example, if your context looks like:

```xml
<context>
  <input pattern="* (weather|forecast) [$Date]">
    <output value="The weather is fine!"/> <!-- Nice response! -->

    <context id="weather_context">
      <input pattern="* $Date"/>
      <output value="It will be much better!"/>
    </context>
  </input>
</context>
```

When user asks something like "What is the weather?" our bot will respond "The weather is fine!"

Then Zenbot extends the root ontext by inner one with id "weather_context".
It means that a pattern "* $Date" will be added to the root context, so the user can ask "And what about tomorrow?".
And get back a response "It will be much better!"

Then she can ask again "Next monday" - and our bot will understand her correctly.
It is so because the root context is already extended and bot understands what we are talking about.
At the same time user of course can ask again "Tell me a forecast" - and bot will process it.

{% include note.html text="Thus instead of final state machine paradigm, Zenbot continuously extends the root context for dialog branching implementation." %}

### Modal context
Sometimes you need to give an exclusive priority for any context to catch next user\'s request ignoring the rest of root context.

Such technique was named "modal context". Let\'s look:

```xml
<context> <!-- Regular context -->
  <input id="greeting" pattern="* remind [me] [to] $Text">
    <output value="Done!" if="full($Text)"/>

    <context if="empty($Text)" modal="true"> <!-- Modal context -->
      <output value="What you wich I remind you?"/>

      <input pattern="$Text">
        <output value="Done!"/>
      </input>

    </context>
  </input>
</context>
```

Here we have implemented a very simple reminder dialog. User can say "Remind me to call mom this evening".
In this case bot will respond with "Done!" output.

But what if user didn\'t provide a text of reminder?
Well, in such case our bot will ask her "What you wich I remind you?"
And the next user\'s request must be interpreted as a text of reminder. Even she says again "Remind".

This is because a nested context is a _modal_ context.
So it ignores everything except the inner inputs and always matches the user\'s input through them.

{% include note.html text="Modal context will be canceled once the next request has been processed.
Thus the third request will be processed through the root context." %}

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

### **modal** attribute
Controls the modality of the context. You can write here `true` to make this context modal.

Read about modal context above.

### **id** attribute
Each context (except root context) has it\'s own unique string identifier.
You can define your own _id_ attribute like so:

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
If this expression returns 1, Zenbot extends the root context with this one.
Otherwise Zenbot looks through nested contexts further.

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

Read more about expressions in [this chapter](/vars/expressions/).

### **lang** attribute
Once Botscript is language-independent, you can define the language code of user\'s request to activate the particular context.
If user\'s language is not equal to the defined language, the context will be skipped automatically.

Such attribute is the same as an expression like `$req_lang == "en"`.