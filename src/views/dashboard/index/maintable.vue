<template>
    <div>
      <p class="title"><i class="el-icon-tickets"></i>最新10条待评审文章</p>
      <el-table
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="index">
        </el-table-column>
        <!-- <el-table-column
          sortable
          prop="odd"
          label="序号">
        </el-table-column> -->
        <el-table-column
          prop="name"
          label="新闻标题">
        </el-table-column>
        <el-table-column
          prop="status"
          label="审阅状态"
          >
          <!-- width="130" -->
        </el-table-column>

         <el-table-column
          prop="tag"
          label="阅读权限"
          >
          <!-- width="150" -->
          </el-table-column>

          <el-table-column
          prop="type"
          label="新闻类型"
          >
          <!-- width="150" -->
          </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">详情</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleDelete(scope.$index, scope.row, tableData)">通过</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
</template>

<script>
import { gitMsgLimitTen, updateMainIndex } from '@/api/uedeitor'
export default {
  name: 'maintable',
  data () {
    return {
      tableDatas: [],
      tableData: [],
      count:0
    }
  },
  mounted() {
    console.log('测试, 这是一个查询')
    // 渲染查询
    gitMsgLimitTen().then(res => {
      console.log('测试', res)
      this.tableData = res
    }).catch(err => {
      console.log(err.response.data.message)
    })
    // console.log(' this.tableData ', this.tableData )
  },
  created: function() {

  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
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
    handleDelete (index, row, delData) {
      console.log(row.odd, row)
      // 删除操作
      let id = row.odd
      updateMainIndex(id).then(res => {
        delData.splice(index, 1);
        console.log("删除测试", res)
        this.$message({
          showClose: true,
          message: '该文章, 已通过审核！',
          type: 'success'
        })
        this.$emit('count', this.count)
        // 更改状态
        row.status = "已审阅"
      }).catch(err => {
        console.log(err.response.data.message)
        this.$message.error('错了哦!');
      })        
    },
    formatter (row, column) {
      return row.address
    },
    filterTag (value, row) {
      return row.tag === value
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>

<style scoped>

</style>
