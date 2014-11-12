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
  editNote: function (ev) {
    ev.preventDefault();
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
          data-qa-name="notes-item">
        <td>
          <a className="notes-item-title"
             data-qa-name="notes-item-title"
             href={this.props.note.id ? "/note/" + this.props.note.id + "/view" : "#"}
             onClick={this.viewNote}>
            {this.props.note.get("title")}
          </a>
        </td>
        <td className="notes-item-action">
          <div className="btn-group btn-group-sm pull-right">
            <button className="btn btn-default"
                    data-qa-name="notes-item-edit"
                    onClick={this.editNote}>
              <a className="glyphicon glyphicon-pencil"
                 href={this.props.note.id ? "/note/" + this.props.note.id + "/edit" : "#"}
                 ></a>
            </button>
            <button className="btn btn-default"
                    data-qa-name="notes-item-delete"
                    onClick={this.deleteNote}>
              <span className="glyphicon glyphicon-trash"></span>
            </button>
          </div>
        </td>
      </tr>
    /*jshint ignore:end */);
  }
});
