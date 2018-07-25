<template>
  <div class="page">
    <div class="error">
      <h1 class="header">{{errorCode}}</h1>
      <div class="content">
        <p>
          <strong>{{getText}}</strong>
        </p>
        <p></p>
        <hr>
        <p>
          <a :href="indexUrl">返回首页</a>
          <span>或者</span>
          <a>返回上页</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      /*props:{
        errorCode:{
          type:Number,
          default:404
        }
      },*/
      data() {
        return {
          text: '',
          errorCode:0,
          indexUrl:''
        }
      },
      created(){
        this.errorCode = this.$route.query.code;
        this.indexUrl = window.location.origin;
        debugger
      },
      computed:{
        getText() {
          switch (this.errorCode){
            case 401:
              return '您没有权限访问';
            case 404:
              return '你似乎来到了没有知识存在的荒原...';
              break;
            case 500:
              return '服务器繁忙，请稍后再试';
              break;
            default:
              return '服务器繁忙，请稍后再试';
          }
        }
      }
    }
</script>
<style scoped>
  body {
    margin: 0;
    color: #222;
    font: 16px/1.7 'Helvetica Neue', Helvetica, Arial, Sans-serif;
    background: #eff2f5;
  }

  img {
    border: none;
  }

  a {
    text-decoration: none;
    color: #105cb6;
  }

  a:hover {
    text-decoration: underline;
  }

  .error {
    padding-top: 169px;
    margin: auto 0;
    width: 404px;
    background-color: #fafafa;
  }

  .error-wide {
    width: 500px;
  }

  @media (max-width: 500px) {
    .error {
      width: 98%;
    }
  }

  .error .header {
    overflow: hidden;
    font-size: 1.8em;
    line-height: 1.2;
    margin: 0 0 .33em .33em;
  }

  .error .header img {
    vertical-align: text-bottom;
  }

  .error .header .mute {
    color: #999;
    font-size: .5em;
  }

  .error hr {
    margin: 1.3em 0;
  }

  .error p {
    margin: 0 0 1.7em;
    color: #999;
  }

  .error p:last-child {
    margin-bottom: 0;
  }

  .error strong {
    font-size: 1.1em;
    color: #000;
  }

  .error .content {
    padding: 2em 1.25em;
    border: 1px solid #babbbc;
    border-radius: 5px;
    background: #f7f7f7;
    text-align: center;
  }

  .error .content .single {
    margin: 3em 0;
    font-size: 1.1em;
    color: #666;
  }

</style>
