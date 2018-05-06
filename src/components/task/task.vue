<template>
  <div class="task">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-setting"></i>待办理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <div class="handle-box">
        <el-button type="primary" size="small" icon="delete" class="handle-del mr10" @click="handleDelAll">批量删除
        </el-button>
        <el-select v-model="select_cate" placeholder="筛选注册类型" class="handle-select mr10" size="small">
          <el-option key="1" label="天猫" value="1"></el-option>
          <el-option key="2" label="淘宝" value="2"></el-option>
        </el-select>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10" size="small"></el-input>
        <el-button type="primary" size="small" icon="search" @click="handleSearch">搜索</el-button>
      </div>
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

        <el-table-column label="操作" min-width="180">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">审批</el-button>
            <!--<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
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
  export default {
    data() {
      return {
        select_cate: '',
        select_word: '',
        tableData: [
          {
            type:'天猫',
            name: '华融资产',
            address: '北京市西城区金融街8号',
            money: '1000000',
            contact: '万棽',
            tel: '185xxxx9047'
          }
        ],
        delVisible: false,
      }
    },
    methods: {
      handleDelAll() {

      },
      handleSearch() {

      },
      handleEdit(index, row) {

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
    width 120px

  .handle-input
    width 300px
    display inline-block

  .del-dialog-cnt
    font-size 16px
    text-align center

</style>
