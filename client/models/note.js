var Backbone = require("exoskeleton");

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
