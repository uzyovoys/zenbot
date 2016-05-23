---
layout: default
title: Pattern matching
permalink: /pattern/matching/
---

## What pattern is
Pattern is a core mechanism which allows to determine user\'s intent and extract named entities from user\'s input text and convert it to the appropriate format.

Think about patterns like a special flexible form of users\' possible inputs.

{% include note.html text="You can also see some similarity to regular expressions if you have some experience with it.
But patterns are much more flexible and adopted specially to the natural human\'s language." %}

Botscript provides a set of such input patterns and Zenbot matches each user\'s text request through these patterns to find the most appropriate one.
Once it is found, Zenbot extracts matched entities if any (like a dates, times, numbers, texts and custom entities).
Then Zenbot converts each found entity to the appropriate format (number strings to the integer values, times to the special object and so on).

**As a result your bot\'s code has a deal with a language independent structure of the user\'s input instead of strings.**

Without such mechanism like patterns we have to define a long list of possible user\'s inputs, so bot could find similarity between user\'s text input and one of defined input which bot can understand.
Imagine such list for all variations of time or date: "Today", "Tomorrow", "This friday", "Last monday", "October 22nd"... Well, it is far from what we would like.

## Pattern syntax
Of course there should be a very flexible, powerful and simple syntax of such patterns to make it really fast to develop clever bots with pleasure.

And yes, Zenbot provides such one! Let\'s look at some of samples:

`(hi|hello) *` - matches with phrases like "Hello there" or "Hi!"

`* (weather|forecast) [$Date] *` - matches with "Tell me a forecast for tomorrow" or "What is the weather".

`* remind* [me] { [[to] $Text] [$Date] [$Time] }` - "Please remind me to call mom next friday at 5 pm", "Create a reminder", "Remind me something" or "Could you please remind this in five minutes"

So you can see that such patterns are very readable and I\'m sure you are already have a good idea about what it is and how to use it right now.
But yes, it is much better to learn the full syntax to become a master of this tool.

And we have created a [special chapter about pattern syntax](/pattern/syntax/) where you can find more details and samples.

## Common patterns
Zenbot also provides a set of widely used common patterns you can reuse in your Botscript.
Read more about them in the [special chapter](/pattern/common/).

## Custom entities
There is also another type of patterns Zenbot provides for you.
[Custom entities](/pattern/entities/) enables you to manage a big set of pattern\'s variants without having to enumerate all of them in your Botscript.
For example if you need to make a pattern which matches on of thousands of cities in the world.
Or matches through a database of employers\' names in your company.