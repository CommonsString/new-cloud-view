<template>
  <div class="app-container">
  <div class="head-container">
    <!-- 新增 -->
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item>
        <el-upload
          class="upload-demo"
          action="http://localhost:8099/content/upMsgFile"
          :on-success="handleSuccess"
          :on-error="handleError"
          :headers="headers"
          multiple>
          <el-button class="filter-item" type="primary" size="mini">上传信息</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
          <el-button   size="mini" class="filter-item" type="primary" icon="el-icon-download" @click="download">下载模板</el-button>
      </el-form-item>

      <el-form-item>
          <el-button   size="mini" class="filter-item" type="primary"  @click="resetMsg">取消</el-button>
      </el-form-item>
    </el-form>

   
  </div>
    <!--表格渲染-->
    <div>
      <el-table
        border
        :data="tableData"
        style="width: 100%"
        height="350"
        >
        <el-table-column
          type="index">
        </el-table-column>

        <el-table-column
          prop="title"
          label="新闻标题"
          width="160">
        </el-table-column>
        <el-table-column
          prop="content"
          label="新闻内容"
          height="150">

        </el-table-column>


        <el-table-column label="操作"
        width="150"
        fixed="right">
          <template slot-scope="scope">
            <!-- 权限控制 -->
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row, tableData)">编辑</el-button>
              <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row, tableData)">删除</el-button>                             
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { upMsgFile } from '@/api/uedeitor'
export default {
  data() {
    return {
      fileList: [
        ],
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      tableData:[]
    }
  },
  computed: {

  },
  mounted() {
    console.log('token', getToken())
    this.tableData = this.$store.getters.inportContent
  },
  methods: {
    download() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['新闻标题', '新闻内容']
        const data = {}
        // 导出
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'inport-template'
        })
        this.downloadLoading = false
      })
    },
    handleEdit(index, rows, delData) {
      console.log('edit', rows)
      let data = {
        name: rows.title,
        content:rows.content,
        tag:'',
        type: ''
      }
      console.log('data', data)
      delData.splice(index, 1)
      this.$store.dispatch('saveEditDate', data).then(() => {
          this.$router.push({ path: '/tools/ueditor' })
      }).catch(() => {
      this.$message({
        type: 'info',
        message: '编辑失败！'
      });      
    })  
      //
    },
    handleSuccess(response, file, fileList) {
      console.log('resonse', response)
      this.tableData = response
      console.log('tableData', this.tableData)
      this.$store.dispatch('saveDate', response).then(() => {})
      // SaveContent
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
    },
    resetMsg(){
      this.tableData = []
    },
    handleDelete(index, rows, delData) {
        delData.splice(index, 1)
    }



  }
}
</script>

<style scoped>
  .editor-content{
    padding-left: 5px;
  }
</style>
