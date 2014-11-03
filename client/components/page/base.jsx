/** @jsx React.DOM */
/**
 * Base page component.
 */
var React = require("react");

module.exports = React.createClass({
  render: function () {
    return (/*jshint ignore:start */
      <div id="page" className="container">
        {this.props.children}
      </div>
    /*jshint ignore:end */);
  }
});
