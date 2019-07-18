const path = require('path');

module.exports = {
  entry: "./wp-content/themes/enredmenu/js/App.js",
  output: {
    path: path.resolve(__dirname, "./wp-content/themes/enredmenu/js"),
    filename: "scripts-bundled.js"
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        query: {
          presets: ["env"]
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  mode: 'development'
}
