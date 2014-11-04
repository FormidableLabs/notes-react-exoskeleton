/** @jsx React.DOM */
/**
 * Note Navigation Bar View
 *
 * Controls note nav bar and emits navigation events.
 */
/*jshint unused:false */
var React = require("react");
var Backbone = require("exoskeleton");
var Base = require("./base.jsx");

var _updateLoc = function (action) {
  var oldLoc = Backbone.history.fragment;
  var newLoc = oldLoc.replace(/\/[^\/]*?$/, "/" + action);
  if (oldLoc !== newLoc) {
    Backbone.history.navigate(newLoc, { replace: true, trigger: false });
  }
};

module.exports = React.createClass({
  // --------------------------------------------------------------------------
  // Events
  // --------------------------------------------------------------------------
  // [BB] Navigation, models.
  // TODO: Consider combining with notes view.
  viewNote: function (ev) {
    ev.preventDefault();
    this.props.handleActionChange("view");
    _updateLoc("view");
  },
  editNote: function (ev) {
    ev.preventDefault();
    this.props.handleActionChange("edit");
    _updateLoc("edit");
  },
  deleteNote: function (ev) {
    ev.preventDefault();
    this.props.note.destroy();
    Backbone.history.navigate("", { trigger: true });
  },

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  render: function () {
    return (/*jshint ignore:start */
      <Base>
        <ul id="note-nav" className="nav navbar-nav">
          <li className={"note-view" + (this.props.action === "view" ? " active" : "")}>
            <a href="#" onClick={this.viewNote}>
              <span className="glyphicon glyphicon-file"></span>
              <span className="hidden-phone-portrait">View</span>
            </a>
          </li>
          <li className={"note-edit" + (this.props.action === "edit" ? " active" : "")}>
            <a href="#" onClick={this.editNote}>
              <span className="glyphicon glyphicon-pencil"></span>
              <span className="hidden-phone-portrait">Edit</span>
            </a>
          </li>
          <li className="note-delete">
            <a href="#" onClick={this.deleteNote}>
              <span className="glyphicon glyphicon-trash"></span>
              <span className="hidden-phone-portrait">Delete</span>
            </a>
          </li>
        </ul>
      </Base>
    /*jshint ignore:end */);
  }
});
