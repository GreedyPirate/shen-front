<template>
  <div class="detail">
    <div class="block">
      <form-title name="企业基本信息"></form-title>
      <el-row :gutter="20">
        <el-col :span="6">
          <div>
            <div class="key">注册类型：</div>
            <div class="value">{{detail.regType}}</div>
          </div>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple">企业名称(中文):{{detail.enterpriseZh}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">企业名称(英文):{{detail.enterpriseEn}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">注册地址(中文):{{detail.registZh}}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple">注册地址(英文): {{detail.registEn}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">注册地址邮编:{{detail.registPostcode}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">办公邮政编码:{{detail.workPostcode}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">办公地址(中文):{{detail.workplaceZh}}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple">办公地址(英文): {{detail.workplaceEn}}</div></el-col>
      </el-row>
    </div>
    <div class="block">
      <form-title name="行政区域信息"></form-title>
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
      getDetail({
        id: this.id
      }).then((res) => {
        this.detail = res;
        debugger
      })
    },
    methods: {
      onSubmit() {

      },
      onCancel(){}
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .detail
    color #000
    .blick
      div
        display inline-block
        &.key
          width 90px
          color #99a9bf
        &.values
          line-height 40px
          font-size 14px
</style>
