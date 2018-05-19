<template>
  <div class="task">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-setting"></i>待办理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-tabs v-model="activeTab" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
       label="首页"
       name="1"
      >
        <div>
          <div class="handle-box">
            <el-select v-model="select_cate" placeholder="筛选注册类型" class="handle-select mr10" size="small">
              <el-option key="1" label="天猫" value="1"></el-option>
              <el-option key="2" label="淘宝" value="2"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10" size="small"></el-input>
            <el-button type="primary" size="small" icon="search" @click="handleSearch">搜索</el-button>
          </div>
          <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="type" label="注册类型" sortable min-width="150">
            </el-table-column>
            <el-table-column prop="name" label="企业名称" sortable min-width="180">
            </el-table-column>
            <el-table-column prop="addr" label="地址" sortable min-width="150">
            </el-table-column>
            <el-table-column prop="money" label="注册资金" sortable min-width="150">
            </el-table-column>
            <el-table-column prop="contact" label="联系人" sortable min-width="150">
            </el-table-column>
            <el-table-column prop="tel" label="电话" sortable width="150">
            </el-table-column>

            <el-table-column label="操作" min-width="180">
              <template slot-scope="scope">
                <el-button size="small" type="primary" @click="approve(scope.$index, scope.row)">审批</el-button>
                <!--<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="tableData.length">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        v-for="(item, index) in tabData"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.closable"
      >
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script type="text/ecmascript-6">
  import {getTask} from 'api/invokeInterface'
  import TaskDetail from 'components/taskDetail/taskDetail'

  export default {
    components:{
      TaskDetail
    },
    data() {
      return {
        select_cate: '',
        select_word: '',
        tableData: [],
        delVisible: false,
        activeTab: '1',
        tabData: [
          {
            title: '第二页',
            name: '2',
            content: '',
            closable: true
          }
        ],
        tabIndex: 2
      }
    },
    created(){
      getTask().then((res) => {
        this.tableData = res.data;
      })
    },
    methods: {
      handleSearch() {

      },
      approve(index, row) {
        this.$router.push({
          path: 'apply',
          name: 'apply',
          query: {
            from:'edit'
          }
        })
        /*let detail = resolve => require(['../taskDetail/taskDetail'], resolve);
        let newTabName = ++this.tabIndex + '';
        this.tabData.push({
          title: row.name.substring(0,3)+' ...',
          name: newTabName,
          content: TaskDetail
        });
        this.activeTab = newTabName;*/
      },
      removeTab(targetName){
        let tabs = this.tabData;
        let activeName = this.activeTab;
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
      },
      handleDelete(index, row) {

      },
      handleCurrentChange() {

      },
      deleteRow(){

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
