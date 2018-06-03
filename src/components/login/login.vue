<template>
  <div class="login">
    <div class="title">
      {{$t('lang.sysName')}}
    </div>
    <div class="lang">
      <el-dropdown @command="handleLanguage">
        <span class="el-dropdown-link">
          {{$t('lang.switchLang')}}<i class="el-icon-arrow-down switch-label"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh">中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <transition name="el-zoom-in-center">
      <div class="login-wrapper" v-show="isLogin">
        <el-form ref="login" :model="login" :rules="loginRules" label-width="0">
          <el-form-item prop="phoneNumber">
            <el-input v-model="login.phoneNumber" autofocus :placeholder="$t('lang.plsPhone')">
              <template slot="prepend">
                <i class="fa fa-user fa-lg"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="login.password"  :placeholder="$t('lang.plsPassword')" @keyup.enter.native="handleLogin">
              <template slot="prepend">
                <i class="fa fa-lock fa-lg"></i>
              </template>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button class="btn" type="primary" @click="handleLogin" v-t="{path:'lang.signIn'}"></el-button>
          </div>
          <div class="go-regist">
            {{$t('lang.tip')}}   <a @click="toregist">{{$t('lang.signUp')}}</a> <!--/ <a href="">忘记密码?</a>-->
          </div>
        </el-form>
      </div>
    </transition>
    <transition name="el-zoom-in-center">
      <div class="login-wrapper" v-show="!isLogin">
        <el-form ref="regist" :model="regist" :rules="registRules" label-width="0">
          <el-form-item prop="phoneNumber">
            <el-input v-model="regist.phoneNumber" :placeholder="$t('lang.plsPhone')">
              <i slot="prepend" class="fa fa-mobile fa-2x"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="regist.password"  :placeholder="$t('lang.plsPassword')">
              <i slot="prepend" class="fa fa-lock fa-lg"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="vcode" class="vcode">
            <el-input v-model="regist.vcode" :placeholder="$t('lang.plsVcode')" @keyup.enter.native="handleRegist">
            </el-input>
            <el-button @click="sendMessage" :disabled="activeBtn">{{btnName}}</el-button>
          </el-form-item>
          <div class="login-btn">
            <el-button class="btn" type="primary" @click="handleRegist">{{$t('lang.signUp')}}</el-button>
          </div>
          <div class="go-regist">
            {{$t('lang.hadAcc')}} <a @click="toLogin">{{$t('lang.signIn')}}</a>
          </div>
        </el-form>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElInputNumber from "../../../node_modules/element-ui/packages/input-number/src/input-number.vue";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  import {login,regist,sendMsg} from 'api/invokeInterface'
  import {validForm} from 'common/js/vaildations'
  import Qs from 'qs'
  import store from 'store'

    const SEND_TIME = 60;
    export default {
      components: {
        ElButton,
        ElInputNumber,
        ElFormItem},
      data() {
        return {
          login: {
            phoneNumber: '18335166203',
            password: ''
          },
          loginRules:{
            phoneNumber:[{ required: true, message: this.plsPhone, trigger: 'blur' }],
            password:[{ required: true, message: this.plsPassword, trigger: 'blur' }]
          },
          regist:{
            username: '紫夜',
            phoneNumber: '',
            password: '',
            vcode: ''
          },
          registRules:{
            phoneNumber:[{ required: true, trigger: 'blur',validator:validForm.phone}],
            password:[{ required: true, trigger: 'blur',validator:validForm.password }],
            vcode:[{ required: true, message: this.$t('lang.plsVcode'), trigger: 'blur' }],
          },
          isLogin: true,
          count : SEND_TIME, // 多少秒后可重发
          timer : null, // 计时器
          activeBtn : false // 禁止按钮点击
        }
      },
      computed: {
        plsPhone() {
          return this.$t('lang.plsPhone');
        },
        plsPassword(){

          return this.$t('lang.plsPassword');
        },
        btnName() {
          return this.$t('lang.sendMsg');
        }
      },
      methods: {
        handleLogin() {
          this.$refs.login.validate((valid) => {
            if(valid){
              login(Qs.stringify(this.login)).then((res) => {
                debugger
                store.set('user',res);
                this.$router.push('/profile');
              })
            }else{
              this.$message.error(this.$t('lang.submit'));
              return false;
            }
          });
        },
        toregist() {
          this.$refs.regist.clearValidate();
          this.isLogin = false;
        },
        toLogin() {
          this.$refs.login.clearValidate();
          this.isLogin = true;
        },
        handleRegist() {
          let self = this;
          this.$refs.regist.validate((valid) => {
            if(valid){
              regist(Qs.stringify(self.regist)).then((res) => {
                  self.$router.push('/profile');
              });
            }else{
              return false;
            }
          });
        },
        sendMessage() {
          let phone = this.regist.phoneNumber;
          if(!phone){
            this.$message({
              message: this.plsPhone,
              type: 'warning'
            });
          }else if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))){
            this.$message({
              message: '无效的手机号码',
              type: 'warning'
            });
          }else{
            this.activeBtn = true;
            let param = {phoneNumber:phone};
            sendMsg(Qs.stringify(param)).then((res) => {
              console.log(res)
            });
            this.timer = setInterval(() => {
              this.btnName = this.count+'s后重发';
              this.count--;
              if(this.count == 0){
                this.activeBtn = false;
                this.btnName = this.$t('lang.resend');
                this.count = SEND_TIME;
                clearTimeout(this.timer);
              }
            },1000)
          }
        },
        /**
         * 国际化语言切换
         */
        handleLanguage(key) {
          switch(key){
            case 'zh':
              this.$i18n.locale = 'zh-CN';
              break;
            case 'en':
              this.$i18n.locale = 'en-US';
              break;
          }
        }
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .login
    position absolute
    width 100%
    height 100%
    background url("../../assets/login.jpg")
    background-repeat no-repeat
    background-size 100% 100%
    .title
      margin-top 130px
      text-align center
      font-size 30px
      color #FFF
    .lang
      position absolute
      right 50px
      top 30px
      .el-dropdown-link
        color #fff
    .login-wrapper
      position absolute
      top 50%
      left 50%
      transform translateX(-50%) translateY(-50%)
      width 300px
      min-height 210px
      margin-top -100px
      padding 40px
      background-color #FFF
      border-radius 5px
      .vcode
        .el-input
          display inline-block
          width 57%
          margin-right 16px
        button
          width 36%
      .login-btn
        margin-bottom 30px
        .btn
          width 100%
      .go-regist
        text-align center
        font-size 14px
        color #2a333c
        a
          color #62a8ea
          cursor pointer
</style>
