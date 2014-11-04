/** @jsx React.DOM */
/**
 * Notes Item View
 *
 * A single note within a list of notes.
 */
var React = require("react");
var Backbone = require("exoskeleton");

module.exports = React.createClass({
  // --------------------------------------------------------------------------
  // Events
  // --------------------------------------------------------------------------
  // [BB] Navigation, models.
  viewNote: function (ev) {
    ev.preventDefault();
    Backbone.history.navigate(
      "note/" + this.props.note.id + "/view", { trigger: true });
  },
  editNote: function () {
    Backbone.history.navigate(
      "note/" + this.props.note.id + "/edit", { trigger: true });
  },
  deleteNote: function () {
    this.props.note.destroy();
  },

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  render: function () {
    return (/*jshint ignore:start */
      <tr id={this.props.note.id}
          className="notes-item">
        <td className="note-name">
          <a className="note-title note-view"
             href={"/note/" + this.props.note.id + "/view"}
             onClick={this.viewNote}>
            {this.props.note.get("title")}
          </a>
        </td>
        <td className="note-action">
          <div className="btn-group btn-group-sm pull-right">
            <button className="btn btn-default note-edit"
                    onClick={this.editNote}>
              <span className="glyphicon glyphicon-pencil"></span>
            </button>
            <button className="btn btn-default note-delete"
                    onClick={this.deleteNote}>
              <span className="glyphicon glyphicon-trash"></span>
            </button>
          </div>
        </td>
      </tr>
    /*jshint ignore:end */);
  }
});
