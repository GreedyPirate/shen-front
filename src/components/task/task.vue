<template>
  <div class="task">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-setting"></i>待办理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-tabs v-model="tabValue" type="card" addable editable closable @edit="handleTabsEdit">
      <el-tab-pane
        v-for="item in tabArr"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <span v-if="item.content">{{item.content}}</span>
        <component :is="item.component" :id="detailId" :name="item.name"
                   @open="openTab" @approve="submit" @cancel="close" :count="approveCount"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getTask,approveForm} from 'api/invokeInterface'
  import TaskDetail from 'components/taskDetail/taskDetail'
  import TaskIndex from 'components/taskIndex/taskIndex'
  import Qs from 'qs'


  export default {
    components: {
      TaskDetail,
      TaskIndex
    },
    data() {
      return {
        select_cate: '',
        select_word: '',
        delVisible: false,
        tabValue:'1',
        tabIndex:1,
        tabArr:[{
          title:'首页',
          name:'1',
          component:'TaskIndex'
        }],
        detailId:-1,
        approveCount: 0
      }
    },
    created() {
    },
    methods: {
      openTab(row) {
        let tabName = row.name.substr(0,4)+'..';
        let newTabName = ++this.tabIndex + '';
        this.tabArr.push({
          title: tabName,
          name: newTabName,
          component:'TaskDetail'
        });
        this.tabValue = newTabName;
        this.detailId = row.id;
      },
      handleDelete(index, row) {

      },
      submit(data){
        approveForm(Qs.stringify(data)).then((res) => {
          if(res){
            this.handleTabsEdit(data.name, 'remove');
            this.approveCount++;
          }
        })
      },
      close(){

      },
      handleTabsEdit(targetName, action){
        if (action === 'remove') {
          let tabs = this.tabArr;
          let activeName = this.tabValue;
          //首页不可以关闭
          if(activeName === '1'){
            return
          }
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }

          this.tabValue = '1';
          this.tabArr = tabs.filter(tab => tab.name !== targetName);
        }
      },
      deleteRow() {

      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">

  .el-table .sort-caret
    width 0
    height 0

  .pagination
    text-align right

  .handle-box
    margin-bottom 20px

  .handle-select
    width 150px

  .handle-input
    width 300px
    display inline-block

  .del-dialog-cnt
    font-size 16px
    text-align center

</style>
