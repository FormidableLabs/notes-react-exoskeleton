/** @jsx React.DOM */
/**
 * Notes View
 *
 * Displays a list of notes.
 */
/*jshint unused:false */
var React = require("react");
var Backbone = require("exoskeleton");
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
  componentDidMount: function() {
    // [BB] Add forceUpdate bindings.
    this.props.notes.on("add remove", function () {
      this.forceUpdate();
    }, this);
  },

  componentWillUnmount: function() {
    // [BB] Stop all listeners.
    this.props.notes.off(null, null, this);
  },

  // --------------------------------------------------------------------------
  // State
  // --------------------------------------------------------------------------
  getInitialState: function() {
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

  createNote: function (ev) {
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
    return (/*jshint ignore:start */
      <NotesItem note={note} key={note.id} />
    /*jshint ignore:end */);
  },

  // Render.
  render: function () {
    // [BB] Add all notes from collection, sorted old to new.
    var noteNodes = this.props.notes.filter(function (m) {
      return this.isMatch(this.props.filter, m.get("title"));
    }, this);

    noteNodes = Backbone.utils
      .sortBy(noteNodes, function (m) { return m.get("createdAt"); })
      .map(this.addNote, this);

    return (/*jshint ignore:start */
      <Base>
        <div id="notes">
          <table id="notes-list" className="table table-curved table-hover">
            <tbody>
              <tr className="notes-new">
                <td className="note-name">
                  <input className="form-control"
                         placeholder="Write a new note."
                         value={this.state.newNote}
                         onKeyPress={this.enterNote}
                         onChange={this.updateNewNote}
                         autofocus />
                </td>
                <td className="note-action">
                  <button id="note-create"
                          type="button"
                          className="btn btn-default btn-sm pull-right"
                          onClick={this.createNote}>
                    <span className="glyphicon glyphicon-plus"></span>
                  </button>
                </td>
              </tr>
              {noteNodes}
            </tbody>
          </table>
        </div>
      </Base>
    /*jshint ignore:end */);
  }
});
