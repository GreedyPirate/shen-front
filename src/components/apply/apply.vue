<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-date"></i> 注册</el-breadcrumb-item>
        <el-breadcrumb-item>注册申请</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form-box">
      <el-form ref="register" :model="ruleForm" :rules="rules" size="medium" label-width="120px" label-position="left">
        <form-title name="企业基本信息"></form-title>
        <el-form-item labelWidth="120px" label="注册类型" prop="regType">
          <el-select v-model="ruleForm.regType" placeholder="请选择注册类型">
            <el-option
              v-for="item in archives.regType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-row :gutter="80">
          <el-col span="12">
            <el-form-item label="企业名称(中文)" prop="enterpriseZh">
              <el-input v-model="ruleForm.enterpriseZh" placeholder="请输入企业名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="企业名称(英文)">
              <el-input v-model="ruleForm.enterpriseEn" placeholder="请输入企业名称" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col span="12">
            <el-form-item label="注册地址(中文)" prop="registZh">
              <el-input v-model="ruleForm.registZh" placeholder="请输入注册地址" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="注册地址(英文)">
              <el-input v-model="ruleForm.registEn" placeholder="请输入注册地址" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col span="12">
            <el-form-item label="注册地址邮编)" prop="registPostcode">
              <el-input v-model="ruleForm.registPostcode" placeholder="请输入注册地址邮编" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="办公邮政编码)" prop="workPostcode">
              <el-input v-model="ruleForm.workPostcode" placeholder="请输入办公邮政编码" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col span="12">
            <el-form-item label="办公地址(中文)" prop="workplaceZh">
              <el-input v-model="ruleForm.workplaceZh" placeholder="请输入办公地址" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="办公地址(英文)">
              <el-input v-model="ruleForm.workplaceEn" placeholder="请输入办公地址" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <form-title name="行政区域信息"></form-title>
        <el-row :gutter="40">
          <el-col span="8">
            <el-form-item label="行政区划选择" prop="adminarea">
              <el-cascader
                :options="regionData"
                v-model="ruleForm.adminarea"
                @change="handleAdminareaChange">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="行政区域代码" prop="adminareaCode">
              <el-input v-model="ruleForm.adminareaCode" placeholder="请输入行政区域代码" disabled clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-form-item label="所属分中心" prop="belongCenter">
          <el-radio v-model="ruleForm.belongCenter" label="1">昌平分中心</el-radio>
          <el-radio v-model="ruleForm.belongCenter" label="2">通州分中心</el-radio>
        </el-form-item>-->
        <el-row :gutter="80">
          <el-col span="12">
            <el-form-item label="营业执照注册号" prop="licenseCode">
              <el-input v-model="ruleForm.licenseCode" placeholder="请输入营业执照注册号" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="7">
            <el-form-item labelWidth="120px" label="企业类型" prop="enterpriseType">
              <el-select v-model="ruleForm.enterpriseType" placeholder="请选择企业类型">
                <el-option
                  v-for="item in archives.enterpriseType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="17">
            <el-tag type="danger">收费标准（单个：2600元，集团：3400元，进出口：4200元）</el-tag>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col span="8">
            <el-form-item label="货币种类" prop="currency">
              <el-select v-model="ruleForm.currency" placeholder="请选择货币种类">
                <el-option
                  v-for="item in archives.currency"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="注册资金" prop="capital">
              <el-input v-model.number="ruleForm.capital" placeholder="请输入注册资金" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col span="7">
            <el-form-item label="经济类型">
              <el-select v-model="ruleForm.economicType" placeholder="请选择经济类型">
                <el-option
                  v-for="item in archives.economicType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <form-title name="联系人信息"></form-title>
        <el-row :gutter="40">
          <el-col span="8">
            <el-form-item label="法定代表人" prop="leader">
              <el-input v-model="ruleForm.leader" placeholder="请输入姓名" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="手机" prop="leaderTele">
              <el-input v-model="ruleForm.leaderTele" placeholder="请输入电话" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col span="8">
            <el-form-item label="联系人" prop="contact">
              <el-input v-model="ruleForm.contact" placeholder="请输入姓名" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="手机" prop="contactTele">
              <el-input v-model="ruleForm.contactTele" placeholder="请输入电话" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col span="8">
            <el-form-item label="电子邮件地址" prop="contactEmail">
              <el-input v-model="ruleForm.contactEmail" placeholder="请输入电子邮件地址" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="接收邮件提醒" prop="emailReceive">
              <el-radio v-model="ruleForm.emailReceive" v-for="item in archives.emailable" :key="item.id" :label="item.id">{{item.name}}</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col span="8">
            <el-form-item label="企业网站" prop="website">
              <el-input v-model="ruleForm.website" placeholder="请输入企业网站" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col span="8">
            <el-form-item label="产品信息描述" prop="productInfo">
              <el-input v-model="ruleForm.productInfo" type="textarea" :autosize="{minRows:3, maxRows:5}" placeholder="请输入产品信息描述" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div>
          <form-title name="发票信息"></form-title>
          <el-row :gutter="80">
            <el-col span="12">
              <el-form-item label="发票抬头" prop="invoiceTitle">
                <el-input v-model="ruleForm.invoiceTitle" placeholder="请输入发票抬头" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="纳税人识别号" prop="taxNumber">
                <el-input v-model="ruleForm.taxNumber" placeholder="请输入纳税人识别号" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="80">
            <el-col span="12">
              <el-form-item label="税务注册地址" prop="taxAddr">
                <el-input v-model="ruleForm.taxAddr" placeholder="请输入税务注册地址" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="开户行" prop="openBank">
                <el-input v-model="ruleForm.openBank" placeholder="请输入开户行" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="企业填表时间">
            <el-tag type="info">{{registDate}}</el-tag>
          </el-form-item>
        </div>


        <div class="footer">
          <el-form-item>
            <el-button size="medium" type="primary" @click="onSubmit">提交</el-button>
            <el-button size="medium" @click="reset">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
  import {loadArea} from 'api/invokeInterface'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import FormTitle from 'common/vue/title'
  import {getCurrentDate} from 'common/js/utils'
  import {validForm} from 'common/js/vaildations'
  import {regionData} from 'element-china-area-data'
  import {getArchive,registForm} from 'api/invokeInterface'
  import Qs from 'qs'
  import store from 'store'

  export default {
    components: {
      ElCol,
      ElRow,
      ElInput,
      ElFormItem,
      FormTitle
    },
    data: function () {
      return {
        regionData:regionData,
        ruleForm: {
          regType: '',
          enterpriseZh: '',
          enterpriseEn: '',
          registZh: '',
          registEn: '',
          registPostcode:'',
          workPostcode:'',
          workplaceZh:'',
          workplaceEn:'',

          adminareaCode:'',
          adminarea:'',
          /*belongCenter:'',*/
          licenseCode:'',
          enterpriseType:'',
          currency:'',
          capital:'',
          economicType:'',
          economicTypeCode:'',

          leader:'',
          leaderTele:'',
          contact:'',
          contactTele:'',
          contactEmail:'',
          emailReceive:'',
          website:'',
          productInfo:'',

          invoiceTitle:'',
          taxNumber:'',
          taxAddr:'',
          openBank:'',
        },
        rules: {
          regType: [{required: true, message: '请选择注册类型', trigger: 'change'}],
          enterpriseZh: [{required: true, message: '请输入企业名称', trigger: 'blur'}],
          registZh: [{required: true, message: '请输入注册地名称', trigger: 'blur'}],
          registPostcode: [{required: true, message: '请输入注册地址邮编', trigger: 'blur'}],
          workplaceZh: [{required: true, message: '请输入办公地址', trigger: 'blur'}],
          workPostcode: [{required: true, message: '请输入办公邮政编码', trigger: 'blur'}],

          adminarea: [{required: true, message: '请选择行政区划选择', trigger: 'change'}],
          belongCenter: [{required: true, message: '请选择所属分中心', trigger: 'change'}],
          licenseCode: [{required: true, message: '请输入营业执照注册号', trigger: 'blur'}],
          enterpriseType: [{required: true, message: '请选择企业类型', trigger: 'change'}],
          capital: [{required: true, message: '请输入注册资金', trigger: 'blur'},
                    {type:'number',message:'请输入数字',trigger:'blur'}],
          currency: [{required: true, message: '请选择货币种类', trigger: 'change'}],

          leader: [{required: true, message: '请输入法定代表人', trigger: 'blur'}],
          leaderTele: [{required: true, validator:validForm.phone, trigger: 'blur'}],
          contact: [{required: true, message: '请输入联系人', trigger: 'blur'}],
          contactTele: [{required: true, validator:validForm.phone, trigger: 'blur'}],
          contactEmail:[{type:'email',message:'请输入正确的邮箱地址',trigger:'blur'}],
          website:[{type:'url',message:'请输入正确网站地址',trigger:'blur'}],

          invoiceTitle: [{required: true, message: '请输入发票抬头', trigger: 'blur'}],
          taxNumber: [{required: true, Whitespace:false, message: '请输入纳税人识别号', trigger: 'blur'}],
        },
        archives:{},













        regTypes: [
          {
            'label': '普通',
            'value': 1
          },
          {
            'label': '天猫',
            'value': 2
          },
          {
            'label': '淘宝',
            'value': 3
          },
          {
            'label': '亚马逊',
            'value': 4
          }
        ],
        enterpriseTypes:[
          {
            'label': '单个',
            'value': 1
          },
          {
            'label': '集团',
            'value': 2
          },
          {
            'label': '进出口',
            'value': 3
          }
        ],
        currencies:[
          {
            'label': '人民币',
            'value': 1
          },
          {
            'label': '美元',
            'value': 2
          },
          {
            'label': '英镑',
            'value': 3
          }
        ],
        economicTypes:[
          {
            'label': '内资',
            'value': 1
          },
          {
            'label': '国有全资',
            'value': 2
          },
          {
            'label': '集体全资',
            'value': 3
          }
        ]
      }
    },
    computed:{
      registDate() {
        return getCurrentDate();
      }
    },
    created(){
      this.initData();
      this.ruleForm.contactTele = store.get('user').phoneNumber;
    },
    methods: {
      initData(){
        getArchive().then((res) => {
          if(res.code === 200){
            this.archives = this._normalizeArchive(res.data);
            console.log(this.archives)
          }
        })
      },
      _normalizeArchive(data){
        let obj = {};
        data.forEach((item,index) => {
          obj[item.code] = item.archiveDetails;
        })
        return obj;
      },
      handleAdminareaChange(value) {
        this.ruleForm.adminareaCode = value[2];
      },
      onSubmit() {
        this.$refs.register.validate((valid) => {
          if(valid){
            registForm(Qs.stringify(this.ruleForm)).then((res) => {
              this.$notify({
                title: '成功',
                message: '您已成功提交注册申请，请上传附件',
                type: 'success',
                offset:100
              });
            }).catch((res) => {
              this.$notify({
                title: '错误',
                message: '提交失败',
                type: 'success',
                offset:100
              });
            })
          }
        })

      },
      reset() {
        this.$refs.register.resetFields();
      }
    }
  }
</script>

<style lang="stylus">
  .form-box
    width 100%
    box-sizing border-box
    padding-right 200px

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

  .footer
    text-align center
</style>
