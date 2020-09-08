/*
 * @Author       : zhangshengran
 * @Date         : 2020-09-02 14:53:56
 * @LastEditors  : zhangshengran
 * @LastEditTime : 2020-09-08 15:40:16
 * @Description  : file content
 */
    module.exports =  {
        mode: 'development',
        entry: {
          page1: "./src/page1", 
          // page2: "./src/page2", 
          // page3: "./src/page3"  
        },
        
        optimization: {
          splitChunks: {
            cacheGroups: {
              vendors: {
                name: `chunk-vendors`,
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
    
      }
