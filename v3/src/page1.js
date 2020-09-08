/*
 * @Author       : zhangshengran
 * @Date         : 2020-09-02 14:46:47
 * @LastEditors  : zhangshengran
 * @LastEditTime : 2020-09-08 15:39:53
 * @Description  : file content
 */
import a from './module1'
import Vue from 'vue'
import vuex from 'vuex'
// import './module2'
// import './module3'
console.log(a)
console.log(2222222222)
import(/* webpackChunkName: "module2.js" */"./module2").then(common => {
    console.log(common);
  })