<template>
  <div class="block-title">
    <fieldset class="form-name">
      <legend>{{name}}</legend>
    </fieldset>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      props:{
        name:{
          type:String
        }
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .form-name
    margin 30px 0 20px 0
    padding-left: 40px;
    border-width 1px 0 0
    border-color #e6e6e6
    border-style solid
    legend
      padding 0 10px
      color #000
      font-size 20px
      font-weight 300
</style>
