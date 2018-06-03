<template>
  <div class="detail">
     <el-form v-model="formData" label-position="left" inline class="demo-table-expand">
      <div class="block">
        <form-title name="企业基本信息"></form-title>
        <el-form-item label="注册类型：">
          <span>{{ detail.regType }}</span>
        </el-form-item>
        <el-form-item label="企业名称(中文):">
          <span>{{ detail.enterpriseZh }}</span>
        </el-form-item>
        <el-form-item label="企业名称(英文):">
          <span>{{ detail.enterpriseEn }}</span>
        </el-form-item>
        <el-form-item label="注册地址(中文):">
          <span>{{ detail.registZh }}</span>
        </el-form-item>
        <el-form-item label="注册地址(英文):">
          <span>{{ detail.registEn }}</span>
        </el-form-item>
        <el-form-item label="注册地址邮编:">
          <span>{{ detail.registPostcode }}</span>
        </el-form-item>
        <el-form-item label="办公邮政编码::">
          <span>{{ detail.workPostcode }}</span>
        </el-form-item>
        <el-form-item label="办公地址(中文):">
          <span>{{ detail.registPostcode }}</span>
        </el-form-item>
        <el-form-item label="办公地址(中文):">
          <span>{{ detail.workplaceZh }}</span>
        </el-form-item>
        <el-form-item label="办公地址(英文):">
          <span>{{ detail.workplaceEn }}</span>
        </el-form-item>
      </div>
      <div class="block">
        <form-title name="行政区域信息"></form-title>
        <el-form-item label="行政区域：">
            <span>{{ detail.provice }} - {{ detail.city }} - {{ detail.town }}</span>
          </el-form-item>
          <el-form-item label="行政区域代码：">
            <span>{{ detail.adminareaCode }}</span>
          </el-form-item>
          <el-form-item label="营业执照注册号：">
            <span>{{ detail.licenseCode }}</span>
          </el-form-item>
          <el-form-item label="企业类型：">
            <span>{{ detail.enterpriseType }}</span>
          </el-form-item>
          <el-form-item label="货币种类：">
            <span>{{ detail.currency }}</span>
          </el-form-item>
          <el-form-item label="注册资金：">
            <span>{{ detail.capital }}</span>
          </el-form-item>
          <el-form-item label="经济类型：">
            <span>{{ detail.economicType }}</span>
          </el-form-item>
      </div>
      <div class="block">
        <form-title name="联系人信息"></form-title>
        <el-form-item label="法定代表人：">
            <span>{{ detail.leader }}</span>
          </el-form-item>
          <el-form-item label="手机号码：">
            <span>{{ detail.leaderTele }}</span>
          </el-form-item>
          <el-form-item label="联系人：">
            <span>{{ detail.contact }}</span>
          </el-form-item>
          <el-form-item label="手机号码：">
            <span>{{ detail.contactTele }}</span>
          </el-form-item>
          <el-form-item label="电子邮箱地址：">
            <span>{{ detail.contactEmail }}</span>
          </el-form-item>
          <el-form-item label="企业网站：">
            <span>{{ detail.website }}</span>
          </el-form-item>
          <el-form-item label="产品信息描述：">
            <span>{{ detail.productInfo }}</span>
          </el-form-item>
      </div>
      <div class="block">
        <form-title name="发票信息"></form-title>
        <el-form-item label="发票抬头：">
            <span>{{ detail.invoiceTitle }}</span>
          </el-form-item>
          <el-form-item label="纳税人识别号：">
            <span>{{ detail.taxNumber }}</span>
          </el-form-item>
          <el-form-item label="税务注册地址：">
            <span>{{ detail.taxAddr }}</span>
          </el-form-item>
          <el-form-item label="开户行：">
            <span>{{ detail.openBank }}</span>
          </el-form-item>
      </div>
      <div class="form-cmp">
        <el-form-item class="item" prop="memo">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入审批意见"
            v-model="formData.memo">
          </el-input>
        </el-form-item>
        <el-form-item class="item" prop="pass">
          <el-radio v-model="formData.pass" name="pass" label="2">通过</el-radio>
          <el-radio v-model="formData.pass" name="pass" label="3">不通过</el-radio>
        </el-form-item>
      </div>
      <div class="btns">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">审批</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import FormTitle from 'common/vue/title'
  import {getDetail} from 'api/invokeInterface'
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form.vue";
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";

  export default {
    props: {
      id: {
        type: Number
      },
      name:{
        type: String
      }
    },
    components: {
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
        console.log(res);
      })
    },
    methods: {
      onSubmit() {
        this.formData['id'] = this.id;
        this.formData['name'] = this.name;
        this.$emit('approve',this.formData);
      },
      onCancel(){
        this.$emit('cancel');
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .detail
    color #000
    .block
      font-size 0

  .el-form-item
    margin-bottom 0
    width 48%
    label

      width 110px
      color #99a9bf

  .form-cmp
    margin-top 20px
    text-align left
    .item
      width 50%
      .el-form-item__content
        width 50%
  .btns
    text-align center
</style>
