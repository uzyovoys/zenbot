---
layout: default
title: Custom entities
permalink: /pattern/entities/
---

## Summary
If your bot or an application has to operate with entities from a big database (like cities of the world), [custom patterns](/botscript/pattern/) is not a good choice.
In such case we have to define a long-long set of custom patterns to reuse it in our inputs.

Just imagine if your bot should understand phrases like "What is the weather in London today?" and "How about Singapore?"

_Thus bot should operate with cities from database, even if there are a thousands of them._

Zenbot provides a flexible and powerful solution - **Custom entities**.

{% include note.html text="Do not mix up Custom entities and Custom patterns." %}

## How to use Custom entities
From the example above we have seen where we can use Custom entities.
Each time we need to operate with "big data" in our patterns, we have to use Custom entities instead of long list of Custom patterns in our Botscript.

To solve the problem with cities, we can define our Botscript this way:

```xml
<context>
  <pattern name="City" value="entity://cities"/>

  <input pattern="* (weather|forecast) {[* $City] [* $Date]}">
    <context>
      <input pattern="* $City [$Date]"/>
    </context>
  </input>
</context>
```

There is a "magic" in the definition of _City_ pattern.
We used a special URI `entity://cities` instead of [pattern definition](/pattern/syntax/).
Thus Zenbot understands it like "You should see a content of this pattern in the custom entity with name _cities_".

The content of such pattern lives in the database.
And of course we have to upload our data into it before we can use such a pattern.
We have to do it through Zenbot\'s [web console](https://zenbot.org).

{% include note.html text="Note that you can define such pattern in your Botscript before uploading an actual data." %}

## How to create Custom entity
Once we decided we need a Custom entity, we have to create it through Zenbot\'s [web console](https://zenbot.org).

In your bot\'s page you can see a special section "Custom entities" where you can configure your database and then upload your entity\'s CSV file.

![Custom entities](/img/entities.png)

### Database preferences
To store and index your Custom entity\'s data Zenbot needs a Mongo 3.x database instance.
You can host it on your side or create one in the cloud.
There are s set of great services for Mongo DB hosting - like [mLab.com](https://mlab.com)

Once created the database please provide your database\'s _host, port, name and user\'s credentials_.
Zenbot will use it to create and manage a set of collections to store your Custom entity\'s items.

{% include note.html text="Do not delete or modify these collections." %}

### New entity creation
Once the database connection has been created, you can upload your entities.
Click on "Add new entity" button and fill the entity\'s name and pick language.

#### Entity name
It is a path part of entity\'s URI after `entity://` scheme prefix.
E.g. if you would like to reference your entity in the pattern definition as `entity://cities`, you have to provide "cities" as a name for your entity.

#### Entity language
Zenbot has to know the target language of each entity while it uses language-dependent algorithms to build a morphological index through each item.
So just pick the appropriate language from the list of available languages.

{% include note.html text="Note that there is a predefined set of languages available for Custom entities." %}

#### Entity TSV file
Once entity\'s name and language have been provided, upload a TSV (tab separated values) file with your entity\'s data.

**This file must be a tab-separated TSV formatted file**, where the first part of each line is any value you wish to map the item to, and all others parts are synonyms of this item.

For example if we would like to create _cities_ custom entity, we can use the following format of our CSV file:

```tsv
52.2,0.11667  Cambridge
52.5,-2.08333 Dudley
37.03737,-76.33161  East Hampton
```

Here is a latitude and longitude in the first part, and city\'s name in the second.
_Please note that we used a tab delimiter, not comma._

{% include note.html text="Note that you can define only a single part on the line. In this case this part becomes an ID and a single synonym." %}

#### Entity value
Once matched, entity is mapped to the value you have provided in the first part of TSV file.
Thus REST API and your Botscript have a deal with this mapped value when referencing the pattern value.

But there is a little "magic" Zenbot performs with such a value.
_If your value is a JSON formatted string, Zenbot will try to parse it and convert to the regular object._

E.g. if your TSV file for "persons" entity will look like this:

```csv
{"name" : "Joe Doe", "position" : "Manager"}  Joe Doe Joe
{"name" : "Alice", "position" : "Sales"}  Alice
```

Zenbot will return a regular object as a value of the matched pattern:

```xml
<context>
  <pattern name="Person" value="entity://persons"/>
  <input pattern="$Person">
    <var name="PersonName" value='get("name", $Person)'/>
  </input>
</context>
```

The REST API response will contain a "Person" variable:

```json
{
  "name" : "Person",
  "scope" : "context",
  "value" : {
    "name" : "Joe Doe",
    "position" : "Manager"
  }
}
```

### Entity reference
Once created, you can reference a new entity in the Botscript:

```xml
<pattern name="City" value="entity://cities"/>
```

Zenbot will match such pattern through a special morphological index built for this entity.

### Matching results
Zenbot can return more than one variable for each matched entity while there could be more than one appropriate variant.

### Index time
Note that there may be a long time before each item of the custom entity will be indexed.
This depends on the overall size of entity\'s TSV file.

### Matching performance
Custom entities don\'t affect an overall matching performance once the index is built.
Note that your entity can be as big as you need.