/*
 * @Author       : zhangshengran
 * @Date         : 2020-09-10 14:49:44
 * @LastEditors  : zhangshengran
 * @LastEditTime : 2020-09-10 15:39:16
 * @Description  : file content
 */
const Webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
// const WebpackMerge = require('webpack-merge')
const { merge } = require('webpack-merge');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(webpackConfig,{
  mode:'development',
  devtool:'cheap-module-eval-source-map',
  devServer:{
    port:3000,
    hot:true,
    contentBase:'../dist',
    quiet: true,
  },
  plugins:[
    new Webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: ['You application is running here http://localhost:3000'],
        //   notes: ['Some additionnal notes to be displayed unpon successful compilation']
        },
        onErrors: function (severity, errors) {
          // You can listen to errors transformed and prioritized by the plugin
          // severity can be 'error' or 'warning'
        },
        // should the console be cleared between each compilation?
        // default is true
        clearConsole: true,
  
        // add formatters and transformers (see below)
        additionalFormatters: [],
        additionalTransformers: []
      }),
  ]
})