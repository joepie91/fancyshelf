var Promise;

Promise = require("bluebird");

module.exports = function(bookshelf) {
  var _preprocessOptions;
  bookshelf.Model.prototype.json = bookshelf.Model.prototype.toJSON;
  bookshelf.Collection.prototype.json = bookshelf.Collection.prototype.toJSON;
  _preprocessOptions = function(model, options) {
    if (options.start != null) {
      model.query(function(builder) {
        return builder.offset(options.start);
      });
      delete options.start;
    }
    if (options.limit != null) {
      model.query(function(builder) {
        return builder.limit(options.limit);
      });
      delete options.limit;
    }
    return [model, options];
  };
  bookshelf.modelQuery = function(model, func) {
    return this.model(model).forge({}).query(func);
  };
  bookshelf.collectionQuery = function(collection, func) {
    return this.collection(collection).forge({}).query(func);
  };
  bookshelf.Model.getOneFromQuery = function(func, withRelations, options) {
    if (withRelations == null) {
      withRelations = [];
    }
    if (options == null) {
      options = {};
    }
    return this.forge({}).query(func).retrieve(withRelations, options);
  };
  bookshelf.Model.getAllFromQuery = function(func, withRelations, options) {
    var model, _ref;
    if (withRelations == null) {
      withRelations = [];
    }
    if (options == null) {
      options = {};
    }
    _ref = this._fancyshelfQueryAllFromQuery(func, options), model = _ref[0], options = _ref[1];
    return model.retrieveAll(withRelations, options);
  };
  bookshelf.Model.countAllFromQuery = function(func, options) {
    if (options == null) {
      options = {};
    }
    return Promise.bind(this).then(function() {
      var model, _ref;
      _ref = this._fancyshelfQueryAllFromQuery(func, options), model = _ref[0], options = _ref[1];
      return model.query().count("" + model.idAttribute + " as CNT");
    }).then(function(result) {
      return Promise.resolve(result[0].CNT);
    });
  };
  bookshelf.Model._fancyshelfQueryAllFromQuery = function(func, options) {
    var model;
    model = this.forge({}).query(func);
    return _preprocessOptions(model, options);
  };
  bookshelf.Model.getOneWhere = function(conditions, withRelations, options) {
    if (withRelations == null) {
      withRelations = [];
    }
    if (options == null) {
      options = {};
    }
    return this.forge(conditions).retrieve(withRelations, options);
  };
  bookshelf.Model.getAllWhere = function(conditions, withRelations, options) {
    var model, _ref;
    if (withRelations == null) {
      withRelations = [];
    }
    if (options == null) {
      options = {};
    }
    _ref = this._fancyshelfQueryAllWhere(conditions, options), model = _ref[0], options = _ref[1];
    return model.retrieveAll(withRelations, options);
  };
  bookshelf.Model.countAllWhere = function(conditions, options) {
    if (options == null) {
      options = {};
    }
    return Promise.bind(this).then(function() {
      var model, _ref;
      _ref = this._fancyshelfQueryAllWhere(conditions, options), model = _ref[0], options = _ref[1];
      return model.query().count("" + model.idAttribute + " as CNT");
    }).then(function(result) {
      return Promise.resolve(result[0].CNT);
    });
  };
  bookshelf.Model._fancyshelfQueryAllWhere = function(conditions, options) {
    var key, model, value;
    model = this.forge({});
    for (key in conditions) {
      value = conditions[key];
      model = model.where(key, value);
    }
    return _preprocessOptions(model, options);
  };
  bookshelf.Model.getAll = function(withRelations, options) {
    var model, _ref;
    if (withRelations == null) {
      withRelations = [];
    }
    if (options == null) {
      options = {};
    }
    _ref = this._fancyshelfQueryAll(options), model = _ref[0], options = _ref[1];
    return model.retrieveAll(withRelations, options);
  };
  bookshelf.Model.countAll = function(options) {
    if (options == null) {
      options = {};
    }
    return Promise.bind(this).then(function() {
      var model, _ref;
      _ref = this._fancyshelfQueryAll(options), model = _ref[0], options = _ref[1];
      return model.query().count("" + model.idAttribute + " as CNT");
    }).then(function(result) {
      return Promise.resolve(result[0].CNT);
    });
  };
  return bookshelf.Model._fancyshelfQueryAll = function(options) {
    var model;
    model = this.forge({});
    if (options.require == null) {
      options.require = false;
    }
    return _preprocessOptions(model, options);
  };
};
