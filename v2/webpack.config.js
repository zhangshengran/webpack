/*
 * @Author       : zhangshengran
 * @Date         : 2020-09-02 14:53:56
 * @LastEditors  : zhangshengran
 * @LastEditTime : 2020-09-02 15:37:23
 * @Description  : file content
 */
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
    module.exports =  {
        mode: 'development',
        entry: {
          main:('./src/index.js')
        },
        output: {
          path:('./dist'),
          filename: '[name].[hash:8].js',
          chunkFilename: '[name].[hash:8].js'
        },
        module: {
       
        },
        plugins: [
            new HtmlWebpackPlugin({template: './src/index.html'})
          ]
      }
