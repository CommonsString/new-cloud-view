<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
      <h3 class="title">网络新闻管理编辑系统</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon" style="height: 39px;width: 13px;margin-left: 2px;" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon" style="height: 39px;width: 13px;margin-left: 2px;" />
        </el-input>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
      <p class="login-tip">默认用户名：admin，密码：123456</p>
    </el-form>
  </div>
</template>

<script>
import { md5 } from '@/utils/md5'
import Cookies from 'js-cookie'
import { getToken } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    return {
      md5Pwd: '',
      loginForm: {
        username: '',
        password: '',
        rememberMe: false
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getCookie()
  },
  methods: {
    getCookie() {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      // 保存cookie里面的加密后的密码
      this.md5Pwd = password === undefined ? '' : password
      this.loginForm = {
        username: username === undefined ? '' : username,
        password: this.md5Pwd,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      }
    },
    flushtime(time) {

    },
    handleLogin() {
			// console.log("测试")
      this.$refs.loginForm.validate(valid => {
        let pass = this.loginForm.password
        if (pass !== this.md5Pwd) { pass = md5(pass) }
        const user = { username: this.loginForm.username, password: pass, rememberMe: this.loginForm.rememberMe }
        if (valid) {
          this.loading = true
					// cookie储存
          if (user.rememberMe) {
            Cookies.set('username', user.username, { expires: 1 })
            Cookies.set('password', user.password, { expires: 1 })
            Cookies.set('rememberMe', user.rememberMe, { expires: 1 })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          // console.log('token', getToken())
          console.log('测试！1')
          this.$store.dispatch('Login', user).then(() => {
            // 登录成功跳转页面
            this.loading = false 
            this.$router.push({ path: this.redirect || '/' })
            console.log('测试！2')
          }).catch(() => {
            this.loading = false
            console.log('测试！3')
            this.$router.push({ path: this.redirect || '/' })
          }) 
        } else {
					// 登录失败返回信息
          console.log('error submit!!')
          return false
        } 
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image:url(	https://s2.ax1x.com/2019/05/19/EjXIht.png);
    height: 100%;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 365px;
    padding: 25px 25px 5px 25px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
</style>
