var Promise, _;

_ = require("lodash");

Promise = require("bluebird");

module.exports = function(bookshelf) {
  return bookshelf.Model.prototype.saveChanges = function(options) {
    if (options == null) {
      options = {};
    }
    if (!_.isEmpty(this.changed)) {
      options.patch = true;
      return this.save(this.changed, options);
    } else {
      return Promise.resolve(this);
    }
  };
};
