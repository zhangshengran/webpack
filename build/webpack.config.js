const path = require('path')
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HappyPack = require('happypack')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const argv = require('yargs').argv;
const mode = argv.mode;
let devMode = mode == "development" ? true : false;
module.exports = {
  mode: mode,
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
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',

            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }],
        exclude: /node_modules/,
        include: [path.resolve('src')]
      },
      {
        test: /\.js$/,
        use: 'happypack/loader?id=js',
      },
      {
        test: /\.css$/,
        use: [{
          loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          options: {
            publicPath: "../dist/css/",
            hmr: devMode
          }
        }, 'css-loader']
      },
      {
        //  test: /(\.css|\.less)$/,
        test: /less$/,
        // test: /\.(le|c)ss$/,
        use: 'happypack/loader?id=less',

      },
      {
        test: /\.(jep?g|png|gif)$/,
        use: {
          loader: 'url-loader',
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
      'assets': path.resolve(__dirname, '../src/assets'),
    },
    extensions: ['*', '.js', '.json', '.vue']
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor-manifest.json')
    }),
    new CopyWebpackPlugin([ // 拷贝生成的文件到dist目录 这样每次不必手动去cv
      { from: 'build/static', to: 'static' }
    ]),
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
          },
          exclude: /node_modules/,
          include: [path.resolve('src')]
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
    }),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false,
      width: 100
    }),
  ]
}