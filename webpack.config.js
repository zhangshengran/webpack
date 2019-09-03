let path = require('path')
let HTMLWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  devServer: {
    port: 3000,
    progress: true,
    contentBase: './build',
    open: true,
  },//开发服务器配置
  // mode: 'production',//配置开发或者生产环境
  mode: 'development',
  entry: './src/index.js',//入口
  output: {            //出口
    filename: 'bundle.[hash:8].js',//生成带哈希的文件名
    path: path.resolve(__dirname, 'build')
  },

  module: {
    rules: [
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader'
      // },
      {
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
        // test 符合此正则规则的文件，运用 loader 去进行处理，除了exclude 中指定的内容
      },
      {
        test: /\.css$/,
        use: [
        
          {
            loader: "style-loader",
            options: {
              insertAt: 'top'

            }
          },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader", // creates style nodes from JS strings
          options: {
            insertAt: 'top'
          }
        },
        {
          loader: "css-loader" // translates CSS into CommonJS
        },
        {
          loader: "less-loader" // compiles Less to CSS
        }]
      },

    ]
  },
  plugins: [
    // new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: true,//移除不必要的双引号
        //  collapseWhitespace:true,//自动折叠空行
      },
      hash: true,
    }),
    new CleanWebpackPlugin(),
  ],
}


