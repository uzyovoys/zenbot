---
layout: default
title: Expressions
permalink: /vars/expressions/
---

## Summary
Often it is very helpful to have a mechanism for fast and simple calculations of some condition or [variable](/vars/variable/).
Zenbot provides such tool named _expressions_ which allows you to use some set of simple functions to solve this problem.

{% include note.html text="There is no need to learn a programming language to use such expressions." %}

## Where to use
Say if you need to check some condition of inner [context](/botscript/context/) that should or shouldn\'t extend a root context while user\'s text falls into some of the inputs, you can simply define such expression in the _if_ attribute of the context tag.

Let\'s look at this example:

```xml
<context>
  <input pattern="(hi|hello) *">

  <!-- Greet user if bot already knows the name -->
  <!-- We use "full" function here to check if UserName variable exists and has non empty value-->
  <output value="Hello $UserName" if="full($UserName)"/>

  <!-- "empty" fucntion checks if variable doesn't exist or has empty value -->
  <context if="empty($UserName)">
    <!-- Ask user about her name -->
    <output value="Hi! What is your name?"/>

    <input pattern="$Text">
      <!-- Store UserName variable with "user" scope -->
      <var name="UserName" value="$Text" scope="user"/>

      <output value="Nice to meet you $UserName!"/>
      <context/> <!-- Jump to the root context while this context is not modal -->
    </input>
  </context>
</context>
```

How you can see, we use simple functions "full" and "empty" to check UserName variable and branch a dialog if our bot doesn\'t know user\'s name or greet her if it does.

Of course you can use multiple expressions in the single _if_ attribute:

```xml
<output value="Hi dude!" if='full($UserName) and $UserGender == "male"'/>
```

And yes - expressions are often used to calculate variable\'s value:

```xml
<input pattern="* $Percent::Number percent* of $Number *">
 <var name="Result" value="$Number / 100 * $Percent"/>
 <output value="$Result"/>
</input>
```

## Variable references
If you need to reference some external variable in your expression, just use `$` symbol before the external variable\'s name.

## Operators
Zenbot provides a set of common arithmetic operators. Boolean operators are also fully supported.

- `^` - power
- `!` - boolean not
- `%` - modulus
- `/` - division
- `*` - multiplication
- `+` - addition
- `-` - subtraction
- `lte` - less or equal
- `gte` - more or equal
- `lt` - less than
- `gt` - greater than
- `!=` - not equal
- `==` - equal
- `and` - boolean AND
- `or` - boolean OR

## Functions
There is a set of useful functions you can use to simplify your expressions and also to make some specific stuff like HTML parsing.

***

#### upper
Takes a string and returns the same string in upper case.

`upper("Hello")` - returns "HELLO"

***

#### lower
Takes a string and returns the same string in lower case.

`lower("Hello")` - returns "hello"

***

#### cap
Takes a string and returns the same string with first letter in the upper case.

`cap("hello guys")` - returns "Hello guys"

***

#### len
Takes a string or array and returns the length of string or array.

`len("Hello")` - returns 5.

***

#### empty
Takes any type of argument and returns 1 if it is null or has empty value.

`empty("")` - returns 1.

`empty("Hello")` - returns 0.

***

#### full
Takes any type of argument and returns 1 if it is not null and has non empty value.

`full("")` - returns 0.

`full("Hello")` - returns 1.

***

#### eq
Takes two arguments of any type and checks if they are equal.
In the case of strings this function is case insensitive.

`eq("Hello", "hello")` - returns 1.

`eq(1, 2)` - returns 0.

***

#### starts
Takes two strings as argument and returns 1 if the first one starts from characters of the second.
This function is case insensitive.

`starts("Hello guys", "hello")` - returns 1.

`starts("Hello", "hello guys")` - returns 0.

***

#### ends
Takes two strings as argument and returns 1 if the first one ends with characters of the second.
This function is case insensitive.

`ends("Hello guys", " guys")` - returns 1.

`ends("Hello", "hell")` - returns 0.

***

#### has
Takes two strings and returns 1 if the first one contains the second.

`has("Hello guys", "ell")` - returns 1.

`has("guys", "girls")` - returns 0.

***

#### first
Takes an integer N and string S and returns the string from first N characters of S.

`first(5, "Hello guys")` - returns "Hello".

***

#### last
Takes an integer N and string S and returns the string from last N characters of S.

`last(5, "Hello guys")` - returns " guys".

***

#### num
Takes a string and converts it to a number if possible.

`num("2.05")` - returns 2.05.

***

#### join
Takes an array of any type and a separator string and returns a joined string.

`join($Array, ",")` - returns a string containing all elements form `Array` separated by ",".

***

#### fmt
Takes a number or date or time variable, a date or time format pattern and a target language code and returns a formatted date or time string.

`fmt($Date, "dd-MM-yyy", $req_lang)` - returns a formatted string as day-month-year

`fmt($Time, "hh:mm", $req_lang)` - returns a formatted string as hours-minutes

You can read about date/time pattern syntax [here](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html).

***

#### get
Takes a number index and array, or a string field and object and returns element from array by index, or a field\'s value from object.

`get(2, $Array)` - returns third element from array "Array".

`get("name", $Json)` - returns a value associated with "name" field in the object "Json".

***

#### css
Takes a CSS selector string and HTML document string and returns a string array of all found elements.

`css(".title", $HttpResponse)` - returns an array of strings of all found elements with class "title".

_This function is often used in pair with HTTP GET or POST actions._

***

#### fcss
Takes a CSS selector string and HTML document string and returns a string content of the first found element.

`fcss("#heading", $HttpResponse)` - returns a string content of the first found element with id "heading".

_This function is often used in pair with HTTP GET or POST actions._

***

#### attr
Takes a name of HTML tag attribute, CSS selector string and HTML document string and returns a string array of all found elements\'s attribute values.

`attr("href", "a", $HttpResponse)` - returns an array of all links on the page.

***

#### fattr
Takes a name of HTML tag attribute, CSS selector string and HTML document string and returns a string value of the attribute from the first found element.

`fattr("href", "a", $HttpResponse)` - returns the first link on the page.

***

#### replace
Takes a string where you need to replace the second string argument with third string argument and returns a new string.

`replace("Hello guys", "guys", "girls")` - returns a string "Hello girls".

***

#### regex
Takes a string and regular expression string and returns an array of strings of all found groups.

***

#### json
Takes a JSON formatted string and tries to convert it to the object.

`json("{ first: 1, second: 2 }")` - returns an object which has two fields (first and second).

***

#### dt
Takes a Date and Time (or number of milliseconds and Time) and returns a number of milliseconds of datetime composed from these arguments.

***