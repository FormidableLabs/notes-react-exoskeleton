/** @jsx React.DOM */
/**
 * Note Navigation Bar View
 *
 * Controls note nav bar and emits navigation events.
 */
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
    return (
      <Base>
        <ul className="nav navbar-nav note-nav">
          <li className={this.props.action === "view" ? " active" : ""}>
            <a href={this.props.note.id ? "/note/" + this.props.note.id + "/view" : "#"}
               onClick={this.viewNote}>
              <span className="glyphicon glyphicon-file"></span>
              <span className="hidden-phone-portrait">View</span>
            </a>
          </li>
          <li className={this.props.action === "edit" ? "active" : ""}>
            <a href={this.props.note.id ? "/note/" + this.props.note.id + "/edit" : "#"}
               onClick={this.editNote}>
              <span className="glyphicon glyphicon-pencil"></span>
              <span className="hidden-phone-portrait">Edit</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={this.deleteNote}>
              <span className="glyphicon glyphicon-trash"></span>
              <span className="hidden-phone-portrait">Delete</span>
            </a>
          </li>
        </ul>
      </Base>
    );
  }
});
