/*
 * @Author       : zhangshengran
 * @Date         : 2020-09-02 14:53:56
 * @LastEditors  : zhangshengran
 * @LastEditTime : 2020-09-10 16:08:19
 * @Description  : file content
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
const argv = require('yargs').argv;
const mode = argv.mode;
console.log(mode)
const chalk = require('chalk');
module.exports = {
  entry: {
    index: path.resolve(__dirname, "../src/main.js"),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main_bundle[hash].js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        include: path.resolve("src"),
        use: [
          //  "thread-loader",
        'vue-loader']
      },
     
      {
        test: /\.less$/i,
        exclude: /node_modules/,
        use: [
          mode==='development'?'vue-style-loader': MiniCssExtractPlugin.loader,
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
          test: /[\\/]node_modules[\\/]/,//将第三方node_modules包单独拆出来
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

stats: 'errors-only',
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: path.resolve(__dirname, '../static/index.html')
      }

    ),
    new vueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    })
  ]

}