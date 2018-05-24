<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-date"></i>注册</el-breadcrumb-item>
        <el-breadcrumb-item>资料上传</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="operate">
      <el-button type="primary" @click="delAll">批量删除</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" size="small" ref="fileTables">
      <el-table-column type="selection" width="55" ></el-table-column>
      <el-table-column prop="id" label="Id" sortable width="150">
      </el-table-column>
      <el-table-column prop="date" label="上传日期" sortable width="120">
      </el-table-column>
      <el-table-column prop="size" label="文件大小" :formatter="formatter" width="150">
      </el-table-column>
      <el-table-column prop="name" label="文件名" width="150">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <a href=""></a>
          <el-button @click="handleDownload(scope.$index, scope.row)" type="text" size="small">下载</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-upload style="width: 805px"
      :action="uploadUrl" :on-success="handleUploaded"
      multiple
      :limit="3"
      class="upload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
    </el-upload>
  </div>
</template>
<script type="text/ecmascript-6">

  import {getAttachs, download,deleteFile} from 'api/invokeInterface'
  import Qs from 'qs'
  import store from 'store'

  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: []
      };
    },
    computed: {
      uploadUrl() {
        let prefix = window.location.origin;
        return `${prefix}/regist/upload`;
      }
    },
    created() {
      this.init();
    },
    methods: {
      init(){
        let uid = store.get('user').id;
        getAttachs({
          uid:uid
        }).then((res) => {
          this.tableData = this._normalizeTable(res);
        })
      },
      handleUploaded(res){
        let self = this;
        if(res.data.code === -1){
          this.$message({
            message: '请登录后操作',
            type: 'warning'
          });
          setTimeout(() => {
            self.$router.push('/')
          },1000)
        }
        this.tableData = this._normalizeTable(res.data);
      },
      _normalizeTable(data) {
        let result = [];
        data.forEach((item, index) => {
          result.push({
            id: item.id,
            name: item.name,
            date: item.uploadTime,
            size: (item.size/1024).toFixed(2) + 'kb'
          })
        })
        return result;
      },
      delAll(){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let arr = this.$refs.fileTables.selection.map((item)=>{
            return item.id;
          })
          deleteFile(Qs.stringify({
            ids:arr
          },{ indices: false})).then((res) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.init();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let arr = [];
          arr.push(row.id)
          deleteFile(Qs.stringify({
            ids:arr
          },{ indices: false})).then((res) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.init();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      confirm() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleDownload(index, row){
        let host = window.location.origin;
        window.location.href = `${host}/regist/download/v2?id=${row.id}`;
      },
      formatter(row, column) {
        return row.size;
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .el-table .sort-caret
    width 0 !important
</style>

<style lang="stylus" scoped rel="stylesheet">
  .el-table::before
    height 0

  .operate
    height 36px
    margin-bottom 20px

  .el-table__header
    background-color gray

  .upload
    margin-top 90px
    text-align center

  .el-upload-list--text
    display none !important
</style>
