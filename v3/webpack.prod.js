/*
 * @Author       : zhangshengran
 * @Date         : 2020-09-10 14:49:31
 * @LastEditors  : zhangshengran
 * @LastEditTime : 2020-09-10 15:48:24
 * @Description  : file content
 */
const path = require('path')
const webpackConfig = require('./webpack.config.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(webpackConfig, {
  mode: 'production',
//   devtool: 'cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ],
  module:{
      rules:[ 
          {
        test: /\.js$/,
        loader: 'babel-loader'
      },]
  }

})