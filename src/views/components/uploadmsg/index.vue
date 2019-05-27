<template>
  <div class="dashboard-editor-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="新闻标题">
        <el-input v-model="formInline.title" placeholder="新闻标题"></el-input>
      </el-form-item>
      <el-form-item label="阅读权限">
        <el-select v-model="formInline.read" placeholder="阅读权限">
        <el-option
          v-for="item in readOptions"
          :key="item.value"
          :label="item.value"
          :value="item.label">
        </el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="新闻类型">
        <el-select v-model="formInline.type" placeholder="新闻类型">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.value"
          :value="item.label">
        </el-option>
        </el-select>
      </el-form-item>     
      <el-form-item>
        <el-button type="primary" @click="checkMsg">保存</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="delEditMsg">取消</el-button>
      </el-form-item>
    </el-form>


    <h3>    新闻内容：</h3>
    <div @click="showData" class="preview" v-html="msg"></div>
    <el-row :gutter="20">
      <el-col :span="24">
        <div>
          <vue-ueditor-wrap ref="ueditor"  v-model="msg" :destroy="false" :config="config" @ready="ready" v-for="item in 1" :key="item" @beforeInit="addCustomUI"></vue-ueditor-wrap>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 1、引入VueUeditorWrap组件
import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
import {upfile, getEditIndex, saveMsgContent } from '@/api/uedeitor'
import { mapGetters } from 'vuex'
export default {
  name: 'HelloWorld',
  // 2、注册组件
  components: {
    VueUeditorWrap
  },
  data () {
    return {

            //
      formInline: {
        title: '',
        read: '',
        type:''
      },

      readOptions: [{
        value: '选项1',
        label: '老师'
      }],

      typeOptions: [{
        value: '选项1',
        label: '社会热点'
      }],
      //
      input: '',
      // height: document.documentElement.clientHeight - 200 + 'px',
      // 3、v-model绑定数据
      msg: '<h6>内容输入.....</h6>',
      // 4、根据项目需求自行配置,具体配置参见ueditor.config.js源码或 http://fex.baidu.com/ueditor/#start-start
      config: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        // serverUrl: 'http://localhost:8099/content/upMsgFile'
        serverUrl: 'http://35.201.165.105:8000/controller.php'
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        // UEDITOR_HOME_URL: '/static/UEditor/'
        // 配合最新编译的资源文件，你可以实现添加自定义Request Headers,详情https://github.com/HaoChuan9421/ueditor/commits/dev-1.4.3.3
        // headers: {
        //   access_token: '37e7c9e3fda54cca94b8c88a4b5ddbf3'
        // }
      },
      options: [{
        value: 'teacher',
        label: '教师'
      }, {
        value: 'student',
        label: '学生'
      }, {
        value: 'leader',
        label: '领导'
      }],


       options_msg: [{
        value: '1',
        label: '国际新闻'
      }, {
        value: '2',
        label: '社会热点'
      }, {
        value: '3',
        label: '今日头条'
      }],     
      value: '' ,
      type_msg:'' ,
      data: ''   
    }
  },
  mounted () {
    getEditIndex().then(res => {
        console.log('res, res', res)
        this.readOptions = res.readPermission
        this.typeOptions = res.contentType
    }).catch(err => {

    }) 
  },
  create () {
    console.log('%c注意：本Demo提供的serverUrl是为了方便小伙伴们体验图片文件等上传功能。\n请勿在生产环境使用此serverUrl！！！', 'background:#f33;color:#fff')
  },
  methods: {
    // 5、 你可以在ready方法中拿到editorInstance实例,所有API和官方的实例是一样了。http://fex.baidu.com/ueditor/#api-common
    ready (editorInstance) {
      console.log(`实例${editorInstance.key}已经初始化:`, editorInstance)
    },
    // 重复确认操作

  checkMsg() {
        // let msgObj = this.$store.getters.row
        this.$confirm('请仔细检查新闻标题、内容', '提示', {
          confirmButtonText: '直接保存',
          cancelButtonText: '返回检查',
          type: 'warning'
        }).then(() => {
          // 请求
          this.data = {
            name: this.formInline.title,
            tag: this.formInline.read,
            content: this.msg,
            type: this.formInline.type
          }
          // let temp = JSON.stringify(data)
          console.log('data', this.data)
          saveMsgContent(this.data).then(res => {
              this.$store.dispatch('PassValue', this.data).then(() => {
                this.$message({
                  message: '上传成功！',
                  type: 'success'
                });                
              }).catch(() => {
                  this.$message.error('错了哦!');
              })
          }).catch(err => {
            console.log(err.response.data.message)
            this.$message.error('错了哦!');
          }) 

      }).catch(() => {
        // 取消操作
        this.$message({
          type: 'info',
          message: '已取消保存'
        });          
      }); 
    },
    // 取消
    delEditMsg() {
      this.formInline = {
        title: '',
        region: '',
        type:''
      }
      this.msg = ''
    },
    // 6. 查看绑定的数据
    showData () {
      // alert(this.msg)
      let temp = this.msg
      this.$alert(temp.substring(0, 300) + "...", '显示内容', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true
      });     
      // console.log(this.msg)
    },
    // 7. 借助 beforeInit 钩子，你可以实现对 UEditor 的二次开发，会在 scripts 加载完毕之后、编辑器初始化之前触发，以 编辑器 id 和 配置参数 作为入参
    addCustomUI (editorId, editorConfig) {
      console.log(editorId + '的配置参数是:', JSON.stringify(editorConfig, null, 2))

      // 1. 自定义按钮
      window.UE.registerUI('test-button' + editorId, function (editor, uiName) {
        // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
        editor.registerCommand(uiName, {
          execCommand: function () {
            editor.execCommand('inserthtml', `<span style="color: #${editorId.substr(-3)};">这是一段由自定义按钮添加的文字，你点击的编辑器ID是${editorId}</span>`)
          }
        })

        // 创建一个 button
        var btn = new window.UE.ui.Button({
          // 按钮的名字
          name: uiName,
          // 提示
          title: '鼠标悬停时的提示文字',
          // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
          cssRules: "background-image: url('/static/test-button.png') !important;background-size: cover;",
          // 点击时执行的命令
          onclick: function () {
            // 这里可以不用执行命令，做你自己的操作也可
            editor.execCommand(uiName)
          }
        })

        // 当点到编辑内容上时，按钮要做的状态反射
        editor.addListener('selectionchange', function () {
          var state = editor.queryCommandState(uiName)
          if (state === -1) {
            btn.setDisabled(true)
            btn.setChecked(false)
          } else {
            btn.setDisabled(false)
            btn.setChecked(state)
          }
        })

        // 因为你是添加 button，所以需要返回这个 button
        return btn
      }, 0 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */, editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */)

      // 2. 自定义表格居中按钮
      window.UE.registerUI('table-center-button' + editorId, function (editor, uiName) {
        // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
        editor.registerCommand(uiName, {
          execCommand: function () {
            var tables = editor.document.querySelectorAll('table')
            if (tables.length) {
              tables.forEach((table) => {
                table.style.margin = '0 auto'
              })
            } else {
              editor.trigger('showmessage', {
                content: '没有表格',
                timeout: 2000
              })
            }
          }
        })

        // 创建一个 button
        var btn = new window.UE.ui.Button({
          // 按钮的名字
          name: uiName,
          // 提示
          title: '点击设置表格居中',
          // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
          cssRules: "background-image: url('/static/center.png') !important;background-size: cover;",
          // 点击时执行的命令
          onclick: function () {
            // 这里可以不用执行命令，做你自己的操作也可
            editor.execCommand(uiName)
          }
        })

        // 当点到编辑内容上时，按钮要做的状态反射
        editor.addListener('selectionchange', function () {
          var state = editor.queryCommandState(uiName)
          if (state === -1) {
            btn.setDisabled(true)
            btn.setChecked(false)
          } else {
            btn.setDisabled(false)
            btn.setChecked(state)
          }
        })

        // 因为你是添加 button，所以需要返回这个 button
        return btn
      }, 1 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */, editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */)

      // 3. 自定义弹窗
      window.UE.registerUI('test-dialog' + editorId, function (editor, uiName) {
        // 创建 dialog
        var dialog = new window.UE.ui.Dialog({
          // 指定弹出层中页面的路径，这里只能支持页面，路径参考常见问题 2
          iframeUrl: '/static/customizeDialogPage.html',
          // 需要指定当前的编辑器实例
          editor: editor,
          // 指定 dialog 的名字
          name: uiName,
          // dialog 的标题
          title: '这是一个自定义的 Dialog 浮层',
          // 指定 dialog 的外围样式
          cssRules: 'width:600px;height:300px;',
          // 如果给出了 buttons 就代表 dialog 有确定和取消
          buttons: [
            {
              className: 'edui-okbutton',
              label: '确定',
              onclick: function () {
                dialog.close(true)
              }
            },
            {
              className: 'edui-cancelbutton',
              label: '取消',
              onclick: function () {
                dialog.close(false)
              }
            }
          ]
        })

        // 参考上面的自定义按钮
        var btn = new window.UE.ui.Button({
          name: 'dialog-button',
          title: '鼠标悬停时的提示文字',
          cssRules: `background-image: url('/static/test-dialog.png') !important;background-size: cover;`,
          onclick: function () {
            // 渲染dialog
            dialog.render()
            dialog.open()
          }
        })

        return btn
      }, 2 /* 指定添加到工具栏上的那个位置，默认时追加到最后 */, editorId /* 指定这个UI是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */)
    }
  }
}
</script>

<style>
.preview{
  min-height: 250px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
}
.dashboard-editor-container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
.upload__tip {
  /* box-shadow: 0 0px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
  min-height: 25px;
}


</style>
