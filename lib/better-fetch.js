module.exports = function(bookshelf) {
  var _processOptions;
  _processOptions = function(withRelations, options) {
    if (options.require == null) {
      options.require = true;
    }
    if (typeof withRelations === "string") {
      withRelations = [withRelations];
    }
    options.withRelated = withRelations;
    return options;
  };
  bookshelf.Model.prototype.retrieve = function(withRelations, options) {
    if (withRelations == null) {
      withRelations = [];
    }
    if (options == null) {
      options = {};
    }
    return this.fetch(_processOptions(withRelations, options));
  };
  bookshelf.Model.prototype.retrieveAll = function(withRelations, options) {
    if (withRelations == null) {
      withRelations = [];
    }
    if (options == null) {
      options = {};
    }
    return this.fetchAll(_processOptions(withRelations, options));
  };
  bookshelf.Model.prototype.retrieveOptional = function(withRelations, options) {
    if (withRelations == null) {
      withRelations = [];
    }
    if (options == null) {
      options = {};
    }
    options.require = false;
    return this.fetch(_processOptions(withRelations, options));
  };
  return bookshelf.Model.prototype.retrieveAllOptional = function(withRelations, options) {
    if (withRelations == null) {
      withRelations = [];
    }
    if (options == null) {
      options = {};
    }
    options.require = false;
    return this.fetchAll(_processOptions(withRelations, options));
  };
};
