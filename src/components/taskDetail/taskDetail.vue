<template>
  <div class="detail">
    <div class="block">
      <form-title name="企业基本信息"></form-title>
        
    </div>
    <el-form v-model="formData">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-form-item prop="memo">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 15}"
              :rows="10"
              placeholder="请输入审批意见"
              v-model="formData.memo">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="pass">
        <el-radio v-model="formData.pass" name="pass" label="1">通过</el-radio>
        <el-radio v-model="formData.pass" name="pass" label="2">不通过</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">审批</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>


  </div>
</template>
<script type="text/ecmascript-6">
  import FormTitle from 'common/vue/title'
  import {getDetail} from 'api/invokeInterface'
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form.vue";
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    props: {
      id: {
        type: Number
      }
    },
    components: {
      ElRow,
      ElFormItem,
      ElForm,
      FormTitle
    },
    data() {
      return {
        detail: {},
        formData: {
          memo: '',
          pass: 0
        }
      }
    },
    created() {
      console.log(this.id);
      getDetail({
        id: this.id
      }).then((res) => {
        this.detail = res;
      })
    },
    methods: {
      onSubmit() {

      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .detail
    color #000
</style>
