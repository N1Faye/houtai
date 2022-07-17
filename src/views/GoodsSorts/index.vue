<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="dialogAddUser = true"
            >添加分类</el-button
          ></el-col
        >
        <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-table :data="sortsList" border style="width: 100%" stripe>
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column
          prop="username"
          label="分类名称"
          width="224"
          type="expand"
          >
        </el-table-column>
        <el-table-column prop="mobile" label="是否有效" width="224">
        </el-table-column>
        <el-table-column prop="role_name" label="等级" width="224">
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
          </template></el-table-column
        >
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加用户 -->
    <el-dialog title="添加用户对话框" :visible.sync="dialogAddUser">
      <el-form :model="addUserForm" :rules="addUserRules">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            v-model="addUserForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            v-model="addUserForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="mobile"
        >
          <el-input v-model="addUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddUser = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户信息 -->
    <el-dialog title="编辑用户" :visible.sync="dialogEdit">
      <el-form :model="editForm" :rules="editRules">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="editForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="mobile"
        >
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 设置用户权限 -->
    <el-dialog title="分配角色" :visible.sync="dialogSet">
      <p>
        当前用户：<span>{{ setForm.username }}</span>
      </p>
      <p>
        当前角色：<span>{{ setForm.role_name }}</span>
      </p>
      <p>
        <span>分配新角色：</span>
        <el-select
          v-model="selectValue"
          placeholder="请选择"
          clearable
          @change="select(selectValue)"
        >
          <el-option
            v-for="item in setForm.rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          ></el-option>
        </el-select>
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSet = false">取 消</el-button>
        <el-button type="primary" @click="setUserRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers, addUser } from '@/api/users'
import { validMobile } from '@/utiles/validate'
export default {
  created () {
    this.getUsers()
  },
  data () {
    const validateMobile = (rule, value, callback) => {
      validMobile(value) ? callback() : callback(new Error('手机号格式不正确'))
    }
    return {
      formLabelWidth: '120px',
      dialogAddUser: false,
      dialogEdit: false,
      dialogSet: false,
      selectValue: [],
      input: '',
      total: 0,
      pagenum: 1,
      pagesize: 5,
      query: '',
      sortsList: [],
      allUsersList: [],
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addUserRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { validator: validateMobile, trigger: 'blur' }
        ]
      },
      editForm: { username: '', id: '', email: '', mobile: '' },
      editRules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ]
      },
      setForm: {
        username: '',
        id: '',
        role_name: '',
        rolesList: [],
        roleid: ''
      }

    }
  },
  methods: {
    async getUsers () {
      try {
        const res = await getUsers({
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        })
        if (res.users.length === 0 && this.pagenum !== 1) {
          this.pagenum -= 1
          this.getUsers()
        }
        this.total = res.total
        this.sortsList = res.users
      } catch (error) {
        console.log(error)
      }
    },
    handleSizeChange (val) {
      this.pagesize = val
      console.log(val)
      this.pagenum = 1
      console.log(this.pagenum)
      this.getUsers()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      console.log(val)
      this.getUsers()
    },
    // 添加用户
    async addUser () {
      try {
        await addUser(this.addUserForm)
        this.pagenum = 1
        this.getUsers()
        this.dialogAddUser = false
        this.$message.success('添加用户成功')
        this.addUserForm = {}
      } catch (error) {
        console.log(error)
      }
    },
    // 更改用户状态
    handleEdit (index, row) {
      //   this.editForm.username = row.username
      //   this.editForm.id = row.id
      //   this.editForm.email = row.email
      //   this.editForm.mobile = row.mobile
      //   this.dialogEdit = true
    },
    // // 编辑用户资料
    async editUser () {
      //   try {
      //     await editUser(this.editForm)
      //     this.getUsers()
      //     this.dialogEdit = false
      //     this.$message.success('用户资料编辑成功')
      //     this.editForm = {}
      //   } catch (error) {
      //     console.log(error)
      //   }
    },
    // // 删除单个用户
    handleDelete (index, row) {
      //   console.log(index, row)
      //   this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(async () => {
      //     try {
      //       await deleteUser(row.id)
      //       this.getUsers()
      //       this.$message.success('删除成功')
      //     } catch (error) {
      //       console.log(error)
      //     }
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     })
      //   })
    }
  },
  computed: {},
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
