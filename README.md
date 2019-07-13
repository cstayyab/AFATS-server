# AFATS-server

This will act as a backend server for [AFATS](https://github.com/cstayyab/AFATS) Angular app. This is a RESTful API using Express.js

## Database Structure

Following are the entities in this Database:

* users
* engines
* link (subdocument of users)

### **users**

|Property|Type|Description|
|:------:|:--:|:----------|
|guid|string|Unique ID for every client|
|dEngine|string|Slug for any search engine defined in 'engine' entity|
|qLinks|array|Array of slugs of QuickLinks defined in 'link' entity|
|sParam|string|JSON string representing additonal parameters to be added to search page|

### **engines**

|Property|Type|Description|
|:------:|:--:|:----------|
|slug|string|A unique identifier for search engines|
|url|string|The URL of search page|
|qParam|string|name of the query parameter|

### **link**

|Property|Type|Description|
|:------:|:--:|:----------|
|slug|string|A unique identifier for quick links|
|url|string|URL of the Page|
|title|string|Fetched title of the link|
|description|string|Fetched description of the Page|

## API Endpoints (v1)

> All inputs and outputs are JSON formatted.

### **`/api/v1/user`**

Automatically initialize user and on-demand changing of user data

#### **`GET`**

Fetch all data of the user.

##### Inputs

`hash`: Hash of the user data to identify user. If invalid or not specified a new user is created.

##### Outputs

> **If hash is valid**

`guid`: Internal Unique Identifier

`dEngine`: Slug for identification of Search Engine. (See `/api/v1/searchengine`)

`qLinks`: Array of Quick Links of a user. Single Quick Link looks like this:

```javascript
    {
        "slug": "httpscstayyabgithubio",
        "url": "https://cstayyab.github.io",
        "title": "CS Tayyab",
        "description": "Get to Know CS Tayyab"
    }
```

`slug` in each quick link is its identifier use to manipulate data in each quick link. (See `/api/v1/user/quicklink`)

> **If hash is Invalid**

`hash`: New Hash for the user

`data`: Data of newly created user. same as described above in valid hash section.

### **`/api/v1/user/defaultengine`**

Manipulate search engine of the user

#### **`PUT`**

Update the search engine slug of the user

##### Inputs

`hash`: Hash of the User

`slug`: Slug of the search engine

##### Outputs

> If `slug` is invalid
Status code `404` returned with following data:

```javascript
    {
        "error": "Search Engine Not Found"
    }
```

> If `hash` is invalid
Status code `200` with following data is returned

```javascript
    {
        "success": false
    }
```

> If everything is good

Following parameters are returned:
`hash`: Updated hash of data
`success`: true

### **`/api/v1/user/quicklinks`**

Manipulate quick links for each user

#### `POST`

Add a new Quick Link for the user

##### Inputs

`hash`: Hash of the User

`url`: URL of the Quick Link

`title`: Title for quick Link

`description`: Description for the Quick Link

##### Outputs

`success`: `true` or `false`. Depends on correctness of hash

`hash`: Updated hash of user data. Only returned is `success` is true

#### `DELETE`

Delete the quick link for current user

##### Inputs


`hash`: hash of current user

`slug`: slug of the quick link to delete

##### Outputs

if `hash` or `slug` is invalid then `{ success: false }` otherwise:

```javascript
    {
        "hash": "New Hash of User Data",
        "success": true
    }
```
#### `PUT`

Change title and description of quick link

##### Inputs

`hash`: Hash of the User

`slug`: Slug of the Quick Link

`title`: New title (old if not to be changes)

`description`: New Description (old if not to be changed)

##### Outputs

Returns:

`success`: `true` if no errors, `false` otherwise

`hash`: new hash of data (only if `success` is `true`)

### **`/api/v1/searchengine`**

Get All or single search engine

#### `GET`

Returns the search engine(s)

##### INPUTS

`slug`: (Optional) Slug of search engine

##### OUTPUTS

A single search engine (if slug is specified):

```javascript
    {
        "slug": "Slug of the search engine",
        "url": "URL of Search Page",
        "qParam": "Query Parameter"
    }
```

if `slug` is invalid then an Error `404` is returned with result `{ error: "Engine Not Found" }` is returned

If `slug` is not specified then an array of the search engines containing the elements specified above is returned with status code `200`.
