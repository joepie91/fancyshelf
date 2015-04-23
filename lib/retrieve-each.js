module.exports = function(bookshelf) {
  return bookshelf.Model.prototype.retrieveEach = function(withRelated, options, callback) {
    var collection, model;
    collection = this.constructor.collection();
    collection._knex = this.query().clone();
    this.resetQuery();
    if (this.relatedData != null) {
      collection.relatedData = this.relatedData;
    }
    model = this;
    return collection.fetchOne().then(function(model) {
      console.log(model);
      return collection.fetchOne();
    }).then(function(model) {
      return console.log(model);
    });
  };
};
