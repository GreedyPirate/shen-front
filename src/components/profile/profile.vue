<template>
  <div class="profile">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-setting"></i>个人中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <form-title name="基本信息"></form-title>
    <div class="top-area">
      <div class="base-info">
        <div class="avatar">
          <img :src="cropImg" width="120px" height="120px">
        </div>
        <div class="info">
          <p>
            <span>登录账号：</span><span>{{info.phoneNumber}}</span>
          </p>
          <p>
            <span>昵称：</span><span class="warn">{{info.username}}</span>
          </p>
          <p>
            <span>账号ID：</span><span>{{info.id}}</span>
          </p>
          <p>
            <span>邮箱：</span><span>{{info.email}}</span>
          </p>
          <p v-if="info.createTime">
            <span>注册时间：</span><span>{{info.createTime}}</span>
          </p>
        </div>
      </div>
      <div class="m-text">
        <a class="aupload">修改头像<input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/></a>
        <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
          <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage"
                       style="width:100%;height:300px;"></vue-cropper>
          <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelCrop">取 消</el-button>
                    <el-button type="primary" @click="uploadAvatar">确 定</el-button>
                </span>
        </el-dialog>
      </div>
    </div>
    <div class="middle-area">
      <ul>
        <li class="item">
          <div class="name">
            <b>登录密码</b>
          </div>
          <div class="desc">
            <span>
              安全性高的密码可以使帐号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码。
            </span>
          </div>
          <div class="op">
            <a @click="modifyPwd">修改</a>
          </div>
        </li>
        <li class="item">
          <div class="name">
            <b>手机绑定</b>
          </div>
          <div class="desc">
            <span>
              您已绑定了手机<span class="warn">{{info.phoneNumber}}</span> [您的手机号可以直接用于登录、找回密码等]
            </span>
          </div>
          <div class="op">
            <a @click="modifyPhone">修改</a>
          </div>
        </li>
        <li class="item">
          <div class="name">
            <b>邮箱</b>
          </div>
          <div class="desc">
            <span>
              邮箱绑定后可用来接收任务办理进度的通知。
            </span>
          </div>
          <div class="op">
            <a @click="modifyEmail">{{info.email ? '修改' : '设置'}}</a>
          </div>
        </li>
      </ul>
    </div>
    <page-mask v-show="showMask"></page-mask>
    <password v-if="showPassword" @close="closePwd" @submit="submitPwd"></password>
    <email v-if="showEmail" @close="closeEmail" @submit="submitEmail"></email>
    <cell-phone v-if="showPhone" @close="closePhone" @submit="submitPhone"></cell-phone>
  </div>
</template>
<script type="text/ecmascript-6">
  import FormTitle from 'common/vue/title'
  import PageMask from 'common/vue/mask'
  import Password from 'components/password/password'
  import Email from 'components/email/email'
  import CellPhone from 'components/cellPhone/cellPhone'
  import VueCropper from 'vue-cropperjs';
  import {getUserInfo, changePwd, changeEmail, uploadAvatarBase64, changePhone} from 'api/invokeInterface'
  import Qs from 'qs'
  import store from 'store'
  import avatar from '@/assets/avatar.jpg'

  export default {
    data() {
      return {
        info: {},
        showMask: false,
        showPassword: false,
        showEmail: false,
        showPhone: false,
        param: {},

        defaultSrc: './static/img/img.jpg',
        fileList: [],
        imgSrc: '',
        cropImg: avatar,
        dialogVisible: false,
      }
    },
    components: {
      FormTitle,
      PageMask,
      Password,
      Email,
      CellPhone,
      VueCropper
    },
    created() {
      let user = store.get('user');
      getUserInfo({id: user.id}).then((res) => {
        this.info = res;
        if(res.avatar){
          this.cropImg = res.avatar;
        }
      })
      this.param['id'] = user.id;
    },
    computed: {
      getAvatar() {
        return this.info.avatar ? this.info.avatar : avatar;
      },
      uploadUrl() {
        let host = window.location.origin
        return `${host}/user/avatar`
      }
    },
    methods: {
      modifyPwd() {
        this.showMask = true;
        this.showPassword = true;
      },
      modifyEmail() {
        this.showMask = true;
        this.showEmail = true;
      },
      modifyPhone() {
        this.showMask = true;
        this.showPhone = true;
      },
      closePwd() {
        this.showMask = false;
        this.showPassword = false;
      },
      closeEmail() {
        this.showMask = false;
        this.showEmail = false;
      },
      closePhone() {
        this.showMask = false;
        this.showPhone = false;
      },
      submitPwd(data) {
        changePwd(Qs.stringify(data)).then((res) => {
          if (res === true) {
            this.$message({
              message: '修改密码成功',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push('/');
            }, 2000);
          } else {
            this.$message.error('当前密码错误');
          }
        })
      },
      submitEmail(data) {
        data['id'] = store.get('user').id;
        changeEmail(Qs.stringify(data)).then((res) => {
          if (res === true) {
            this.$message({
              message: '修改邮箱成功',
              type: 'success'
            });
            this.showMask = false;
            this.showEmail = false;
            this.info.email = data.email;
          } else {
            // TODO
          }
        })
      },
      submitPhone(data) {
        data['id'] = store.get('user').id;
        changePhone(Qs.stringify(data)).then((res) => {
          if (res === true) {
            this.$message({
              message: '修改手机号成功',
              type: 'success'
            });
            this.showMask = false;
            this.showPhone = false;
            this.info.phoneNumber = data.phone.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2');
          } else {
            // TODO
          }
        })
      },
      setImage(e) {
        const file = e.target.files[0];
        if (!file.type.includes('image/')) {
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          this.dialogVisible = true;
          this.imgSrc = event.target.result;
          this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      },
      cropImage() {
        this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      },
      cancelCrop() {
        this.dialogVisible = false;
        this.cropImg = avatar;
      },
      imageuploaded(res) {
        console.log(res)
      },
      handleError() {
        this.$notify.error({
          title: '上传失败',
          message: '上传头像失败'
        });
      },
      uploadAvatar() {
        uploadAvatarBase64(Qs.stringify({
          cropImg: this.cropImg,
          id: store.get('user').id
        })).then((res) => {
          this.dialogVisible = false;
          //this.$router.go(0);
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .top-area
    padding-bottom 20px
    border-bottom 1px solid #DDD
    .base-info
      font-size 0px
      .avatar
        display inline-block
        margin-right 28px
        img
          border-radius 8px
      .info
        display inline-block
        padding-top 20px
        vertical-align top
        font-size 14px
        color #333
        p
          margin-bottom 10px
    .m-text
      margin-top 14px
      width 120px
      text-align center
      font-size 12px
      .aupload
        display inline-block
        position relative
        background-color #fff
        color #06C
        font-size 14px
        border-radius 4px
        box-sizing border-box
        .crop-input
          position absolute
          width 100px
          height 40px
          left 0
          top 0
          opacity 0
          cursor pointer

  .middle-area
    font-size 12px
    color #333
    .item
      padding 33px
      border-top 1px solid #e1e6eb
      div
        display inline-block
        float left
      .name
        width 140px
        b
          font-weight bold
      .desc
        width 75%

</style>
