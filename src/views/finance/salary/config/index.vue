<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户账号" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户账号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="基本工资" prop="baseWage">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.baseWage"-->
      <!--          placeholder="请输入基本工资"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="加班费用" prop="otPay">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.otPay"-->
      <!--          placeholder="请输入加班费用"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="社保" prop="socialWelfare">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.socialWelfare"-->
      <!--          placeholder="请输入社保"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="公积金" prop="providentFund">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.providentFund"-->
      <!--          placeholder="请输入公积金"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="实际工资" prop="sum">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.sum"-->
      <!--          placeholder="请输入实际工资"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['salary:config:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['salary:config:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['salary:config:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['salary:config:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="configList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <!--      <el-table-column label="序号" align="center" prop="id"/>-->
      <el-table-column label="用户账号" align="center" prop="userId"/>
      <el-table-column label="基本工资" align="center" prop="baseWage"/>
      <el-table-column label="加班费用" align="center" prop="otPay"/>
      <el-table-column label="社保" align="center" prop="socialWelfare"/>
      <el-table-column label="公积金" align="center" prop="providentFund"/>
<!--      <el-table-column label="实际工资" align="center" prop="sum"/>-->
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['salary:config:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['salary:config:remove']"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改工资配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="550px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户账号" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户账号"/>
        </el-form-item>
        <el-form-item label="基本工资" prop="baseWage">
          <el-input v-model="form.baseWage" placeholder="请输入基本工资"/>
        </el-form-item>
        <el-form-item label="加班费用" prop="otPay">
          <el-input v-model="form.otPay" placeholder="请输入加班费用"/>
        </el-form-item>
        <el-form-item label="社保" prop="socialWelfare">
          <el-input v-model="form.socialWelfare" placeholder="请输入社保"/>
        </el-form-item>
        <el-form-item label="公积金" prop="providentFund">
          <el-input v-model="form.providentFund" placeholder="请输入公积金"/>
        </el-form-item>
<!--        <el-form-item label="实际工资" prop="sum">-->
<!--          <el-input v-model="form.sum" placeholder="请输入实际工资"/>-->
<!--        </el-form-item>-->
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listConfig, getConfig, delConfig, addConfig, updateConfig } from '@/api/finance/salary/config'

export default {
  name: 'Config',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      userIds: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 工资配置表格数据
      configList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        baseWage: null,
        otPay: null,
        socialWelfare: null,
        providentFund: null,
        sum: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: '用户账号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询工资配置列表 */
    getList() {
      this.loading = true
      listConfig(this.queryParams).then(response => {
        this.configList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        userId: null,
        baseWage: null,
        otPay: null,
        socialWelfare: null,
        providentFund: null,
        sum: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.userIds = selection.map(item => item.userId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加工资配置'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getConfig(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改工资配置'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateConfig(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addConfig(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      const userIds = row.userId || this.userIds
      this.$modal.confirm('是否确认删除工资配置编号为"' + userIds + '"的数据项？').then(function() {
        return delConfig(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('salary/config/export', {
        ...this.queryParams
      }, `config_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
