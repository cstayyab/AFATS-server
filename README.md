# AFATS-server

This will act as a backend server for [AFATS](https://github.com/cstayyab/AFATS) Angular app. This is a RESTful API using Express.js

## Database Structure

Following are the entities in this Database:

* user
* engine
* link

### **User**

|Property|Type|Description|
|:------:|:--:|:----------|
|guid|string|Unique ID for every client|
|dEngine|string|Slug for any search engine defined in 'engine' entity|
|qLinks|array|Array of slugs of QuickLinks defined in 'link' entity|
|sParam|string|JSON string representing additonal parameters to be added to search page|

### **Engine**

|Property|Type|Description|
|:------:|:--:|:----------|
|slug|string|A unique identifier for search engines|
|url|string|The URL of search page|
|qParam|string|name of the query parameter|
|usage|number|Number of users using this search engine|

### **Link**

|Property|Type|Description|
|:------:|:--:|:----------|
|slug|string|A unique identifier for quick links|
|url|string|URL of the Page|
|title|string|Fetched title of the link|
|description|string|Fetched description of the Page|
|usage|number|Number of users using this link|
