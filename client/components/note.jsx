/** @jsx React.DOM */
/**
 * Note full page.
 */
 /*jshint unused:false */
var React = require("react");
var NoteNav = require("./nav/note.jsx");
var NotePage = require("./page/note.jsx");

module.exports = React.createClass({

  // --------------------------------------------------------------------------
  // State
  // --------------------------------------------------------------------------
  getInitialState: function () {
    return { action: this.props.action };
  },

  // --------------------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------------------
  setAction: function (action) {
    this.setState({ action: action });
  },

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  render: function () {
    return (/*jshint ignore:start */
      <div>
        <NoteNav note={this.props.note} action={this.state.action}
                 handleActionChange={this.setAction} />
        <NotePage note={this.props.note} action={this.state.action} />
      </div>
    /*jshint ignore:end */);
  }
});
