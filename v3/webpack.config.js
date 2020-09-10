/*
 * @Author       : zhangshengran
 * @Date         : 2020-09-02 14:53:56
 * @LastEditors  : zhangshengran
 * @LastEditTime : 2020-09-10 14:44:15
 * @Description  : file content
 */

const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, "./src/main.js"),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main_bundle[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader'
      // },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: `node_modules_vendors`,
          test: /[\\/]node_modules[\\/]/,//将第三方包拆出来
          priority: -10,
          chunks: 'initial'
        },
        common: {//将自己定义的utils拆出来。
          name: `chunk-common`,
          minChunks: 1,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true,
          // minSize: 1
        }
      }
    }
  },
//   stats:{
//     modules: false,
//     children: false,
//     chunks: false,
//     chunkModules: false
// },
stats: 'errors-only',
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: path.resolve(__dirname, './static/index.html')
      }

    ),

    new CleanWebpackPlugin(),
    new vueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:3000'],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
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

    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    })
  ]

}