<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
        :closable="false"
      >
      </el-alert>
      <span>选择商品分类：</span>
      <el-cascader
        v-model="catValue"
        :options="goodsSortsList"
        :props="{
          expandTrigger: 'hover',
          label: 'cat_name',
          value: 'cat_id',
        }"
        @change="handleChange"
      ></el-cascader>
      <el-tabs @tab-click="handleClick">
        <!-- 动态属性 -->
        <el-tab-pane label="动态参数">
          <el-button
            type="primary"
            @click="addParamsDialog = true"
            size="mini"
            :disabled="isButtonDiable"
            >添加参数</el-button
          >
          <list-table
            v-if="sel === 'many'"
            :list="paramsList"
            :sel="sel"
            :rule="addFormRule"
            @getParmasList="getParmasList"
          ></list-table>
        </el-tab-pane>
        <!-- 静态属性 -->
        <el-tab-pane label="静态属性">
          <el-button
            type="primary"
            @click="addParamsDialog = true"
            size="mini"
            :disabled="isButtonDiable"
            >添加属性</el-button
          >
          <list-table
            v-if="sel === 'only'"
            :list="paramsList"
            :sel="sel"
            :rule="addFormRule"
            @getParmasList="getParmasList"
          ></list-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 弹出框 -->
    <el-dialog
      @close="handleColse"
      :title="sel === 'many' ? '添加动态参数' : '添加静态属性'"
      :visible.sync="addParamsDialog"
    >
      <el-form :model="addForm" :rules="addFormRule" ref="paramsForm">
        <el-form-item
          :label="sel === 'many' ? '动态参数' : '静态属性'"
          :label-width="formLabelWidth"
          prop="attr_name"
        >
          <el-input v-model="addForm.attr_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addParamsDialog = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSortsList, getParmasList, addParmas } from '@/api/goods'
import ListTable from './components/ListTable.vue'
export default {
  created () {
    this.getSortsList()
  },
  data () {
    const validateName = (rule, value, callback) => {

    }
    return {
      isButtonDiable: true,
      sel: 'many',
      formLabelWidth: '120px',
      addParamsDialog: false,
      goodsSortsList: [],
      catValue: [],
      paramsList: [],
      addForm: { id: '', attr_name: '', attr_sel: 'many' },
      addFormRule: {
        attr_name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    async getSortsList () {
      this.goodsSortsList = await getSortsList({ type: 3 })
    },
    async getParmasList () {
      this.paramsList = await getParmasList({ id: this.addForm.id, sel: this.sel })
    },

    async handleChange (value) {
      if (!value[2]) {
        this.$message.error('请选择三级分类')
        this.isAddParams = true
        this.paramsList = []
        return
      }
      this.isButtonDiable = false
      this.addForm.id = value[2]
      this.paramsList = await getParmasList({ id: value[2], sel: this.sel })
    },
    addParams () {
      this.$refs.paramsForm.validate(async (valid) => {
        if (valid) {
          console.log(this.addForm)
          await addParmas(this.addForm)
          this.getParmasList()
          this.$message.success('添加成功')
          this.addParamsDialog = false
        } else {
          this.$message.error('请按格式输入')
        }
      })
    },
    async handleClick (tab, event) {
      if (tab.index === '0') {
        this.sel = 'many'
        this.addForm.attr_sel = 'many'
      } else {
        this.sel = 'only'
        this.addForm.attr_sel = 'only'
      }
      if (this.addForm.id) {
        this.getParmasList()
      } else {
        this.$message.error('请选择三级分类')
      }
    },
    handleColse () {
      this.$refs.paramsForm.resetFields()
    }

  },
  computed: {
  },
  watch: {},
  filters: {},
  components: { ListTable }
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
.el-steps {
  margin: 15px 0 15px 0;
  :deep(.el-step__title) {
    font-size: 13px !important;
  }
  :deep(.is-finish) {
    color: #67c23a;
    border-color: #67c23a;
  }
}
.el-cascader {
  margin: 10px 0 10px 0;
}
</style>
