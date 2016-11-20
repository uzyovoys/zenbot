---
layout: default
title: The Context Tag
permalink: /botscript/context/
---

This tag describes a particular context in the Botscript.

It can contain:

- [Inputs](/botscript/input/)
- [Outputs](/botscript/output/)
- [Samples](/botscript/sample/)
- Custom [patterns](/botscript/pattern/)
- [Variables](/botscript/var/)
- [Get](/botscript/get/) and [Post](/botscript/post/) actions

## Summary
Each context in the Botscript contains a part of the dialog.

There is one _root context_ in each Botscript that contains all the rest of the Botscript.

```xml
<context> <!-- The root context -->
  <pattern name="MyPattern" value="*"/> <!-- A general pattern -->
  <input>
    ...
    <context> <!-- A nested context -->
      ...
    </context>
  </input>
</context>
```

{% include note.html text="You can think about a context as a \"hole\" where the user’s input text falls.
It falls through all inputs inside the context until a pattern in one of the inputs matches this text.
Then one of the nested contexts extends the root context and then the user’s input will fall through it." %}

**And what if none of the inputs contains appropriate pattern that would match the user’s text?**
In such case an empty response will be returned.

### Context Extending
Each time the context encounters an appropriate input containing a pattern that does match, one of the nested contexts extends the root context.
And the next user’s request will be matched through such an _extended_ context.

For example, if your context looks like the following:

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

When user asks something like "What is the weather today?", our bot will respond "The weather is fine!"

Then Zenbot extends the root context by the inner one with the `id` having value `weather_context`.
It means that the pattern `* $Date` will be added to the root context, so the user can ask "And what about tomorrow?".
And get back a response "It will be much better!"

Then he/she can ask again "And next Monday?" — and our bot will understand him/her correctly.
It is so because the root context is already extended and the bot understands what we are talking about.
At the same time the user can of course ask again "Tell me the forecast", and the bot will process it.

{% include note.html text="Thus instead of a final state machine paradigm, Zenbot continuously extends the root context for dialog branching implementation." %}

Please read more about context management in the [dedicated chapter](/botscript/conversations/).

### Modal Contexts
Sometimes you need to give an exclusive priority for a given context to catch the next user’s request ignoring the rest of the root context.

Such technique is called a "modal context". Let’s look at it:

```xml
<context> <!-- A regular context -->
  <input id="greeting" pattern="* remind [me] [to] $Text">
    <output value="Done!" if="full($Text)"/>

    <context if="empty($Text)" modal="true"> <!-- A modal context -->
      <output value="What would you like me to remind you about?"/>

      <input pattern="$Text">
        <output value="Done!"/>
      </input>

    </context>
  </input>
</context>
```

Here we have implemented a very simple reminder dialog. The user can say "Remind me to call mom this evening".
In this case the bot will respond with "Done!" output.

But what if the user didn’t provide the reminder text?
Well, in such case our bot will ask him/her "What would you like me to remind you about?"
And the next user’s request must be interpreted as the reminder text, even he/she says "Remind" again.

This is because the nested context is a _modal_ context.
So it ignores everything except the inner inputs and always matches the user’s input through them.

{% include note.html text="A modal context will be canceled once the next request has been processed.
Thus the third request will be processed through the root context." %}

## General Patterns
You can define a set of patterns inside a `context` tag. Those patterns won’t be recognized as patterns of an `input`..
Such patterns are called General patterns, and their main purpose is to define reusable patterns which could be used inside other patterns.

```xml
<context>
  <pattern name="Fruit" value="(apple*|orange*)"/> <!-- A general pattern -->
  <input>
    <pattern value="* (want|wanna) * $Fruit"/> <!-- Uses the general pattern -->
  </input>
</context>
```

## Attributes

### **modal** attribute
Controls the modality of a context. You can set it to `true` to make a particular context modal.

Read about modal contexts above.

### **id** attribute
Each context (except the root context) has its own unique string identifier.
You can define your own `id` attribute like this:

```xml
<context id="my_context">
...
</context>
```

Each time a user’s request text matches a pattern, one of the nested contexts will be fetched by Zenbot and its identifier will be returned as a part of the response.

You can also use this identifier to reference another context from an input:

```xml
<context id="my_context">
  <input pattern="*">
    <context id="my_context"/> <!-- Make "my_context" context active if this input matches the user’s input -->
  </input>
</context>
```

{% include note.html text="Note that the `id` attribute is optional.
You do not have to define it if you do not need to use it. In such case Zenbot will generate it automatically." %}

### **if** attribute
When Zenbot decides which of the nested contexts should be activated, it looks in the optional `if` attribute to find a condition expression to evaluate.

If such a condition is defined, Zenbot evaluates it with a bunch of existing variables.
If this expression returns `1`, Zenbot extends the root context with this one.
Otherwise Zenbot keeps looking through nested contexts further.

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

In this example when user says something like "Hello there", Zenbot looks through the nested contexts.
The first one (with the `id` set to `empty_name`) has a condition `empty($UserName)` which means "Select me if there is no `UserName` variable or if it is empty".
Zenbot evaluates it with all variables it has for now. And if this expression returns `1` (there is no `UserName` variable yet),
Zenbot stops looking through the context and selects `empty_name` and returns "Hi! What is your name?" as output.

Otherwise Zenbot continues to look through the contexts and sees the `name_is_present` context that doesn’t have any condition.
Well, good choice — Zenbot will select it and, as a result, return "Hello Joe!" string (if, for example, the `UserName` variable contains "Joe").

Read more about expressions in [this chapter](/vars/expressions/).

### **lang** attribute
Since Botscript is language-independent, you can define the language code of the user request to activate the particular context.
If the user’s language is not equal to the defined language, the context will be skipped automatically.

Such attribute is the same as a conditional expression like `$req_lang == "en"`.