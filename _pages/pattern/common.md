---
layout: default
title: Common patterns
permalink: /pattern/common/
---

There are a set of common custom patterns you can reuse in your patterns without need to implement them.

{% include note.html text="Note that these common patters are available only for English and Russian.
But feel free to contribute your custom patterns in our Github repository." %}

## Text
This pattern matches all undefined words.

```xml
<input pattern="* remind [me] [to] $Text"/>
```

{% include note.html text="Note that Text pattern could also be empty while it matches even empty string." %}

## Number
This pattern matches all kind of integer numbers and has an integer as a value.

```xml
<input pattern="$Number">
<output value="$Number is too small..."/>
```

This will react with "100 is too small..." on the user\'s request "one hundred" or "100".

## Date
If you need to include some dates in your patterns, use this custom pattern.

`* weather * $Date` - matches "What is the weather tomorrow", "Weather this friday", "Weather two weeks ago".

Thus Date pattern matches absolute and relative dates.

As a result this pattern will return a value like this:

```json
{
  "day" : 14, "month" : 4, "year" : 2016,
  "formatted" : "2016-05-14",
  "date": 1463198400000
}
```

Format is self descriptive. _date_ field contains a UNIX time (number of milliseconds) in UTC timezone.

## Time
Matches absolute and relative forms of time.

`wake [me] up $Time` - matches "Wake me up at 7 AM", "Wake up in 3 minutes", "Wake up at 18:50".

As a result this pattern will return a value like this:

```json
{
  "hour": 5, "minute": 0, "second": 0,
  "part": "PM",
  "formatted": "17:00:00"
}
```
