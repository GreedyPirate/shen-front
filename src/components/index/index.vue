<template>
  <div class="index">
    <m-header></m-header>
    <m-aside></m-aside>
    <div class="content">
      <transition name="main" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    import MHeader from 'components/m-header/m-header'
    import MAside from 'components/m-aside/m-aside'
    import ElContainer from "../../../node_modules/element-ui/packages/container/src/main.vue";
    import ElHeader from "../../../node_modules/element-ui/packages/header/src/main.vue";
    import ElAside from "../../../node_modules/element-ui/packages/aside/src/main.vue";
    import ElMain from "../../../node_modules/element-ui/packages/main/src/main.vue";

    export default {
      components: {
        ElMain,
        ElAside,
        ElHeader,
        ElContainer,
        MHeader,
        MAside
      },
      data() {
        return {

        }
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .index
    height 100%
    .content
      position absolute
      top 60px
      left 250px
      right 0
      bottom 0
      padding 40px
      box-sizing border-box
      overflow-y scroll
      .main-enter-active,.main-leave-active
        transition opacity .5s
      .main-enter,.main-leave
        opacity 0

</style>
