---
layout: default
title: pattern tag
permalink: /botscript/pattern/
---

This tag describes input or custom pattern.

It may contain:

- nested [patterns](/botscript/pattern/)

## Summary
Pattern matching is a base Zenbot\'s technology.
It enables Zenbot to quickly match user\'s text input through a set of input patterns to search the most appropriate context.

Read more about patterns and pattern matching in the [special chapter](/pattern/matching/).

## Input and custom patterns
There are two different types of patterns in Zenbot - _custom_ and _input_.

### Custom patterns
This type of patterns doesn\'t take a part in the context pattern matching, but it provides a source for another patterns.

There is an example of such custom pattern:

```xml
<context>
  <pattern name="Fruit" value="(apple*|orange*)"/> <!-- General pattern -->

  <input>
    <pattern value="* (want|wanna) * $Fruit *"/> <!-- Input pattern -->
  </input>
</context>
```

There we have two patterns: one with name "Fruit" and another inside one of context\'s inputs.

Fruit pattern doesn\'t take a part in the input, so it only provides a source for another patterns.
This way it can be reused in any pattern (custom or input) inside **this or nested** contexts and inputs.

{% include note.html text="So if user says something like \"Apple\" or \"Orange\" nothing happens.
The context's input will match only phrases like \"I want some apple please\". " %}

### Input patterns
This type of patterns lives inside the [input tag](/botscript/input/) and take a part in the input matching process.

Unlike the custom patterns it don\'t have a names and can\'t be reused in another patterns.

{% include note.html text="Regarding the example above, the second pattern is an input pattern." %}

### Common patterns
Zenbot also provides a set of widely used [common patterns](/pattern/common/) for you.

## Nested patterns
It would be helpful to distribute different parts of a single pattern so it could be more readable instead of writing everything in a single pattern tag.

```xml
<pattern name="Food">
  <pattern value="(potatos|tomatos)"/>
  <pattern value="(raspberry|razz)"/>
</pattern>
```

There we have defined a custom pattern "Food" which matches such phrases as "Potatos", "Tomatos", "Raspberry" and "Razz".
We could define it in a single oneliner like `(potatos|tomatos|raspberry|razz)`, but imagine if it is a really long list of variants.

## Attributes

### **value** attribute
This attribute contains a pattern\'s content in form of [pattern syntax](/pattern/syntax/).

{% include note.html text="This attribute is required if you don't define pattern through nested patterns." %}

### **name** attribute
Defines a unique name of the custom pattern.
You can then reference such pattern inside another one by this name, using `$` symbol before the name.

{% include note.html text="This attribute is required for custom patterns only. It doesn't affect input patterns." %}

Do not use any special symbols and [pattern syntax](/pattern/syntax/) reserved symbols and words in the name of your patterns.
Also note that each name must be unique through all patterns in your Botscript and it must not clash with [common patterns](/pattern/common/).