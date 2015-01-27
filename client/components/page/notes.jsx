/** @jsx React.DOM */
/**
 * Notes View
 *
 * Displays a list of notes.
 */
var React = require("react");
var Backbone = require("exoskeleton");
var _ = Backbone.utils;
var Base = require("./base.jsx");
var NotesItem = require("./notes/item.jsx");

var ENTER = 13;

module.exports = React.createClass({
  // --------------------------------------------------------------------------
  // Mount / Unmount
  // --------------------------------------------------------------------------
  // TODO: ABSTRACT OUT -- Model sync.
  // From: https://github.com/facebook/react/blob/1be9a9e/examples/
  //       todomvc-backbone/js/app.js#L148-L171
  componentDidMount: function () {
    // [BB] Add forceUpdate bindings.
    // Adding a model with have two actual force updates:
    // (1) On `add` without an `id` from the server.
    // (2) On `sync` when the server responds with new `id`.
    this.props.notes.on("add remove sync", function () {
      this.forceUpdate();
    }, this);
  },

  componentWillUnmount: function () {
    // [BB] Stop all listeners.
    this.props.notes.off(null, null, this);
  },

  // --------------------------------------------------------------------------
  // State
  // --------------------------------------------------------------------------
  getInitialState: function () {
    return { newNote: "" };
  },

  // Update new note value on changes.
  updateNewNote: function (ev) {
    this.setState({ newNote: ev.target.value });
  },

  // --------------------------------------------------------------------------
  // Note / Events
  // --------------------------------------------------------------------------
  // Create note on enter key.
  enterNote: function (ev) {
    if (ev.which === ENTER) {
      ev.stopPropagation();
      this.createNote();
    }
  },

  createNote: function () {
    // Short-circuit if empty note.
    if (!this.state.newNote) {
      return;
    }

    // [BB] Create a note model.
    this.props.notes.create({ title: this.state.newNote });
    this.setState({ newNote: "" });
  },

  // Return true if filter token occurs in value.
  isMatch: function (filter, value) {
    // Empty filter matches everything.
    if (!filter) { return true; }

    // Find lower-cased matches.
    value = value.toLowerCase();
    filter = filter.toLowerCase();

    return value.indexOf(filter) > -1;
  },

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  // Add single child note view to end of notes list.
  addNote: function (note) {
    return (
      <NotesItem note={note} key={note.id || note.id === 0 ? note.id : note.cid} />
    );
  },

  // Render.
  render: function () {
    // [BB] Add all notes from collection, sorted old to new.
    var noteNodes = this.props.notes.filter(function (m) {
      return this.isMatch(this.props.filter, m.get("title"));
    }, this);

    noteNodes = _.sortBy(noteNodes, function (m) { return m.get("createdAt"); })
      .map(this.addNote, this);

    return (
      <Base>
        <div className="panel panel-default">
          <table className="table table-bordered table-hover notes-list">
            <tbody>
              <tr>
                <td>
                  <input className="form-control notes-new-input"
                         data-qa-name="notes-new-input"
                         placeholder="Write a new note."
                         value={this.state.newNote}
                         onKeyPress={this.enterNote}
                         onChange={this.updateNewNote}
                         autofocus />
                </td>
                <td className="notes-item-action">
                  <div data-qa-name="notes-new-create"
                       className="btn btn-default btn-sm pull-right"
                       onClick={this.createNote}>
                    <span className="glyphicon glyphicon-plus"></span>
                  </div>
                </td>
              </tr>
              {noteNodes}
            </tbody>
          </table>
        </div>
      </Base>
    );
  }
});
