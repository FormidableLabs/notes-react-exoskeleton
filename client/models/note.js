var Backbone = require("backbone");

// Notes Model
var NoteModel = Backbone.Model.extend({
  defaults: function () {
    return {
      title: "",
      text: "*Edit your note!*",
      createdAt: new Date()
    };
  }
});

module.exports = NoteModel;
