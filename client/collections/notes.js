// Notes Collection
var _ = require("lodash/dist/lodash.underscore");
var Backbone = require("backbone");

var NoteModel = require("../models/note");

var NotesCollection = Backbone.Collection.extend({
  url: "/api/notes",
  model: NoteModel
});

// Singleton.
NotesCollection.getInstance = _.memoize(function () {
  return new NotesCollection();
});

module.exports = NotesCollection;
