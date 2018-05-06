<template>
  <div class="password">
    <div class="inner">
      <h6>修改密码</h6>
    </div>
    <i class="el-icon-close close-x" @click="onCancle"></i>
    <el-form ref="modify" :model="modify" :rules="rules" label-width="80px" label-position="left">
      <el-form-item>
        <el-form-item prop="old" class="item" label="当前密码">
          <el-input type="password" v-model="modify.old">
          </el-input>
        </el-form-item>
        <el-form-item prop="newp" class="item" label="新密码">
          <el-input type="password" v-model="modify.newp">
          </el-input>
        </el-form-item>
        <el-form-item prop="confirm" class="item" label="确认密码">
          <el-input type="password" v-model="modify.confirm">
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

    export default {
      components: {
        ElFormItem,
        ElForm
      },
      data() {
        return {
          modify: {
            old: '',
            newp: '',
            confirm: ''
          },
          rules: {
            old:[{ required: true, message: 'old', trigger: 'blur' }],
            newp:[{ required: true, message: 'newp', trigger: 'blur' },
              { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }],
            confirm:[{ required: true, trigger: 'blur',validator:this.confirm },
              { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
          }
        }
      },
      methods:{
        confirm(rule, value, callback) {
          if(rule.required){
            if(!value){
              callback(new Error('请再次输入新密码'));
            }else if(this.modify.newp !== this.modify.confirm){
              callback(new Error('两次输入的密码不一致'));
            }else{
              callback();
            }
          }
          return this.modify.newp === this.modify.confirm;
        },
        onSubmit() {
          this.$refs.modify.validate((valid) => {
            this.$emit('submit', this.modify);
          });
        },
        onCancle() {
          this.$emit('close', false);
        }
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .password
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
