---
layout: default
title: The Get Tag
permalink: /botscript/get/
---

This tag describes an HTTP GET request action and a variable name for the response.

This tag may contain:

- A set of HTTP parameters
- A set of HTTP headers

## Summary
Zenbot is more than a pattern matcher.
It allows you to perform common actions to implement natural language interface.
HTTP request is one of such actions.

You can request any HTTP service to fetch some data and store it into a named variable.

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
You have to provide _url_ and _var_ attributes to make a request and store a response.
You can also provide optional set of HTTP parameters and headers.

Zenbot will perform the request and store its result into the variable with the name defined in the _var_ attribute.

{% include note.html text="Note that this variable will have an input scope." %}

Then you can perform some stuff with this variable while it is a [regular variable](/botscript/var/).

## JSON Responses
Zenbot knows that often we will deal with REST APIs of different external services.
So it will look at the response before storing it and try to parse it.

Thus a JSON formatted response will be automatically converted to an object or an array.
And you can perform some operations with it as with a regular object or array.

The example above shows how you can extract particular fields righ inside an [output](/botscript/output/) tag using [expressions](/expressions/).
It uses the _get_ function to extract the "temp" field from JSON object that is a result of extracting the "main" field from the HTTP response.
Well, such chained usage of the single function allows you to obtain any data from a JSON response.

You could also use a Javascript expression to perform the same stuff in a common way:

```xml
<var name="Temp" value="javascript: Weather.main.temp"/>
<output value="$Temp"/>
```

But this solution requires to create an external variable.

{% include note.html text="Note that you should not use a $ character before variable name when you use Javascript expressions." %}

## XML Responses
If the endpoint returns an XML formatted response (like RSS for example), Zenbot will parse it automatically and create an object with fields corresponding to the XML structure.
Thus you don’t need to parse it on your own, unlike a response.

## Raw Responses
Of course you can make requests to external services which don’t give JSON or XML responses.
In such case Zenbot will store a _raw response body_ in the defined variable.

There are a set of useful functions to work with such responses, like CSS selector and HTML attributes extractor.
Read more about these functions in a [dedicated chapter](/expressions/).

## Timeouts
Zenbot wouldn’t wait too much. So it uses HTTP response timeout about 15 seconds.

## Parameters and headers
You can define a set of HTTP request parameters and headers inside the `get` tag.

### **Param** tag
Use this inner tag to define a request parameter.

It should contain _name_ and _value_ attributes.

### **header** tag
Define a set of optional headers inside a `get` tag if you need.

Each `header` tag should contain _name_ and _value_ attributes.

## Attributes

### The **url** Attribute
Define the URL of the external service in this required attribute.

**Do not provide parameters inside this tag.** Please use inner `param` tags for this purpose.

### **Var** Attribute
Define the name for a [variable](/botscript/var/) to save the response in for this request. It is a required attribute.

### **If** Attribute
You can define a condition (using [expressions](/vars/expressions/)) that will check if Zenbot should execute the request.
If such condition is defined, Zenbot first will evaluate it and, if it returns `1`, Zenbot will perform the request.
Otherwise this request will be skipped.

### **Lang** Attribute
Define the user request language code if this action should be performed only for the particular language.

### **channel** Attribute
Define channel IDs here to make an HTTP call only for requests from the particular messengers.
