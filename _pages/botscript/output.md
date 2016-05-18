---
layout: default
title: output tag
permalink: /botscript/output/
---

This tag defines a set (at least one) text response as a reaction on user\'s request.

May contain:

- a set of items

## Summary
While you develop your own natural language bot, it have to respond with human readable text response.

Output tag helps to generate such text response, randomly selecting one of the nested items.

```xml
<input pattern="(hi|hello) *">
  <output>
    <item>Hi!</item>
    <item>Hello!</item>
    <item>Hello $UserName!</item>
  </output>
</input>
```

When user says "Hi", Zenbot sees output tag and randomly selects one of the nested _item_ tag and generates output text.

## Placeholder replacing
As you can see we defined one of items as "Hello $UserName!"
Here `$UserName` is a _placeholder_ which will be replaced by Zenbot with an actual `UserName` variable\'s value.

## Response content
You can define much more complex response then a simple text.
Just enclose the item\'s content inside a `CDATA` like so:

```xml
<item>
  <![CDATA[
    <h3>Here is your name</h3>
    <a href="somewebsite.com">$UserName</a>
  ]]>
</item>
```

Thus you can return even a HTML piece or something else.

## Inline definition
You can save your Botscript file\'s space if a particular output has only one text to return.
Just use _value_ attribute instead of nested _item_ tags.

```xml
<output value="Hello $UserName!"/>
```

{% include note.html text="Note that you cannot use nothing more than simple text with placeholder when you define output inline." %}

## Attributes

### **value** attribute
Write the output\'s text if your output has only one text to return.

### **if** attribute
If output must return a text only in some case, you can define such condition in this attribute.
Zenbot will evaluate it and will select this output if the result will equal 1.
Otherwise Zenbot continues to look through the set of output tags to select one of them.

Read more about expressions in [this chapter](/vars/expressions/).