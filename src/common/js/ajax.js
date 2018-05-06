import axios from 'axios'
import Vue from 'vue'

/**
 * 使用axios发送ajax请求
 * 如果传一个string参数，默认是get请求，无参数
 * 如果传两个参数, 默认请求是post，如果是其它的，写在第三个参数里
 * @param url
 * @param data
 * @param method
 * @returns {Promise.<TResult>}
 */
export default function ajaxRequest(url, data, method) {
  // 判断一下只传两个参数时，data和method的默认值
  if(arguments.length === 2){ //url,data
    if(arguments[1].indexOf('=') > -1){
      data = arguments[1];
      method = 'post';
    }else if(typeof arguments[1] === 'string'){ //url,method
      method = arguments[1];
      data = '';
    }
  }
  //一个参数默认走get请求
  else if(arguments.length === 1 && typeof arguments[0] === 'string'){
    method = 'get';
    data = {};
  }
  // get请求要把参数写在params里
  else if(arguments.length === 3 && arguments[2] === 'get'){
    return axios.get(url,{
      params:data
    }).then((res) => {
      return Promise.resolve(res.data);
    }).catch((err) => {

    })
  }
  //axios别名发请求
  return axios({
    "url": url,
    "method": method,
    "data":data
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((err) => {
    //this.$router.push('/error')
    //return Promise.reject(err.data);
  })
  ;
}

