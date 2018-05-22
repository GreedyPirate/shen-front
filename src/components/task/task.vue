<template>
  <div class="task">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-setting"></i>待办理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-tabs v-model="tabValue" type="card" addable editable closable @tab-remove="removeTab">
      <el-tab-pane
        label="首页"
        name="1"
        key="1"
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
        v-for="item in tabArr"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <span v-if="item.content">{{item.content}}</span>
        <component :is="item.component" :id="detailId"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getTask} from 'api/invokeInterface'
  import TaskDetail from 'components/taskDetail/taskDetail'


  export default {
    components: {
      TaskDetail
    },
    data() {
      return {
        select_cate: '',
        select_word: '',
        tableData: [],
        delVisible: false,
        tabValue:'1',
        tabIndex:1,
        tabArr:[],
        detailId:-1
      }
    },
    created() {
      getTask().then((res) => {
        this.tableData = res;
      })
    },
    methods: {
      handleSearch() {

      },
      removeTab(){},
      approve(index, row) {
        let tabName = row.name.substr(0,4);
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
      handleCurrentChange() {

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
