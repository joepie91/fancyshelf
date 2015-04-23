# fancyshelf

A friendly wrapper for Bookshelf. The goal is to have an API that is so consistent, predictable and logical that you won't even really need to read the documentation to use it.

The `registry` and `virtuals` plugins in Bookshelf are enabled by default when using `fancyshelf`.

## CAUTION!

This is very much __not suitable for production use yet.__ You should __not__ use this module unless you know what you are doing.

It is very possible that __this module will never make it to a 'real' release.__ A redesign of Bookshelf is ongoing, and I am planning on my own experimental ORM as well.

Consider this module to be a temporary band-aid until something better is available.

## Instantiating

```js
var shelf = require("fancyshelf")({
	engine: "mysql2",  /* Optional The database engine to use. Defaults to `mysql2`. */
	host: "localhost",  /* The hostname that the database runs on. */
	username: "my_site"  /* the database username to use. */
	password: "thisisnotasecurepassword",  /* The password... */
	database: "my_site",  /* The database to use. */
	charset: "utf8",  /* Optional. The character set to use. Defaults to 'utf8'. */
	debug: true  /* Whether to output debug information. Don't use in production. */
});
```

## Using with Express

```js
express.use(shelf.express);
```

## Non-Express `fancyshelf` API

Mostly the same as for `bookshelf`.

### shelf.connection

The underlying `knex` instance.

### shelf.modelQuery(`modelName`, `queryFunc`)

See the documentation for `req.modelQuery`.

## Express middleware API

All `fancyshelf`-related attributes exist on the `req` object.

### req.db

This attribute contains the underlying `fancyshelf` object.

### req.db.connection

The underlying `knex` instance for the `fancyshelf` object. It's useful for raw queries.

### req.model(`modelName`[, `modelDefinition`])

Retrieves an existing model or, if a `modelDefinition` is specified, creates a new one under the given `modelName`.

### req.modelQuery(`modelName`, `queryFunc`)

Shorthand method for retrieving a model and defining a query on it. Specify a callback as `queryFunc` - this callback will receive the Knex querybuilder for the model as its first argument, on which you can then operate.

## Exceptions

### shelf.NotFoundError / req.db.NotFoundError

This exception is thrown when an attempt to retrieve a *single* model fails.

### shelf.EmptyResponse / req.db.EmptyResponse

This exception is thrown when an attempt to retrieve a *collection* of models fails.

## Model querying API

This API is available to any model originating from a `req.model` call.

### model.find(`id`[, `withRelations`, `options`])

Attempts to retrieve a model with the given `id` from the database. If the given model cannot be found, an error will be thrown (if you don't want this, use `findOptional`).

You can use `withRelations` to specify an array or map of relations to retrieve, and `options` for specifying standard Bookshelf query options to use.

Returns a populated model.

### model.findOptional(`id`[, `withRelations`, `options`])

The same as `model.find`, but does not throw an error if the model is not found in the database.

Returns a populated model when found, or an empty model when not found.

### model.getOneWhere(`conditions`[, `withRelations`, `options`])

Retrieves a single model from the database whose attributes match all `conditions`. Unspecified attributes are not taken into account.

Accepts `withRelations` and `options` like `model.find`.

Returns a populated model when found.

### model.getAllWhere(`conditions`[, `withRelations`, `options`])

Retrieves all models from the database whose attributes match all `conditions`. Unspecified attributes are not taken into account.

Accepts `withRelations` and `options` like `model.find`.

Returns a collection of populated models when found.

### model.getCountWhere(`conditions`[, `withRelations`, `options`])

Retrieves the number of models in the database whose attributes match all `conditions`. Unspecified attributes are not taken into account.

Accepts `withRelations` and `options` like `model.find`.

Returns the number of matches (ie. `COUNT`).

### model.getOneFromQuery(`queryFunc`[, `withRelations`, `options`])

Retrieves a single model from the database that is matched by the specified `queryFunc` (as in `req.modelQuery`).

Accepts `withRelations` and `options` like `model.find`.

Returns a populated model when found.

### model.getAllFromQuery(`queryFunc`[, `withRelations`, `options`])

Retrieves all models from the database that are matched by the specified `queryFunc` (as in `req.modelQuery`).

Accepts `withRelations` and `options` like `model.find`.

Returns a collection of populated models when found.

### model.getCountFromQuery(`queryFunc`[, `withRelations`, `options`])

Retrieves the number of models in the database that are matched by the specified `queryFunc` (as in `req.modelQuery`).

Accepts `withRelations` and `options` like `model.find`.

Returns the number of matches (ie. `COUNT`).

### model.getAll([`options`])

Retrieves all models in the database. Accepts `options` like `model.find`.

### model.countAll([`options`])

Returns the amount of models in the database. Accepts `options` like `model.find`.

## Model retrieval API

These functions may be useful when you're building a model query manually, and still want to take advantage of `fancyshelf`'s syntax.

### model.retrieve([`withRelations`, `options`])

Retrieves one matching model from the database. Throws an error if none are found.

Accepts `withRelations` and `options` like `model.find`.

### model.retrieveAll([`withRelations`, `options`])

Retrieves all matching models from the database. Throws an error if none are found.

Accepts `withRelations` and `options` like `model.find`.

### model.retrieveOptional([`withRelations`, `options`])

Retrieves one matching model from the database. Silently fails.

Accepts `withRelations` and `options` like `model.find`.

### model.retrieveAllOptional([`withRelations`, `options`])

Retrieves all matching models from the database. Silently fails.

Accepts `withRelations` and `options` like `model.find`.

## Model modification API

This API is available to any populated model.

### model.saveChanges()

Saves the model, but *only the attributes that have changed*.

