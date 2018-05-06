<template>
  <div class="container clearfix">
    <div class="left">
      企业信息登记
    </div>
    <div class="right ">
      <el-input v-model="searchText" class="search"
                size="mini" placeholder="请输入你要搜索的内容 ..."
                :maxlength="15" clearable
                suffix-icon="el-icon-search"></el-input>
      <div class="user-info">
        <div class="avatar"></div>
        <span class="name">{{username}}</span>
        <el-dropdown @command="handleMore">
          <i class="more el-icon-caret-bottom"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="mine">个人信息</el-dropdown-item>
            <el-dropdown-item command="modify">修改密码</el-dropdown-item>
            <el-dropdown-item command="handleFullScreen">全屏</el-dropdown-item>
            <el-dropdown-item command="lock">锁屏</el-dropdown-item>
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
  import store from 'store'

  export default {
    components: {
      ElInput
    },
    data() {
      return {
        searchText: '',
        username : store.get('user').username,
        fullscreen:false
      }
    },
    methods:{
      handleMore(key) {
        switch (key){
          case 'mine':
            break;
          case 'modify':
            break;
          case 'exit':
            this.exit();
            break;
          case 'lock':
            break;
        }
      },
      exit(){
        this.$router.push('/');
      },
      handleFullScreen(){
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .container
    position: fixed;
    width 100%
    height 60px
    z-index 50
    background-color #373d41
    .left
      float left
      width 250px
      height 100%
      line-height 60px
      text-align center
      font-size 22px
      color #FFF
    .right
      float right
      height 100%
      margin-right 30px
      .search
        width 200px
        margin-top 16px
      .user-info
        position relative
        display inline-block
        padding 0 20px
        height 100%
        font-size 0
        .avatar
          position relative
          top 10px
          display inline-block
          width 30px
          height 30px
          margin-right 5px
          background-image url("avatar.jpg")
          background-size 30px 30px
          background-repeat no-repeat
          border-radius 50%
        .name
          font-size 14px
          color #c2c2c2
        .more
          margin-left 5px
          color #FFF
          font-size 16px
</style>
