---
layout: default
title: input tag
permalink: /botscript/input/
---

This tag describes a piece of valid input phrases and contains a set of actions and nested contexts.

It may contain:

- input [patterns](/boscript/pattern/)
- [outputs](/botscript/output/)
- [variables](/botscript/var/)
- get and post actions
- nested [contexts](/botscript/context/)

## Summary
Being a part of context, input tag **must contain** a set (at least one) of [input patterns](/boscript/pattern/).
They describe those user\'s phrases which are valid in the current dialog context.

Thus an input tag is a main "executive" point of Botscript.
User\'s text request matches by Zenbot through all inputs inside the current context and then the best matched input takes a control.

## Nested tags
Input tag also _may contain_ a set of variables, get/post actions, outputs and nested contexts.

Zenbot will look inside selected input tag and will perform some action for each of them.
Thus output tag inside input will generate some text output.
Variable tag will generate and store some variable\'s value.
Get and post actions will request some external HTTP resources and store the result in some variable.

At the end of request processing Zenbot looks through the set of nested contexts to extend root context.
If there is no nested contexts or no one satisfies conditions, the current context remains unchanged.

Read more about context extending in the [context tag chapter](/botscript/context/)

If such context was found, Zenbot performs it\'s own nested variables, get/post and outputs tags, and adds the results to the response.
This context extends the root context and the next user\'s text request will be matched through extended context.

```xml
<context>
  <input id="greeting" pattern="(hi|hello) *">
    <output value="Hello $UserName!" if="full($UserName)"/>

    <context id="name_is_empty" if="empty($UserName)">
      <output value="Hi! What is your name?"/>

      <input pattern="$Text">
        <var name="UserName" value="$Text" scope="user"/>
        <output value="Nice to meet you $UserName!"/>
        <context/>
      </input>

    </context>
  </input>
</context>
```

In the example above input with id "greeting" takes control when user says something like "Hello!"
Zenbot then goes through nested tags and sees the first one - output tag.
It has a condition inside _if_ attribute, so Zenbot evaluates it and generates a text greeting output if our bot already knows the user\'s name.

Then nested context tag goes and Zenbot evaluates it\'s condition.
This context extends the root one if our bot doesn\'t know the user\'s name yet.
If so, Zenbot performs it\'s nested actions and extend the root context with pattern "$Text".
Thus the nested output generates response text "Hi! What is your name?"

The next user\'s request will be matched through extended context which understands what a simple text means.
In this particular example each text will be interpreted as a user\'s name.

{% include note.html text="If user will greet our bot again, it will understand her correctly." %}

Zenbot goes inside the matched input and performs all it\'s actions: saves variable "UserName" and generates a greeting text output.

We define an empty context inside this input because we want to switch to the root context manually, so that a next request will not be interpreted as a user\'s name again.

## Attributes

### **pattern** attribute
Use this attribute to define pattern if you input contains only one pattern and you would like to save XML file\'s space.

### **id** attribute
You can define some non unique identifier for any input to have knowledge about what particular input was matched.

{% include note.html text="This is useful only if you work with Zenbot's REST API." %}
