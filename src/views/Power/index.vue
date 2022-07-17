<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table :data="powerList" border style="width: 100%" stripe>
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="324">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="324">
        </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag
              :type="
                Number(scope.row.level) === 0
                  ? ''
                  : Number(scope.row.level) == 1
                  ? 'success'
                  : 'warning'
              "
              >{{
                Number(scope.row.level) === 0
                  ? "等级一"
                  : Number(scope.row.level) == 1
                  ? "等级二"
                  : "等级三"
              }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  created () {
    this.getPowerList()
  },
  data () {
    return {
      powerList: []
    }
  },
  methods: {
    async getPowerList () {
      const res = await this.$store.dispatch('roles/getPowerList', 'list')
      this.powerList = res
    },
    async handleSet (index, row) {
      this.dialogRoles = true
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
.box-card {
  padding: 20px;
  margin: 15px 0 15px 0;
  width: 1164px;
  .el-col {
    height: 40px;
  }
  :deep(.el-card__body) {
    padding: 0;
  }
}
.el-table {
  font-size: 12px;
  margin: 15px 0 15px 0;
}
</style>
