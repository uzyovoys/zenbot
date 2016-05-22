---
layout: default
title: get tag
permalink: /botscript/get/
---

This tag describes a HTTP GET request action and a variable name for response.

This tag may contain:

- a set of HTTP params
- a set of HTTP headers

## Summary
Zenbot is more than a pattern matcher.
It enables you to perform a common actions to implement natural language interface.
HTTP request is one of such actions.

You can request any HTTP service to fetch some data and store it into named variable.

```xml
<input pattern="* (weather|forecast)">
  <get url="http://api.openweathermap.org/data/2.5/weather" var="Weather">
    <param name="APPID" value="API_KEY"/>
    <param name="units" value="metric"/>
    <param name="lat" value="$UserLatitude"/>
    <param name="lon" value="$UserLongitude"/>
  </get>

  <output value='get("temp", get("main", $Weather))'/>
</input>
```

The example above shows the usage of this tag.
You have to provide a _url_ and _var_ attributes to make a request and store a response.
And also provide optional set of HTTP parameters and headers.

Zenbot will perform a request and store it\'s result into variable with name defined in the _var_ attribute.

{% include note.html text="Note that this variable will have an input scope." %}

Further you can perform some stuff with this variable while it is a [regular variable](/botscript/var/).

## JSON response
Zenbot knows that often we will have deal with a REST APIs of different external services.
So it will look in the response before storing it and try to parse it.

Thus a JSON formatted response will be automatically converted to the object or array.
And you can perform some operations with it as with a regular object or array.

The example above shows how you can extract particular fields righ inside an [output](/botscript/output/) tag using [expressions](/expressions/).
It uses a _get_ function to extract the "temp" field from JSON object, which is a result of extracting the "main" field from HTTP response.
Well, such chained usage of the single function enables you to obtain any data from JSON response.

You could also use a Javascript expression to make the same stuff in common way:

```xml
<var name="Temp" value="javascript: Weather.main.temp"/>
<output value="$Temp"/>
```

But this solution requires to create an external variable.

{% include note.html text="Note that you should not use $ symbol before variable name when you use Javascript expressions." %}

## Non JSON response
Of course you can make requests to the external services which respond with non JSON responses.
In such case Zenbot will store a _raw body of response_ in the defined variable.

There are a set of useful functions to work with such responses, like CSS selector and HTML attributes extractor.
Read more about these functions in the [special chapter](/expressions/).

## Timeouts
Zenbot wouldn\'t wait too much. So it uses HTTP response timeout about 15 seconds.

## Parameters and headers
You can define a set of HTTP request\'s parameters and headers inside the get tag.

### **param** tag
Use this inner tag to define a request parameter.

It should contain a _name_ and _value_ attributes.

### **header** tag
Define a set of optional headers inside a _get_ tag if you need.

Each _header_ tag should contain a _name_ and _value_ attributes.

## Attributes

### **url** attribute
Define the URL of the external service in this required attribute.

**Do not provide the parameters set inside it.** Please use an inner _param_ tags for this purpose.

### **var** attribute
Define a name of [variable](/botscript/var/) to save the response in for this request. It is required attribute.

### **if** attribute
You can define a condition (using [expressions](/vars/expressions/)) which will be performed to check if Zenbot should execute a request.
If such condition is defined, Zenbot will previously evaluate it and if it returns 1 Zenbot will perform request.
Otherwise this request will be skipped.

### **lang** attribute
Define user\'s request language code if this action should be performed only for the particular language.