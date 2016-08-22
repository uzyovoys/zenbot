---
layout: default
title: sample tag
permalink: /botscript/sample/
---

This tag defines a set (at least one) sample text of response which can be sent by the user in this particular state.

{% include note.html text="In terms of some messengers like Facebook Messenger, Slack, Kik or Telegram it is a set of buttons which will be rendered under the bot\'s response bubble." %}

May contain:

- a set of items

## Summary
With this feature you can provide the user with some set of sample responses he can use on the next step of dialog.
For example, if your bot responses with "What is your preferred color?", it can also provides samples of answers like "Green", "Blue" and etc.

These samples _may be rendered_ by messenger as a buttons. User can click on one of them instead of typing the response.

**Please note** that not every messenger supports buttons. In this case this tag will be ignored.

The definition of this tag is very similar to the [output tag](/botscript/output/):

```xml
<input pattern="(hi|hello) *">
  <output value="Hi! What is your favorite color?"/>

  <context>
    <input pattern="* $Color"/>
    <sample>
      <item>Green</item>
      <item>Blue</item>
      <item>Red</item>
    </sample>
  </context>
</input>
```

This tag can be defined under both [context tag](/botscript/context/) and [input tag](/botscript/input/).

Instead of selecting randomly only one of inner items, Zenbot will create a list of samples and return it in the response.
Thus in this particular case the messenger will respond with bubble "Hi! What is your favorite color?" with three buttons under it - "Green", "Blue" and "Red".
Once the user clicks one of the buttons, your bot will receive a request with text of this button - as if the user has typed it manually.

## Placeholder replacing
Similar to [output tag](/botscript/output/) Zenbot will replace all placeholders in the sample\'s context with particular value of the appropriate variable.

## Samples generation
You can define multiple _sample_ tags one by one:

```xml
<sample lang="ru">
  <item value="Белый"/>
  <item value="Синий"/>
  <item value="Красный"/>
</sample>

<sample>
  <item value="White"/>
  <item value="Blue"/>
  <item value="Red"/>
</sample>
```

Zenbot will select the very first _sample_ tag shich satisfies all of defined **conditiona** (if any) and ignore all others _sample_ tags.
In this particular case Zenbot will generate samples set from the first one only if user speaks Russian.
Otherwise the second _sample_ tag will generate such set of buttons.

## Inline definition
You can use the _value_ attribute to define a sample\'a content instead of using of enclosing tags:

```xml
<sample>
  <item value="Button 1"/>
  <item value="Button 2"/>
</sample>
```

Moreover, if you have to define only one sample, you can use _value_ attribute right in the _sample_ tag:

```xml
<sample value="Cancel this reminder"/>
```

## Attributes

A set of _sample_ tag attributes is the same as for [output tag](/botscript/output/).
