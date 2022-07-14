<template>
  <div class="login-container">
    <div class="form-box">
      <el-form :model="loginForm" :rules="rules" ref="logInForm">
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-s-custom"
            v-model="loginForm.username"
          ></el-input
        ></el-form-item>
        <el-form-item prop="password">
          <el-input
            show-password
            prefix-icon="el-icon-unlock"
            v-model="loginForm.password"
          ></el-input
        ></el-form-item>
        <el-form-item class="btn-item">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  created () { },
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置
    reset () {
      this.$refs.logInForm.resetFields()
    },
    // 登录
    login () {
      // 二次校验
      this.$refs.logInForm.validate(async valid => {
        if (valid) {
          await this.$store.dispatch('user/logIn', this.loginForm)
        } else {
          this.$message.error('请按要求输入账号和密码')
        }
      })
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100vw;
  height: 100vh;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-box {
    width: 450px;
    height: 240px;
    background-color: #fff;
    padding: 30px 15px;
    box-sizing: border-box;
    .btn-item {
      text-align: right;
    }
  }
}
</style>
