import Vue from 'vue'

export const validForm = {
  //手机号
  phone: (rule, value, callback) => {
    if(rule.required){
      if(!value){
        callback(new Error('请输入手机号码'));
      }else if(!validForm.pattresult["phone"].test(value)){
        callback(new Error('请输入有效的手机号码'));
      }else{
        callback();
      }
    }
  },
  //电话号码
  tel: (rule, value, callback) => {
    if(!rule.required && value == "") {
      callback();
      return;
    } else {
      if(!validForm.pattresult["tel"].test(value)) {
        callback(new Error('请输入有效的电话号码'));
      } else {
        callback();
      }
    }

  },
  //邮箱
  email: (rule, value, callback) => {
    if(!rule.required && value == "") {
      callback();
      return;
    } else {
      if(!validForm.pattresult["email"].test(value)) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    }

  },
  //汉字
  chinese: (rule, value, callback) => {
    if(!rule.required && value == "") {
      callback();
      return;
    } else {
      if(!validForm.pattresult["chinese"].test(value)) {
        callback(new Error('只能输入汉字'));
      } else {
        callback();
      }
    }

  },
  //数组
  array: (rule, value, callback) => {
    if(!rule.required && value == "") {
      callback();
      return;
    } else {
      if(!validForm.pattresult["chinese"] instanceof Array) {
        callback(new Error('不能为空哦'));
      } else {
        callback();
      }
    }

  },
  //数字
  num: (rule, value, callback) => {
    if(!rule.required && value == "") {
      callback();
      return;
    } else {
      if(!validForm.pattresult["num"].test(value)) {
        callback(new Error('只能输入数字'));
      } else {
        callback();
      }
    }
  },
  //年月日 yyyy-mm-dd格式
  ymd: (rule, value, callback) => {
    if(rule.type == typeof value) {
      if(rule.required) { //是必输的
        if(!validForm.pattresult["ymd"].test(value)) {
          callback(new Error('请输入有效的日期'));
        } else {
          callback();
        };
      } else {
        callback();
      };
    } else {
      callback();
    };
  },
  // 密码
  password:(rule, value, callback) =>{
    if(rule.required){
      if(!value){
        callback(new Error('请输入密码'));
      }else if(value.length < 6){
        callback(new Error('密码长度不能小于6位'));
      }else{
        callback();
      }
    }
  },
  // 邮编
  postCode:(rule, value, callback) =>{
  if(rule.required){
    if(!value){
      callback(new Error('请输入邮编号码'));
    }else if(!validForm.pattresult["postCode"].test(value)){
      callback(new Error('邮编号码长度为6位数字'));
    }else{
      callback();
    }
  }
},
  pattresult: {
    "email": /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    "chinese": /^[\u4e00-\u9fa5]{0,}$/,
    "phone": /^1[34578]\d{9}$/,
    "tel": /^([0-9]{3,4}-)?[0-9]{7,8}$/,
    "ymd": /^\d{4}\-\d{2}\-\d{2}$/,
    "num": /^[0-9]*$/,
    'postCode': /\d{6}/
  }
};
