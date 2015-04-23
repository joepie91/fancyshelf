module.exports = function(bookshelf) {
  bookshelf.Model.find = function(id, withRelations, options) {
    var model;
    if (withRelations == null) {
      withRelations = [];
    }
    if (options == null) {
      options = {};
    }
    if (options.require == null) {
      options.require = true;
    }
    model = new this();
    model.set(model.idAttribute, id);
    if (options.query != null) {
      model.query(options.query);
    }
    return model.retrieve(withRelations, options);
  };
  return bookshelf.Model.findOptional = function(id, withRelations, options) {
    if (withRelations == null) {
      withRelations = [];
    }
    if (options == null) {
      options = {};
    }
    options.require = false;
    return bookshelf.Model.find.call(this, id, withRelations, options);
  };
};
