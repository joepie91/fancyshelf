var bookshelf, knex, util;

bookshelf = require("bookshelf");

knex = require("knex");

util = require("util");

module.exports = function(config) {
  var conn, shelf, _ref, _ref1, _ref2, _ref3;
  conn = (_ref = config.knex) != null ? _ref : knex({
    client: (function() {
      var _ref1;
      switch (config.engine) {
        case "pg":
        case "postgres":
        case "postgresql":
          return "pg";
        default:
          return (_ref1 = config.engine) != null ? _ref1 : "mysql2";
      }
    })(),
    connection: {
      host: (_ref1 = config.host) != null ? _ref1 : "localhost",
      user: config.username,
      password: config.password,
      database: config.database,
      charset: (_ref2 = config.charset) != null ? _ref2 : "utf8"
    },
    debug: (_ref3 = config.debug) != null ? _ref3 : false
  });
  shelf = bookshelf(conn);
  shelf.connection = conn;
  shelf.plugin("registry");
  shelf.plugin("virtuals");
  shelf.plugin(require.resolve("./aliases"));
  shelf.plugin(require.resolve("./better-fetch"));
  shelf.plugin(require.resolve("./find-method"));
  shelf.plugin(require.resolve("./retrieve-each"));
  shelf.plugin(require.resolve("./save-changes"));
  shelf.express = function(req, res, next) {
    req.db = shelf;
    req.model = shelf.model.bind(shelf);
    req.modelQuery = shelf.modelQuery.bind(shelf);
    return next();
  };
  return shelf;
};
