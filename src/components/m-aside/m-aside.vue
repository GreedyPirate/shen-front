<template>
  <div class="sidebar">
    <el-menu default-active="profile" class="el-menu-vertical-demo"
             unique-opened router
             background-color="#333744"
             text-color="#fff"
             active-text-color="#ffd04b">
      <template v-for="item in menu">
        <template v-if="item.subs">
          <el-submenu :index="item.index">
            <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
              {{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script type="text/ecmascript-6">
  import ElMenu from "../../../node_modules/element-ui/packages/menu/src/menu.vue";
  import {loadSideMenu} from 'api/invokeInterface'

  export default {
    components: {
      ElMenu
    },
    data() {
      return {
        menu: []
      }
    },
    created(){
      loadSideMenu().then((res) => {
        this.menu = res.data;
//        console.log(this.menu)
      })
    },
    methods:{
    }
  }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
  .sidebar
    position absolute
    top 60px
    left 0
    width 250px
    height calc(100% - 60px)
    ul
      height 100%
</style>
