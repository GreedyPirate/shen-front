<template>
  <div class="phoneNumber">
    <div class="inner">
      <h6>修改手机号</h6>
    </div>
    <i class="el-icon-close close-x" @click="onCancle"></i>
    <el-form ref="phoneNumber" :model="form" :rules="rules" label-width="80px">
      <el-form-item>
        <el-form-item prop="phone" class="item" label="手机号">
          <el-input v-model="form.phone">
          </el-input>
        </el-form-item>
        <el-form-item class="bottom">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="onCancle">取消</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form.vue"
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue"
  import {validForm} from "common/js/vaildations"

  export default {
    components: {
      ElFormItem,
      ElForm
    },
    data() {
      return {
        form: {
          phone: ''
        },
        rules: {
          phone:[{ required: true, trigger: 'blur',validator:validForm.phone }]
        }
      }
    },
    methods:{
      onSubmit() {
        this.$refs.phoneNumber.validate((valid) => {
          this.$emit('submit', this.form);
        });
      },
      onCancle() {
        this.$emit('close', false);
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .phoneNumber
    width 550px
    padding 25px
    background-color #fff
    border-radius 5px
    background-color #fff
    padding 25px
    position fixed
    top 50%
    left 50%
    transform translate(-50%,-50%)
    z-index 102
    .inner
      h6
        font-size 18px
        font-weight bold
        padding-bottom 20px
        color #516472
    .close-x
      position absolute
      width 30px
      height 30px
      top 20px
      right 15px
      font-size 20px
      cursor pointer
    .item
      margin-bottom 20px
    .bottom
      text-align center
</style>
