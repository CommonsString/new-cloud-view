<template>
  <div class="app-container">
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="title" clearable placeholder="阅读权限搜索" style="width: 150px;" class="filter-item" @keyup.enter.native="toQuery"/>  
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQueryIsRight">显示所有</el-button>
    <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增
    </el-button>
    <eForm ref="form"/>
  </div>
    <!--表格渲染-->
    <div>
      <el-table
        border
        :data="tableData"
        style="width: 60%"
        height="350"
        >
        <el-table-column
          type="index">
        </el-table-column>

        <el-table-column
          prop="name"
          label="阅读权限"
          width="200"
          >
        </el-table-column>
        <el-table-column label="操作"
          fixed="right"
          >
          <template slot-scope="scope">
            <!-- 权限控制 -->
            <!-- handleDelete(scope.$index, scope.row, tableData) -->
            <!-- "$refs.edit.dialog = true" 
             && doEditMsg(scope.$index, scope.row)-->
            <el-button
              size="mini"
              type="info"
              @click="$refs.edit.dialog = true && test(scope.row)">编辑</el-button>            
              <el-button
              size="mini"
              type="danger"
              
              @click="handleDelete(scope.$index, scope.row, tableData)">删除</el-button>     
              <edit ref="edit" :curId='scope.row.id'  @element='showMsg'/>         
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import { getRead, getAllRead, delRead} from '@/api/read'
import eForm from './form'
import edit from './edit'
export default {
  components: { eForm, edit },
  data() {
    return {
      title: '',
      tableData: [],
      dialog: false
      // row:''
    }
  },
  created() {

  },
  methods: {
    toQuery() {
      let data = {
        name : this.title
      }
      getRead(data).then(res => {
         this.tableData = res
         console.log(res)
      }).catch(err => {

      })     
    },

    toQueryIsRight() {
       getAllRead().then(res => {
         this.tableData = res
         console.log('res', res)
      }).catch(err => {

      })  
    },
    handleDelete(index, rows, delData) {
      let id = rows.id
      console.log('测试')
      delRead(id).then(res => {
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

    showMsg(msg) {
      console.log('测试', msg)
      console.log('data2', this.tableData)
      for(var i = 0; i < this.tableData.length; i++) {
          console.log('el', this.tableData[i])
          if(this.tableData[i].id == msg.id) {
              this.tableData[i].name = msg.name
          }
      }
      return true
    },
    test(rows) {
       // 获取id
      console.log('min', rows.id)
      this.$store.dispatch('standByReadId', rows.id).then(() => {
        console.log('chao', rows.id)
      }).catch(() => {

      })    
      return true   
        return true
    }
  }
}
</script>

<style scoped>

</style>
