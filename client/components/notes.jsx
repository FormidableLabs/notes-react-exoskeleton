/**
 * Notes full page.
 */
 var React = require("react");
var NotesNav = require("./nav/notes.jsx");
var NotesPage = require("./page/notes.jsx");

module.exports = React.createClass({
  // --------------------------------------------------------------------------
  // State
  // --------------------------------------------------------------------------
  getInitialState: function () {
    return { filter: "" };
  },

  onUpdateFilter: function (filter) {
    this.setState({ filter: filter });
  },

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  render: function () {
    return (
      <div>
        <NotesNav notes={this.props.notes} onUpdateFilter={this.onUpdateFilter} />
        <NotesPage notes={this.props.notes} filter={this.state.filter} />
      </div>
    );
  }
});
