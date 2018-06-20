const path = require('path');
var babelenv = require('babel-preset-env');

module.exports = {
  entry: './lib/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [babelenv]
          }
        }
      }
    ]
  }
};