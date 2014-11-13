/*globals process:false */
// Notes Collection
var Backbone = require("exoskeleton");
var NoteModel = require("../models/note");

// Build state.
var useLS = process.env.BUILD_LOCALSTORAGE === "true";
var useRest = !useLS;
Backbone.LocalStorage = useLS ? require("backbone.localstorage") : null;

// Class declaration.
var NotesCollection = Backbone.Collection.extend({
  model: NoteModel,
  url: useRest ? "/api/notes" : null,
  localStorage: useLS ? new Backbone.LocalStorage("react-exo") : null
});

// Singleton.
var _instance;
NotesCollection.getInstance = function () {
  _instance = _instance || new NotesCollection();
  return _instance;
};

module.exports = NotesCollection;
