/**
 * Webpack configuration
 */

var path = require("path");
var webpack = require("webpack");
var useLS = process.env.BUILD_LOCALSTORAGE === "true";

module.exports = {
  cache: true,
  context: path.join(__dirname, "client"),
  entry: "./app.js",
  output: {
    path: path.join(__dirname, "app/js-dist"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: "jsx-loader" },
      // Make UMD hit the CommonJS path.
      { test: /exoskeleton\.js$/, loader: "imports?define=>false" }
    ]
  },
  externals: {
    // Deliberately undefined vars for conditional exclusion for exoskeleton.
    "jquery": "__NOOP",
    "underscore": "__NOOP"
  },
  resolve: {
    alias: {
      "type": "type-of", // For `component-ajax`
      "backbone": "exoskeleton" // For backbone.localStorage imports.
    }
  },
  plugins: [
    // Optimize
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        // Signal production mode for React JS libs.
        NODE_ENV: JSON.stringify("production"),
        // Proxy env variable for LS build.
        BUILD_LOCALSTORAGE: JSON.stringify(useLS ? "true" : "false")
      }
    }),
    // Manually do source maps to use alternate host.
    new webpack.SourceMapDevToolPlugin(
      "bundle.js.map",
      useLS ? undefined : // Use normal, relative url for localstorage.
        "\n//# sourceMappingURL=http://127.0.0.1:3001/app/js-dist/[url]")
  ]
};
