<template>
  <div ref="index">
    <div class="handle-box">
      <el-select v-model="select_cate" placeholder="筛选注册类型" @change="handleChange" class="handle-select mr10" size="small">
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
          <el-button size="small" type="primary" @click="open(scope.$index, scope.row)">审批</el-button>
          <!--<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getTask,approveForm} from 'api/invokeInterface'
    export default {
      props:{
        name:{
          default: '1'
        },
        count: {
          type: Number
        }
      },
      data() {
        return {
          select_cate:'',
          select_word:'',
          tableData: [],
        }
      },
      created() {
        this.init();
      },
      methods:{
        init(){
          getTask().then((res) => {
            this.tableData = res;
          })
        },
        handleSearch(){},
        open(index, row) {
          this.$emit('open', row);
        },
        handleChange() {
          this.tableData.forEach((item, index) => {
            if(item.type !== this.select_cate){
              delete this.tableData[index];
            }
          })
        },
        handleCurrentChange() {

        },
      },
      watch:{
        count(newVal, oldVal){
          let times = newVal - oldVal;
          console.log(times === 1)
          if(times === 1){
            this.init();
          }
        }
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
