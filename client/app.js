/** @jsx React.DOM */
/**
 * Entry point.
 */
/*jshint unused:false */
// TODO: Move all this to common place?
// Polyfills (ie8 compatibility).
require("es5-shim/es5-shim");
require("es5-shim/es5-sham");

// Exoskeleton
var Backbone = require("exoskeleton");
var ajax = require("component-ajax");
Backbone.ajax = function () { // Ajax support.
  return ajax.apply(ajax, arguments);
};

// Normal lbs
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

  // Manually check if pushstate available to avoid bad listeners set by
  // Exoskeleton...
  // http://stackoverflow.com/questions/22781394
  var _havePushState = "history" in window && "pushState" in history;

  Backbone.history.start({
    pushState: _havePushState,  // true
    hashChange: !_havePushState // false
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
