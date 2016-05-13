---
layout: default
title: post tag
permalink: /botscript/post/
---

This tag describes a HTTP POST request action and a variable name for response.

This tag may contain:

- a set of HTTP params
- a set of HTTP headers
- a body of request

## Summary
This tag performs the same action as a [get tag](/botscript/get/).
But it sends a POST type of requests instead a GET.

## Request body
POST requests may contain a body.
You can define a content of a body inside an inner _body_ tag.

```xml
<post url="http://someserver.com" var="Response">
  <header name="Content-Type" value="application/json"/>
  <body>
    <![CDATA[
      {
        "somevariable" : "somevalue",
        "referencevariable" : "$MyVar"
      }
    ]]>
  </body>
</post>
```

And of course you can reference another variables and patterns inside the body\'s content via placeholders.
Thus Zenbot will replace all of them before sending a request.

{% include note.html text="Note that you should to enclose body's content in the CDATA to prevent interpretation of it." %}

## Attributes
This tag has the same attributes as a [get tag](/botscript/get/)