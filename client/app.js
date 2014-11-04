/** @jsx React.DOM */
/**
 * Entry point.
 */
/*jshint unused:false */
// Polyfills (ie8 compatibility).
require("es5-shim/es5-shim");
require("es5-shim/es5-sham");

// Libs
var Backbone = require("exoskeleton");
var React = require("react");
var NotesCollection = require("./collections/notes");
var Router = require("./routers/router");
var collection = NotesCollection.getInstance();

// ----------------------------------------------------------------------------
// Startup
// ----------------------------------------------------------------------------
// Helper: Start up app.
var _startApp = function () {
  var router = new Router();
  Backbone.history.start({
    pushState: true,
    hashChange: false
  });
};

// ----------------------------------------------------------------------------
// Bootstrap / Initialization
// ----------------------------------------------------------------------------
// Initial data from page.
var initialDataEl = document.getElementById("initial-data");
var initialData;
if (initialDataEl) {
  try {
    initialData = JSON.parse(initialDataEl.innerHTML);
  } catch (err) {}
}

// Wait until we have our initial collection from the backing
// store before firing up the router.
collection.once("reset", _startApp);

if (initialData) {
  // Bootstrap
  collection.reset(initialData);
} else {
  // Otherwise, fetch collection data, kicking off everything.
  collection.fetch({ reset: true });
}
