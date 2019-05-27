<template>
  <el-dialog :visible.sync="dialog" :title="'新增阅读权限'"  append-to-body width="500px">
    <el-form ref="form" :model="form" size="small" label-width="66px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" style="width: 200px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addRead } from '@/api/read'
export default {
  name: 'Form',
  props: {

  },
  data() {
    return {
      dialog: false, loading: false, form: { name: ''},
      rules: {
        name: [
          { required: true, message: '请输入类型名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          const _this = this
          this.doAdd()
        } else {
          return false
        }
      })
    },
    doAdd() {
      addRead(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          message: '',
          type: 'success',
          duration: 2500
        })
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
     editType(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          message: '',
          type: 'success',
          duration: 2500
        })
        this.$parent.init()
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.roleIds = []
      this.form = { name: '' }
    }
  }
}
</script>

<style scoped>

</style>
