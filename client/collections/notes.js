// Notes Collection
var Backbone = require("exoskeleton");
var NoteModel = require("../models/note");

var NotesCollection = Backbone.Collection.extend({
  url: "/api/notes",
  model: NoteModel
});

// Singleton.
var _instance;
NotesCollection.getInstance = function () {
  _instance = _instance || new NotesCollection();
  return _instance;
};

module.exports = NotesCollection;
