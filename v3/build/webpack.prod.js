/*
 * @Author       : zhangshengran
 * @Date         : 2020-09-10 14:49:31
 * @LastEditors  : zhangshengran
 * @LastEditTime : 2020-09-10 16:28:27
 * @Description  : file content
 */
const path = require('path')
const webpackConfig = require('./webpack.config.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

module.exports = merge(webpackConfig, {
  mode: 'production',
//   devtool: 'cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin()//包可视化分析工具
    //  new SpeedMeasurePlugin()//loader时间检测
  ],
  module:{
      rules:[ 
          {
        test: /\.js$/,
        include: path.resolve("src"),
        //   // "thread-loader"
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env']
          }
        }
        
      },]
  }

})