<template>
  <div class="task">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-setting"></i>办理记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="type" label="注册类型" sortable min-width="150">
        </el-table-column>
        <el-table-column prop="name" label="企业名称" sortable min-width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址" sortable min-width="150">
        </el-table-column>
        <el-table-column prop="money" label="注册资金" sortable min-width="150">
        </el-table-column>
        <el-table-column prop="contact" label="联系人" sortable min-width="150">
        </el-table-column>
        <el-table-column prop="tel" label="电话" sortable width="150">
        </el-table-column>
        <el-table-column prop="status" label="进度" sortable width="150">
        </el-table-column>


        <el-table-column label="操作" min-width="180">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-dropdown size="mini" @command="handleCommand">
              <el-button type="primary" size="small">
                下载<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="excel">excel</el-dropdown-item>
                <el-dropdown-item command="pdf">pdf</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getUserHistory, deleteRegister} from 'api/invokeInterface'
  import Qs from 'qs'
  import store from 'store'
  export default {
    data() {
      return {
        select_cate: '',
        select_word: '',
        tableData: [

        ],
        delVisible: false,
        deleteId: -1
      }
    },
    created(){
      getUserHistory(Qs.stringify({
        id:store.get('user').id
      })).then((res) => {
        this._normalizeTableData(res)
      })
    },
    methods: {
      _normalizeTableData(data){
        data.forEach((item, index) => {
          item.status = item.status === 1?'处理中':'已通过';
        })
        this.tableData = data;
      },
      handleDelAll() {

      },
      handleSearch() {

      },
      handleEdit(index, row) {
        this.$router.push({
          path: 'apply',
          name: 'apply',
          query: {
            from: 'edit'
          }
        })
      },
      handleDelete(index, row) {
        this.deleteId = row.id;
        this.delVisible = true;
      },
      handleCurrentChange() {

      },
      handleCommand(command) {
        let host = window.location.origin;
        window.location.href = `${host}/busi/${command}?uid=${store.get('user').id}`;
      },
      deleteRow(){
        debugger
        deleteRegister(Qs.stringify({
          id : this.deleteId
        })).then((res) => {
          if(res === true){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.init();
          }
        })
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
    width 120px

  .handle-input
    width 300px
    display inline-block

  .del-dialog-cnt
    font-size 16px
    text-align center

</style>

