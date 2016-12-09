'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = { 
  entry: {
    app: './app.js',
    vendor: [
      'angular', 
      'angular-route'
    ]
  },
  output: {
    path: __dirname + '/build',
    publicPath: 'http://localhost:8080/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  devtool: 'eval',
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        cacheDirectory: true
      },
      exclude: /(node_modules|bower_components)/
    }, {
      test: /\.html$/,
      loader: 'raw'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract("style","css!sass")
    }, { 
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "file-loader" 
    }, { 
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "file-loader" 
    }]
  },
  devServer: {
    contentBase: './app',
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  }
};
