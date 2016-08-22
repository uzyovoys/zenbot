---
layout: default
title: output tag
permalink: /botscript/output/
---

This tag defines a set (at least one) text response as a reaction on user\'s request.

May contain:

- a set of items

## Summary
While you develop your own natural language bot, it have to respond with human readable text responses.

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

This tag can be defined under both [context tag](/botscript/context/) and [input tag](/botscript/input/).

## Placeholder replacing
As you can see we defined one of items as "Hello $UserName!"
Here `$UserName` is a _placeholder_ which will be replaced by Zenbot with an actual `UserName` variable\'s value.

## Output generation
You can define multiple _output_ tags one by one:

```xml
<output value="Hola $UserName" lang="es"/>
<output value="Hello $UserName"/>
```

In this case Zenbot will select those output which satisfies all **conditions** defined through the additional attributes (if any).
In this particular case, Zenbot will generate "Hola Joe" if the user speaks Spanish. All other _output_ tags will be ignored.

## Response content
You can define much more complex response then a simple text.
Just enclose the item\'s content inside a `CDATA` like so:

```xml
<output>
  <item>
    <![CDATA[
      <h3>Here is your name</h3>
      <a href="somewebsite.com">$UserName</a>
    ]]>
  </item>
  <item>
    <![CDATA[
      <h3>Well, there is your name</h3>
      <a href="somewebsite.com">$UserName</a>
    ]]>
  </item>
</output>
```

Thus you can return even a HTML piece or something else.

If you have to define only one response, you can write content right in the body of _output_ tag:

```xml
<output>
  <![CDATA[
    <h3>Here is your name</h3>
    <a href="somewebsite.com">$UserName</a>
  ]]>
</output>
```

### Native output
You can generate any output you wish with _output_ tag.
But sometimes you may wish to generate an output in format specified for the particular channel (like Facebook Messenger, Telegram. Slack and others).
In this case you can define such specific output regarding the documentation of the particular messenger and Zenbot will propagate such response as is in the response.

Thus you can use all features of the particular platform. For example:

```xml
<output channel="facebook">
  <![CDATA[
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
          {
            "title":"Welcome $UserName",
            "image_url":"http://petersapparel.parseapp.com/img/item100-thumb.png",
            "subtitle":"Nice yo see you again!",
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersapparel.parseapp.com/view_item?item_id=100",
                "title":"View Website"
              },
              {
                "type":"postback",
                "title":"Start Chatting",
                "payload":"USER_DEFINED_PAYLOAD"
              }
            ]
          }
        ]
      }
    }
  ]]>
</output>
```

In this particular example the Facebook-related output ha been defined with output format regarding the [Facebook Messenger Platform documentation](https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template).
Zenbot will replace all placeholders it such response and generate proper JSON, so you can use all Facebook-related features like attachments, templates and etc.

## Inline definition
You can save your Botscript file\'s space if a particular output has only one text to return.
Just use _value_ attribute instead of nested _item_ tags.

```xml
<output value="Hello $UserName!"/>
```

{% include note.html text="Note that you cannot use nothing more than simple text with placeholder when you define output inline." %}

You can use inline definition in the _item_ tag as well:

```xml
<output>
  <item value="First output"/>
  <item value="Second output"/>
</output>
```

## Attributes

### **value** attribute
Write the output\'s text if your output has only one text to return.

### **if** attribute
If output must return a text only in some particular case, you can define such condition in this attribute.
Zenbot evaluates it and generates this output if the result is equal to 1.
Otherwise Zenbot continues to look through the set of output tags to select one of them.

```xml
<output value="Hello $UserName!" if="full($UserName)"/> <!-- Only if the user name is not empty -->
<output value="Hi!"/> <!-- This output will be generated if the first one has been ignored (the user name is empty). -->
```

Read more about conditions in [this chapter](/vars/expressions/).

### **lang** attribute
Define user\'s request language codes if you would like this output to be generated only for particular language.

```xml
<output value="Hi $UserName!" lang="en"/>    <!-- English variant -->
<output value="Hallo $UserName!" lang="de es"/> <!-- Deutche and Spanish variant -->
```

### **channel** attribute
Define channel IDs here to generate this output only for requests from the particular messengers.

```xml
<output value="Hi from Facebook $UserName!" channel="facebook"/>    <!-- Will be generated for everybody who uses your bot in Facebook -->
<output value="Hallo $UserName!" channel="telegram kik"/> <!-- Only for Telegram and Kik users -->
```
