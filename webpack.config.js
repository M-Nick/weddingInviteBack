const path = require("path");
const webpack = require("webpack");
const { NODE_ENV = "production" } = process.env;

module.exports = {
  entry: "./src/index.js",
  mode: NODE_ENV,
  target: "node",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".js"],
  },
  optimization: {
    minimize: false,
  },
  plugins: [new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })],
};
