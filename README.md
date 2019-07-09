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

## API Endpoints

> All inputs and outputs are JSON formatted.

|Path|Method|Description|Inputs|Outputs|
|:---|:----:|:----------|:-----|:------|
|`/api/v1/User`|`GET`|Fetch all data of User|`hash`: User hash stored in cookies|Full User entity stored in DB in JSON format. Slugs should bee resolved by Developer using the appropriate endpoints. I hash is invalid then a new user is created and data is returned with additional hash parameter as follows:<br>`{`<br>  `hash`: Hash of the User data<br>  `data`: all data of newly created user as a JS Object<br>`}`<br>The hash should be stored in cookies for future.|
|`/api/v1/User/DefaultEngine`|`PUT`|Update Default search engine of the user|`hash`: HAsh of User Data<br>`slug`: Slug of New Search Engine|`success`: `true` if search engine slug is correct and set, `false` otherwise.<br>`hash`: New hash of User data. Only returned if `success` parameter is `true`|
|`/api/v1/User/QuickLinks`|`GET`|Get Resolved QuickLinks of the User|`hash`: Hash of User Data|An array of QuickLinks each containing title, description, url, slug etc.|
| |`POST`|Add a new QuickLink to current user's list|`hash`: GUID of the current User<br>`url`: URL of the Quick Link|`success`: `true` if successful, `false` otherwise.<br>`hash`: New hash of User data. Only returned if `success` parameter is `true`|
||`DELETE`|Delete the quick link from the user's list|`hash`: Hash of User Data<br>`slug`: slug of the quick link to remove|`success`: `true` on successful, `false` otherwise.<br>`hash`: New hash of User data. Only returned if `success` parameter is `true`|
|`/api/v1/QuickLinks`|`GET`|Get all available Quick Links|`None`|Array of all the QuickLinks with their information|
|`/api/v1/SearchEngine`|`GET`|Get all the available Search engines|`None`|Array of all the available Search Engines|
