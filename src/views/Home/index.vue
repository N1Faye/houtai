<template>
  <el-container class="container">
    <!-- header -->
    <el-header>
      <span>小草后台管理系统</span>
      <el-button plain @click="logOut">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边导航 aside -->
      <el-aside width="unset">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :label="false" v-show="isCollapse"
            ><div class="toggleMenu-false">|||</div></el-radio-button
          >
          <el-radio-button :label="true" v-show="!isCollapse"
            ><div class="toggleMenu-true">|||</div></el-radio-button
          >
        </el-radio-group>
        <el-menu
          background-color="#373d41"
          text-color="#fff"
          active-text-color="red"
          unique-opened
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-submenu index="1">
            <template #title
              ><i class="el-icon-user-solid" /><span>用户管理</span></template
            >
            <el-menu-item index="/users" to="/users">
              <i class="el-icon-menu" /> 用户列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="2">
            <template #title
              ><i class="el-icon-s-tools" /><span>权限管理</span></template
            >
            <el-menu-item index="2-1"
              ><i class="el-icon-menu" />角色管理</el-menu-item
            >
            <el-menu-item index="2-2"
              ><i class="el-icon-menu" />权限管理</el-menu-item
            >
          </el-submenu>
          <el-submenu index="3">
            <template #title
              ><i class="el-icon-s-goods" /><span>商品管理</span></template
            >
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
            <template #title
              ><i class="el-icon-s-order" /><span> 订单管理</span></template
            >
            <el-menu-item index="4-1"
              ><i class="el-icon-menu" />订单列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="5">
            <template #title
              ><i class="el-icon-s-data" /> <span>数据统计</span></template
            >
            <el-menu-item index="5-1"
              ><i class="el-icon-menu" />数据报表</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    logOut () {
      this.$store.commit('user/updateToken', '')
      this.$router.push('/login')
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
$bgc: #373d45;
.container {
  height: 100vh;
  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 0 20px;
    background-color: $bgc;
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
    background-color: $bgc;
    :deep(.el-radio-button__inner) {
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #ff69b4;
      margin: 0;
      padding: 0;
      border: unset !important;
      border-radius: unset !important;
      color: white;
      letter-spacing: 5px;
      font-size: 18px;
    }
    .toggleMenu-true {
      width: 200px;
    }
    .toggleMenu-false {
      width: 64px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
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
