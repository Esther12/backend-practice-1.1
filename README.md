# 2019 Q4 Backend Entry Submission

## Summary

This is not an exhaustive examination of your skill-set, rather we are trying to ensure a basic understanding of the subject matter. You are tasked with creating a simple RESTful CRUD API to a mongo collection, as well as create a simple aggregate query in mongo.
There are no tricks here, nor are we looking to see if you'll cover every edge case. You may use any library/framework you like, but we will reward using `feathersjs`. We expect this test to take anywhere from 1 to 4 hours of your focused time (assuming you already have all the tooling installed on your machine etc...)

In this repo you will find a json dump of the `stats` collection. You can find it in `./fixtures/stats.collection.json`. Ensure that you have a running Mongo db, and import this collection in it before you start the test.

The `stats` collection follows this schema:

```javascript
{
  _id: ObjectId,
  latest: Boolean,
  schema_version: Number,
  asset_type: String,
  asset_id: String,
  stat: String,
  value: Any,
  date: Date,
  created_at: Date,
  updated_at: Date,
}
```

### Running instructions

Setup your environment, and project so that we may be able to do the following to test it:

* `docker-compose up` installs and starts all required services (mongo etc...)
* `yarn` or `npm install` installs all dependencies
* `yarn start` or `npm run start` starts the server
* We should be able to access all routes through `http://localhost:4000/`

Make sure you take a look at the submission instructions at the bottom after you've completed the test.

## 1. Node RESTful CRUD server

Create a Node server, that provides RESTful CRUD access to the `stats` collection through the route `collection/stats/`.

### required routes

* **POST** `collection/stats/`
* **GET** `collection/stats/`
* **GET** `collection/stats/{id}`
* **PUT** `collection/stats/{id}`
* **PATCH** `collection/stats/{id}`
* **DELETE** `collection/stats/{id}`

### expected responses

We expect the result to be the full record returned back in most cases, and following the model provided earlier. The one exception is in the case of arrays, in which case we allow you to set the shape of the object, but the atomic record should always follow the model regardless.

* the newly created record
* an updated/patched record
* a found record / array of records
  * 404 in the case where it doesn't exist
* the deleted record

### Bonus

implement a `soft delete` feature, where instead of removing a document, you just mark it as `deleted` in the document. If a document is marked deleted it should return 404 when queried, unless a `$disableSoftDelete` flag is passed in the query.

## 2.  Aggregate query

Create a route `report/recent_stats_by_channel/` on the server that returns the result of an aggregate query that groups the stats by channel, and shows the 10 most recent records for the stats: `youtube_subscribers`, and `youtube_posts_30d`.

The expected end result should look something like this:

```javascript
[
  {
    _id: '<channel_id>',
    subscribers: [
      {value: Number, date: Date},
      // most recent 10 records
    ],
    posts_30d: [
      {value: Number, date: Date},
      // most recent 10 records
    ]
  },
]
```

## 3. Contact route

Create a route `utils/contact_me` on the server that responds with your personal contact information following this format:

```javascript
{
  name: String,
  email: String,
  phone: String,

  // you can leave any note you like here
  // like preferred hours to call/email etc...
  note: String,

  // you can leave a URL, otherwise we'll look in `./fixtures/`
  resume: String,
}
```

---------

## What we're looking for

You'll be rewarded for:

* clean, structured code
* concise, and readable code
* clean architecture
* clean folder structure
* using the latest ES syntax (>= stage 3)
* using linters, and having consistent patterns
* jsdoc, typescript definitions
* storing secrets in a `.env` file (instead of directly in the code)
  * since this is just a test, make sure to include the `.env` file in your repo, and to gitignore it
* using feathers.js


## Submission instructions

We recommend you fork this repo, and extend access to our CTO `"Amin El-Naggar <amin@alfangroup.com>"` as a member in your repo (ensure we have role with enough permissions to view the project). We recommend that you don't make your repo public.