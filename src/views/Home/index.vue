<template>
  <el-container class="container">
    <el-header>
      <span>小草后台管理系统</span>
      <el-button plain @click="logOut">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px"
        ><el-menu
          background-color="#373d41"
          text-color="#fff"
          active-text-color="red"
          unique-opened
          default-active="1-1"
        >
          <el-submenu index="1">
            <template #title><i class="el-icon-user-solid" />用户管理</template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu" /> 用户列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="2">
            <template #title><i class="el-icon-s-tools" />权限管理</template>
            <el-menu-item index="2-1"
              ><i class="el-icon-menu" />角色管理</el-menu-item
            >
            <el-menu-item index="2-2"
              ><i class="el-icon-menu" />权限管理</el-menu-item
            >
          </el-submenu>
          <el-submenu index="3">
            <template #title><i class="el-icon-s-goods" />商品管理</template>
            <el-menu-item index="3-1"
              ><i class="el-icon-menu" />商品列表</el-menu-item
            >
            <el-menu-item index="3-2"
              ><i class="el-icon-menu" />分类参数</el-menu-item
            >
            <el-menu-item index="3-3"
              ><i class="el-icon-menu" />商品分类</el-menu-item
            >
          </el-submenu>
          <el-submenu index="4">
            <template #title><i class="el-icon-s-order" />订单管理</template>
            <el-menu-item index="4-1"
              ><i class="el-icon-menu" />订单列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="5">
            <template #title><i class="el-icon-s-data" />数据统计</template>
            <el-menu-item index="5-1"
              ><i class="el-icon-menu" />数据报表</el-menu-item
            >
          </el-submenu>
        </el-menu></el-aside
      >
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {
    logOut () {
      this.$store.commit('user/setToken', '')
      this.$router.push('/login')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
.container {
  height: 100vh;
  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 0 20px;
    background-color: #373d45;
    color: #fff;
    font-size: 22px;
    line-height: 60px;
    .el-button {
      width: 70px;
      height: 40px;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      text-align: center;
      font-weight: 500;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
    }
  }
  .el-aside {
    background-color: #373d41;
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.active {
  color: red;
}
</style>
