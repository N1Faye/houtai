<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button type="primary" @click="dialogAddUser = true"
        >添加角色</el-button
      >
      <el-table :data="rolesList" border style="width: 100%" stripe>
        <el-table-column type="expand" label="#" width="50">
          <template slot-scope="props">
            <el-row
              class="auth"
              v-for="item in props.row.children"
              :key="item.id"
              justify="space-between"
              height="100%"
            >
              <el-col :span="6">
                <el-tag>{{ item.authName }}</el-tag>
              </el-col>
              <el-col :span="18">
                <el-row
                  v-for="item1 in item.children"
                  :key="item1.id"
                  class="auth"
                >
                  <el-col :span="5">
                    <el-tag type="success">{{ item1.authName }}</el-tag></el-col
                  >
                  <el-col :span="19">
                    <el-tag
                      v-for="tag in item1.children"
                      :key="tag.id"
                      closable
                      type="warning"
                      @close="handleClose(tag, props, item, item1)"
                    >
                      {{ tag.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="324">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="324">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              ><i class="el-icon-edit"></i>编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              ><i class="el-icon-delete"></i>删除</el-button
            >
            <el-button
              type="warning"
              size="mini"
              @click="handleSet(scope.$index, scope.row)"
              ><i class="el-icon-setting"></i>分配权限</el-button
            >
          </template></el-table-column
        ></el-table
      ></el-card
    >
    <el-dialog
      title="分配权限"
      :visible.sync="setDialog"
      :before-close="handleClose"
      ><el-tree
        :data="tree"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="{ label: 'authName', children: 'children' }"
        :default-checked-keys="array"
      >
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="setDialog = false">取 消</el-button>
        <el-button type="primary" @click="addAuth">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { getMenus, getRoles, deleteAuth, getPowerList, addAuth } from '@/api/roles'
export default {
  created () {
    this.getRolesList()
  },
  data () {
    return {
      dialogRoles: false,
      authData: [],
      rolesList: [],
      deleteInfo: {
      },
      setDialog: false,
      menus: [],
      tree: [],
      array: [],
      addAuthForm: {
        roleId: '', rids: ''
      }
    }
  },
  methods: {
    async getRolesList () {
      this.rolesList = await getRoles()
    },
    async getMenus () {
      this.menus = await getMenus()
      console.log('menus', this.menus)
    },
    handleEdit (index, row) {
      // this.editForm = { ...row }
      // this.dialogEdit = true
    },
    // 编辑用户资料
    async editUser () {
      // try {
      //   await editUser(this.editForm)
      //   this.getUsers()
      //   this.dialogEdit = false
      //   this.$message.success('用户资料编辑成功')
      //   this.editForm = {}
      // } catch (error) {
      //   console.log(error)
    },
    // 删除单个用户
    handleDelete (index, row) {
      // this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(async () => {
      //   try {
      //     await deleteUser(row.id)
      //     await this.getUsers()
      //     this.$message.success('删除成功')
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   })
      // })
    },
    async handleSet (index, row) {
      console.log(index, row)
      this.addAuthForm.roleId = row.id
      this.setDialog = true
      this.tree = await getPowerList('tree')
      const arr2 = []
      row.children.filter(item => item.children.length > 0).forEach(item => {
        item.children.forEach(item =>
          arr2.push(item.children)
        )
      })
      // arr1.forEach(item => {
      //   item.children.forEach(item =>
      //     arr2.push(item.children)
      //   )
      // })
      const arr3 = []
      arr2.forEach(item => {
        item.forEach(item1 => {
          arr3.push(item1.id)
        })
      })
      this.array = arr3
    },
    async addAuth () {
      this.addAuthForm.rids = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()).toString()
      await addAuth(this.addAuthForm)
      await this.getRolesList()
      this.tree = getPowerList('tree')
      this.$message.success('修改成功')
      this.setDialog = false
    },
    async handleClose (tag, props, auth1, auth2) {
      this.deleteInfo = {
        roleId: props.row.id,
        rightId: tag.id
      }
      await deleteAuth(this.deleteInfo)
      console.log('1', this.pagenum)
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const index1 = this.rolesList[props.$index].children.indexOf(auth1)
          const index2 = auth1.children.indexOf(auth2)
          const index = auth2.children.indexOf(tag)
          this.rolesList[props.$index].children[index1].children[index2].children.splice(index, 1)
          this.$message.success('删除成功')
        } catch (error) {
          console.log(error)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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

<style scoped lang='scss'>
.box-card {
  padding: 20px;
  margin: 15px 0 15px 0;
  width: 1164px;
  :deep(.el-card__body) {
    padding: 0;
  }
}
.el-table {
  font-size: 12px;
  margin: 15px 0 15px 0;
}

.auth {
  display: flex;
  margin: 20px;
  align-items: center;
  border-bottom: 1px solid #eee;
  .el-row {
    &:last-child {
      border: none;
    }
  }
}
.el-col {
  border-radius: 4px;
}
.el-tag {
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>
