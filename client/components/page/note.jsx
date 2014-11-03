/** @jsx React.DOM */
/**
 * Note View
 *
 * A single note.
 */
/*jshint unused:false */
var React = require("react");
var _ = require("lodash/dist/lodash.underscore");
var Base = require("./base.jsx");
var NoteView = require("./note/view.jsx");
var NoteEdit = require("./note/edit.jsx");

module.exports = React.createClass({
  // TODO: ABSTRACT OUT -- Model sync.
  // From: https://github.com/facebook/react/blob/1be9a9e/examples/
  //       todomvc-backbone/js/app.js#L148-L171
  componentDidMount: function() {
    // [BB] Add forceUpdate bindings.
    this.props.note.on("add change remove",
      _.bind(this.forceUpdate.bind, null), this);
  },

  componentWillUnmount: function() {
    // [BB] Stop all listeners.
    this.props.note.off(null, null, this);
  },

  render: function () {
    return (/*jshint ignore:start */
      <Base>
      {this.props.action === "view" ?
        <NoteView note={this.props.note} /> :
        <NoteEdit note={this.props.note} />}
      </Base>
    /*jshint ignore:end */);
  }
});
