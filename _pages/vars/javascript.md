---
layout: default
title: Javascript
permalink: /vars/javascript/
---

## Summary
Zenbot also enables you to use general Javascript code instead of [simple expressions](/vars/expressions/) to calculate any variable\'s value.
Thus you are not limited with expressions syntax and built-in functions and can use your own code on well known Javascript programming language for this purpose.

## Little snippet

```xml
<input pattern="repeat($Number)">
  <var name="Numbers">
    <script>
      <![CDATA[
        var result = '';
        for (var i = 0; i < Number.lenght; i++) {
          result += Number[i] + ' ';
        }
        result;
      ]]>
    </script>
  </var>
  <output value="There are your numbers $Numbers"/>
</input>
```

This simple code shows how you can use Javascript code to calculate a "Numbers" variable value.

There is a special inner tag _script_ you have to insert inside the _var_ tag.
Note that you have to use CDATA to prevent XML parser from processing the inner Javascript code.

{% include note.html text="Note that you must not use \"return\" keyword in your Javascript." %}

## Inline mode
You can also define your Javascript code in more compact mode:

```xml
<var name="MyVar" value="javascript: new Date().getTime()"/>
```

Just place "javascript:" keyword in the _value_ attribute of your _var_ tag before the Javascript code.
Thus Zenbot will evaluate such code to obtain an actual variable\'s value.

## Referencing external variables
In the code above you can see how you can reference some external variables inside your Javascript code.
Instead of using `$` symbol just use variable\'s name as is.
Zenbot converts each variable from patterns for you, so you can work with them as with a regular object and arrays of Javascript.

## Limitations
Javascript code in Zenbot runs inside a safe "sandbox".
Thus you cannot use any sort of network functions or file system\'s abstractions.

{% include note.html text="You can use GET and POST actions of Zenbot to perform some network activity if you need." %}