---
layout: default
title: Pattern syntax
permalink: /pattern/syntax/
---

_This chapter assumes you are familiar with patterns. If not please read [about patterns](/pattern/matching/) before._

## Summary
This chapter describes a full set of possible syntax components you can use in your patterns.

## Small samples
Just to refresh our experience let\'s look at samples of some patterns before the details:

`(hi|hello) *` - matches with phrases like "Hello there" or "Hi!"

`* (weather|forecast) [$Date] *` - matches with "Tell me a forecast for tomorrow" or "What is the weather".

`* remind* [me] { [[to] $Text] [$Date] [$Time] }` - "Please remind me to call mom next friday at 5 pm", "Create a reminder", "Remind me something" or "Could you please remind this in five minutes"

## General rules

- all patterns are case insensitive
- you do not have to define the punctuation in the pattern
- each open bracket should be followed by enclosing one
- you can include one pair of brackets into another without limitations
- you cannot use a star symbol `*` in the middle of word

## Custom entities
Note that you can also use [custom entities](/pattern/entities/) instead of patterns if you have a deal with big data (like all cities in the world) or if your need to change pattern\'s content without Botscript changing.

### Words
The most simple component you can use in your patterns.
The user\'s input will be matched only in case of full equality with such pattern.

`whoa` - matches only "Whoa" or "whoa!" strings.

`garden of madness` - matches only this string.

### Wildcards
A star symbol `*` (named _wildcard_) could be used to define a possible set of undetermined words:

`hi *` - matches with both of "Hi" and "Hi how are you?" (but not "Say hi").

`* weather *` - matches with all strings which have at least a word "weather" in some place.

### Flexy words
You can use wildcards before the first letter of word or after the last one (or both) to make such word _flexible_.

`apple*` - matches both "Apple" and "Apples" words (and even "applesssss").

`*determine*` - matches "Determine", "Determines" or "Undetermined".

### Alternatives
Use round brackets with `|` delimiter to define possible constructions of words in some place of pattern:

`* (weather|forecast)` - matches "Tell me a weather", "What is the forecast" or simply "Weather".
But not a "Weather forecast".

Note that you can insert one pair of brackets into another without any limits:

`( (one|1) | (two|2) )` - matches with "one", "1", "two" and "2".

### Options
If some part of phrase is not required to be present in the user\'s phrase, use square brackets to make it _optional_:

`be [or not to be]` - matches both "Be" and "Be or not to be".

Of course you can enclose one pair of brackets into another:

`remind [[to] do]` - matches "Remind", "Remind to do" and "Remind do".

#### Optional alternatives
Of course you can use something like `[(one|two|three)]` to define alternative which is optional.
But you can also omit round brackets in such case: `[one|two|three]` to save some piece of paper.

### Permutations
If some words could go in undefined order, use curly brackets:

`{ you love me }` - matches "You love me", "Me love you", "Love you me", "You me love"...
Oh there are too many variants so let\'s go further.

### Pattern references
If you need to include one pattern into another (to reuse some _custom_ pattern), use symbol `$` before the name of included pattern:

```xml
<pattern name="MyCustomPattern" value="(one|two|three)"/>
<input pattern="* (want|wanna) $MyCustomPattern apple*"/>
```

This also allows you to fetch a part of user\'s phrase which is corresponding to this custom pattern.
In the [REST API](/rest/) response on the "I want two apples" request you will se something like this:

```json
{
  "vars" : [ { "name" : "MyCustomPattern", "text" : "two" } ]
}
```

{% include note.html text="Note that Zenbot will create a named variable for each custom pattern after matching." %}

Zenbot also provides a [set of common patterns](/pattern/common/) you can use in your Botscrips.

### Mappings
Often you may need to have deal with language independent representation of cutom pattern instead of the matched text.
To _map_ the custom pattern on some language independed value use please a symbol `:` after pattern expression between the value:

```xml
<pattern name="MyCustomPattern" value="( one:1 | two:2 | three:3 )"/>
<input pattern="* (want|wanna) $MyCustomPattern apple*">
  <output value="Ok, I will bring you $MyCustomPattern apples soon."/>
</input>
```

As a result of matching the request like "I wanna three apples" the bot will respond with text "Ok, I will bring you 3 apples soon."

The REST API response will look like this:

```json
{
  "vars" : [ { "name" : "MyCustomPattern", "text" : "three", "value" : 3  } ]
}
```

As you can see, Zenbot replaced placeholder with mapped value instead of text "three", because we have defined mapping in our pattern MyCustomPattern.

**Note** that you have to enclose multiple words in a round brackets to map all of them on some value:

```xml
<pattern name="MyCustomPattern" value="( (1|1st|one|first):1 | (2|2nd|two|second):2 )"/>
```

{% include note.html text="Also note that pattern mapping works only for custom patterns. It doesn't work for input patterns." %}

There is one more limitation here - the value you map the pattern to must not contain punctuation symbols, pattern syntax\'s special symbols and whitespaces.

### Aliases
If you have to use custom pattern with the same name multiple times, you have to distinguish them somehow to reference them further somehow.

To solve this use please `::` symbol between an alias and regular pattern\'s name:

```xml
<input pattern="how much is $N1::Number and $N2::Number">
  <var name="Result" value="$N1 * $N2"/>
  <output value="$N1 and $N2 will be $Result"/>
</input>
```

There are two numbers in the example pattern above.
Thus using `::` we can easily reference each other without messing it up.

### Repeats
If you have some part of your pattern which can be present multiple times, you can use `repeat`:

```xml
<input pattern="repeat($Number)">
  <var name="MyNumbers" value='join($Number, " ")'/>
  <output value="$MyNumbers"/>
</input>
```

This simple script will return a text output "1 22 3" on the user\'s "One twenty two three".

{% include note.html text="Note that Number variable will contain array of integers in such case.
But if user says only \"one\", Number will contain a regular integer. " %}

In the case of `repeat` the repeated part must be present at least once in the text input to be matched.
To make it fully optional just enclose it in the square brackets:

`[repeat($Number)]` - matches 0 or more numbers.