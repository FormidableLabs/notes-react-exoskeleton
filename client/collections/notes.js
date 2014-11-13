// Notes Collection
var Backbone = require("exoskeleton");
var NoteModel = require("../models/note");
var NotesCollection;

// Class attributes (may mutate for local storage).
var attrs = {
  model: NoteModel,
  url: "/api/notes"
};

// Local Storage overrides (for public website).
/*globals process:false */
if (process.env.BUILD_LOCALSTORAGE === "true") {
  // Patch Backbone
  Backbone.LocalStorage = require("backbone.localstorage");

  // LocalStorage class.
  delete attrs.url;
  attrs.localStorage = new Backbone.LocalStorage("react-exoskeleton-demo");
}

// Class declaration.
var NotesCollection = Backbone.Collection.extend(attrs);

// Singleton.
var _instance;
NotesCollection.getInstance = function () {
  _instance = _instance || new NotesCollection();
  return _instance;
};

module.exports = NotesCollection;
