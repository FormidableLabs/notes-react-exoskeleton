/** @jsx React.DOM */
/**
 * Note View - View
 */
var React = require("react");
var markdown = require("markdown").markdown;

module.exports = React.createClass({
  render: function () {
    /*jshint unused:false */
    var html = markdown.toHTML(this.props.note.get("text"));

    return (/*jshint ignore:start */
      <div id="note-pane-view" className="pane">
        <div id="note-pane-view-content">
          <div className="well well-small">
            <h2 id="pane-title">{this.props.note.get("title")}</h2>
          </div>
          <div id="pane-text">
            <span dangerouslySetInnerHTML={{__html: html}} />
          </div>
        </div>
      </div>
    /*jshint ignore:end */);
  }
});
