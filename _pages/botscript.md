---
layout: default
title: Botscript basics
permalink: /botscript/
---

Botscript is a core component of Zenbot.
It is like a program for your bot - it contains all data about dialog branching and all actions which Zenbot must perform.

{% include note.html text="But don't worry - you do not have to learn any programming language to create Botscripts." %}

Zenbot "eats" Botscript as an input and builds a bot from it.
You can manage different versions of the same Botscript on your side (by using Github repository for example) while Botscript is a regular text file.

{% include note.html text="If you are a developer, you can think about Botscript like about a Makefile, Ant or Gradle build file." %}

## Botscript format
Botscript is a simple XML formatted file. You can use any favorite text editor to create it.

Just take a look at a very simple Botscript to have an idea about what it is.

```xml
<context>
  <input pattern="(hi|hello) *">
    <output value="Hi!"/>
  </input>
</context>
```

{% include note.html text="You can find a similarity with well known AIML here.
But of course Zenbot provides much more powerful and flexible tools and has different paradigm.
Read more further." %}

How you can see, this simple Botscript responds with "Hi!" text on every phrase which starts with words "hi" or "hello" and ends with any other words.

So such bot will react on such phrases as "Hello", "Hi" or "Hi there!"

Nothing difficult! But there was a really simple one.
Zenbot can understand much more complex Botscripts which contain dialog branching, context switching, variables persistence and even HTTP requests and Javascript code evaluation.

{% include note.html text="Try to create a file with this Botscript and upload it through Zenbot's web console to your first test bot. It is a good idea to learn how it works on a practice." %}

## Botscript concepts
You have to understand some basic principles of Botscripts to be fluent with Zenbot.

Each Botscript contains a set of nested contexts, inputs, outputs and some other tags to describe the bot\'s logic.

### Context
Context in terms of Zenbot looks like a dialog context in the human communication.

> We all know that we understand each other not only because we talk on the same language.
> We also share the same context - a set of "valid" phrases at this moment.

Each context in Zenbot contains a set of _inputs_ (valid phrases) and set of actions Zenbot have to perform.
It also can contain nested contexts to implement dialog branching.
Let\'s look at this example which greets a user.

```xml
<context>
  <input pattern="(hello|hi) *">
    <output value="Hello $UserName!" if="full($UserName)"/>

    <context if="empty($UserName)">
      <output value="Hi! What is your name?"/>

      <input pattern="$Text">
        <var name="UserName" value="$Text" scope="user"/>
        <output value="Nice to meet you $UserName!"/>
      </input>

    </context>
  </input>
</context>
```

Well, it is a bit more complex than the first one but we can understand it easily.

Such bot will greet a user if it knows her name.
Otherwise bot will activate nested context and return a question "Hi! What is your name?"

This _nested context_ has a simple input which accepts any text and interprets it as a user\'s name.
Then it stores this text as a user\'s name in Zenbot\'s database and greets the user with phrase replacing "$UserName" placeholder with actual user\'s name.

As you can see, Botscript provides a powerful way to control dialog flow, cen operate with entities fetched from user\'s phrase and evaluate some sort of conditions.

{% include note.html text="This Botscript contains some other components like 'if' and 'scope' attributes.
Do not pay much attention to it at this point." %}

Read more about context tag in [this chapter](/botscript/context/).

### Input
Input tag contains a set of phrase _patterns_ which are valid for this context.
The example above shows an inline mode of the input tag with one pattern per input.
But of course input can contain a set of patterns, like so:

```xml
<input>
  <pattern value="(potatos|tomatos)"/>
  <pattern value="(raspberry|razz)"/>
</input>
```

Each time Zenbot processes a text input, only one input can be selected - those where one of nested patterns is matched with request better.

Input can also contain a set of actions to perform and a set of _outputs_ to return.
Thus Zenbot know what to do and how to answer to the user\'s request when particular input is activated.

Read more about input tag in [this chapter](/botscript/input/).

### Pattern
Pattern tag is a core of Botscript. It contains a pattern of valid user\'s phrases.
Otherwise we have to enumerate all possible phrases in a long-long list for each input... Do we like it?
I guess no. So patterns eliminate this problem with ease.

{% include note.html text="You can think about patterns like about regular expressions but much more adopted to the natural language." %}

Pattern is a very flexible tool to describe valid phrases and custom entities.
It is much more powerful then all of those examples we have already seen.
You can express a very complex patterns with usage of alternatives, options, repeats, wildcards and other stuff.

There is a [special chapter about pattern syntax](/pattern/syntax/) in this documentation.

Patters can also be included inside a context.
In such case it become the _custom_ patterns which can be used inside another patterns and so on.
This helps to make a reusable set of patterns in your Botscript.

Read more about pattern tag in [this chapter](/botscript/pattern/).

### Output
Well, your bot has to respond somehow on the user\'s input. Otherwise what is it created for?

{% include note.html text="Strictly speaking you do not have to define output tag. In such case your bot will not respond with any text on the particular input." %}

Output tag is designed exactly for this. It generates some text output when parent input or context has been activated.

As an input tag, output tag has inline (we have seen it before) and default format. Let\'s look at this example:

```xml
<input pattern="(hi|hello) *">
  <output>
    <item>Hi!</item>
    <item>Hello!</item>
    <item>Good morning $UserName!</item>
  </output>
</input>
```

Zenbot will randomly select one of _item_ inside the _output_ tag and replace all placeholders with actual values.
Thus your bot will respond as a human - with different phrases on the same request.

Read more about output tag in [this chapter](/botscript/output/).

# Other Botscript\'s features
Of course Botscript provides much more features like [variables](/botscript/var/), HTTP [GET](/botscript/get/) and [POST](/botscript/post/) requests and even [Javascript code evaluation](/vars/javascript/).
You can read about all of them the corresponding chapters.