// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueI18n from 'vue-i18n'
import store from 'store'

import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/base.css';
import 'font-awesome/css/font-awesome.min.css'
import 'common/stylus/index.styl'
import { Message } from 'element-ui'


Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

const i18n = {
  locale: 'zh-CN',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': require('./common/i18n/zh'),   // 中文语言包
    'en-US': require('./common/i18n/en')    // 英文语言包
  },
  fallbackLocale: 'zh-CN' //找不到的时候中文优先
}

router.beforeEach((to, from, next) => {
 /* let user = store.get('user');
  if(!user || Object.keys(user).length === 0){
    next('/');
  }else{
    next();
  }*/
 next();
});

axios.interceptors.request.use(config=> {
  return config;
}, err=> {
  Message.error({message: '请求超时!'});
  return Promise.resolve(err);
})
axios.interceptors.response.use(response => {
  console.log(response)

  let data = response.data;
  if(data && data.code !== 200){
    Message.error(data.msg);
    return;
  }else if(data && data.code === 401){
    Message.error('登录状态过期，请重新登录')
  }
  return Promise.resolve(data);
}, error => {
  Message.error('服务器繁忙,请稍后重试');
  return Promise.reject(error);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
