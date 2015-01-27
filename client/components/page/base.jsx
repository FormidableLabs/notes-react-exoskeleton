/** @jsx React.DOM */
/**
 * Base page component.
 */
var React = require("react");

module.exports = React.createClass({
  render: function () {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
});
