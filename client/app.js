/** @jsx React.DOM */
/**
 * Entry point.
 */
/*jshint unused:false */
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
  /*globals global:true, process:false */
  var root = typeof window !== "undefined" ? window : global;
  var router = new Router();

  // Check if pushstate available to avoid bad listeners from Exoskeleton...
  // http://stackoverflow.com/questions/22781394
  var _havePushState = "history" in root && "pushState" in root.history;

  // Check if we _want_ to use pushstate.
  var _usePushState = process.env.BUILD_LOCALSTORAGE !== "true";

  // Also, Exoskeleton has `addEventListener|removeEventListener` calls around
  // `hashchange`, which we will narrowly polyfill here. Long term, look for
  // a more robust solution.
  // window.addEventListener('hashchange', this.checkUrl, false);
  // window.removeEventListener('hashchange', this.checkUrl);
  root.addEventListener = root.addEventListener || function (name, fn) {
    root.attachEvent("on" + name, fn);
  };
  root.removeEventListener = root.removeEventListener || function (name, fn) {
    root.detachEvent("on" + name, fn);
  };

  Backbone.history.start({
    pushState: _havePushState && _usePushState
  });
};

// ----------------------------------------------------------------------------
// Bootstrap / Initialization
// ----------------------------------------------------------------------------
// Initial data from page.
var initialDataEl = document.querySelector(".js-initial-data");
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
