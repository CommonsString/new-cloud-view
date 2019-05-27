<template>
  <div class="app-container">
    <!-- <eHeader /> -->
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="title" clearable placeholder="新闻标题关键字" style="width: 150px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-select v-model="isRight" clearable placeholder="审阅状态" style="width: 150px;" class="filter-item">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.name"
        :value="item.value">
      </el-option>
    </el-select>    
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQueryIsRight">显示所有</el-button>
    <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="addMsg">新增
    </el-button>
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
          prop="name"
          label="新闻标题"
          >
        </el-table-column>
        <el-table-column
          prop="status"
          label="审阅状态"
          width="150">

        </el-table-column>

         <el-table-column
          prop="tag"
          label="阅读权限"
          width="150">
          </el-table-column>
         <el-table-column
          prop="type"
          label="新闻类型"
          width="150">
          </el-table-column>

        <el-table-column label="操作"
        fixed="right">
          <template slot-scope="scope">
            <!-- 权限控制 -->
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row, tableData)">删除</el-button>                  
            <el-button
              size="mini"
              type="info"
              @click="handPass(scope.$index, scope.row)">通过</el-button>
              <el-button
              size="mini"
              type="info"
              @click="handNotPass(scope.$index, scope.row)">不通过</el-button>                 
 
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import checkPermission from '@/utils/permission'
import { getAllMsg, getAll, delMsg } from '@/api/msg'
import {updateMainIndex, handNotPassId } from '@/api/uedeitor'
export default {
  data() {
    return {
      title: '',
      isRight: '1',
      tableData: [],
       options: [{
          value: '1',
          name: '已审阅'
        }, {
          value: '0',
          name: '未审阅'
        }],
        // value: ''
    }
  },
  created() {

  },
  methods: {
    toQuery() {
      let data = {
        title : this.title,
        isRight: this.isRight
      }
      console.log('datas', data)
      getAllMsg(data).then(res => {
         this.tableData = res
         console.log('res', res)
      }).catch(err => {

      })     
    },

    toQueryIsRight() {
       getAll().then(res => {
         this.tableData = res
         console.log('res', res)
      }).catch(err => {

      })  
    },


    // 详情
    handleEdit (index, row) {
      // console.log(index, row)
      console.log('index', index)
      console.log('row', row)
      this.$store.dispatch('MaintableToSelect', row).then(() => {
      // 登录成功跳转页面
        // this.$router.push({ path: '/msg/select' })
        this.$router.push({ path: '/show' })
      }).catch(() => {
        // this.loading = false
      })      
    },
    // 通过
    handPass(index, rows) {
      let id = rows.odd
      updateMainIndex(id).then(res => {
        this.$message({
          showClose: true,
          message: '该文章, 已通过审核！',
          type: 'success'
        }) 
        // 更改状态
        rows.status = "已审阅"
      }).catch(err => {
        // console.log(err.response.data.message)
        this.$message.error('错了哦!')
      })        
    },

    // 不通过
    handNotPass(index, rows) {
      let id = rows.odd
      handNotPassId(id).then(res => {
        this.$message({
          showClose: true,
          message: '该文章，已取消审核！',
          type: 'success'
        }) 
        // 更改状态
        rows.status = "未审阅"
      }).catch(err => {
        this.$message.error('错了哦!')
      })   
    },
    handleDelete(index, rows, delData) {
      let id = rows.odd
      delMsg(id).then(res => {
        this.$message({
          showClose: true,
          message: '删除成功！',
          type: 'success'
        }) 
        delData.splice(index, 1)
      }).catch(err => {
        this.$message.error('错了哦!');
      })          
    },
    addMsg() {
      // this.$router.push({ path: '/uploadMsg' })
      this.$router.push({ path: '/tools/uploadmsg' })
      // tools/uploadmsg
    }



  }
}
</script>

<style scoped>

</style>
