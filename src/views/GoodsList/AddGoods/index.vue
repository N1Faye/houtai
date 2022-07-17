<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <el-steps :active="tabid - 1" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-tabs v-model="tabid" tab-position="left">
        <el-tab-pane label="基本信息" name="1">
          <el-form
            label-position="top"
            label-width="80px"
            :model="baseInfoForm"
            :rules="baseInfoFormRules"
          >
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="baseInfoForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="baseInfoForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="baseInfoForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="baseInfoForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
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
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="2">配置管理</el-tab-pane>
        <el-tab-pane label="商品属性" name="3">角色管理</el-tab-pane>
        <el-tab-pane label="商品图片" name="4">定时任务补偿</el-tab-pane>
        <el-tab-pane label="商品内容" name="5">角色管理</el-tab-pane>
      </el-tabs></el-card
    >
  </div>
</template>

<script>
import { validNum, validQuantity } from '@/utiles/validate'
import { getSortsList } from '@/api/goods'
export default {
  created () {
    this.getSortsList()
  },
  data () {
    const validateQuantity = (rule, value, callback) => {
      validQuantity(value) ? callback() : callback(new Error('请输入非负整数'))
    }
    const validateNum = (rule, value, callback) => {
      validNum(value) ? callback() : callback(new Error('请输入非负数字,且小数点后不能超过两位'))
    }
    return {
      tabid: '1',
      labelPosition: '120px',
      baseInfoForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: ''
      },
      baseInfoFormRules: {
        goods_name: [
          { required: true, message: '商品名不能为空', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在3到8之间', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '价格不能为空', trigger: 'blur' },
          { validator: validateNum, trigger: 'blur' }

        ],
        goods_weight: [
          { required: true, message: '商品重量不能为空', trigger: 'blur' },
          { validator: validateNum, trigger: 'blur' }

        ],
        goods_number: [
          { required: true, message: '商品数量不能为空', trigger: 'blur' },
          { validator: validateQuantity, trigger: 'blur' }
        ],
        goods_cat: [{ required: true, message: '商品名不能为空', trigger: 'blur' }]
      },
      goodsSortsList: [],
      catValue: [],
      selectValue: ''
    }
  },
  methods: {
    async getSortsList () {
      this.goodsSortsList = await getSortsList({ type: 3 })
    },
    handleChange (value) {
      console.log(value)
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
</style>
