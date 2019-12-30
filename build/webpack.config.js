const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const argv = require('yargs').argv;
// const devMode = process.argv.indexOf('--mode=production') === -1;
const mode = argv.mode;
let devMode = mode == "development" ? true : false;
module.exports = {
  // mode:mode,
  entry: {
    main: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [
          // 'cache-loader', 'thread-loader',
          {
            loader: 'vue-loader',
            // include: [
            //   path.resolve(__dirname, "src")
            // ],
            // exclude: /node_modules/,
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }]
      },
      {
        test: /\.js$/,
        use: 'happypack/loader?id=js',
      },
      {
        test: /\.css$/,
        // use: 'happypack/loader?id=css',
        use: [{
          loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          options: {
            publicPath: "../dist/css/",
            hmr: devMode
          }
        }, 'css-loader']
      },
      {
        test: /\.less$/,
        use: 'happypack/loader?id=less',
        // use: [{
        //   loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
        //   options: {
        //     publicPath: "../dist/css/",
        //     hmr: devMode
        //   }
        // }, 'css-loader', 'less-loader']
      },
      {
        test: /\.(jep?g|png|gif)$/,
        use: {
          loader: 'url-loader',
          // include:[path.resolve(__dirname,'src')],
          // exclude:/node_modules/,
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'media/[name].[hash:8].[ext]'
              }
            }
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'media/[name].[hash:8].[ext]'
              }
            }
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      ' @': path.resolve(__dirname, '../src'),
      'assets': path.resolve('src/assets'),
    },
    extensions: ['*', '.js', '.json', '.vue']
  },
  plugins: [
    new HappyPack({
      id: 'js',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env']
            ],
            cacheDirectory: true,
          }
        }

      ],
      threadPool: happyThreadPool//共享线程池
    }),

    new HappyPack({
      id: 'less',
      threadPool: happyThreadPool,
      loaders: [{
        loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
        options: {
          publicPath: "../dist/css/",
          hmr: devMode
        }
      }, 'css-loader', 'less-loader']

    }),


    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new vueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ]
}