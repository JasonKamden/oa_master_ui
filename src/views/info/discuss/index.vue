<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="模块名称" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入模块名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="排序号" prop="sortNo">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.sortNo"-->
      <!--          placeholder="请输入排序号"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="模块类型" prop="discussType">-->
      <!--        <el-select v-model="queryParams.discussType" placeholder="请选择模块类型" clearable>-->
      <!--          <el-option-->
      <!--            v-for="dict in dict.type.sys_discuss_type"-->
      <!--            :key="dict.value"-->
      <!--            :label="dict.label"-->
      <!--            :value="dict.value"-->
      <!--          />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="版主" prop="userId">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.userId"-->
      <!--          placeholder="请输入版主"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="开放人员" prop="openUsers">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.openUsers"-->
      <!--          placeholder="请输入开放人员"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="开放部门" prop="openDepts">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.openDepts"-->
      <!--          placeholder="请输入开放部门"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="开放职务" prop="openRoles">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.openRoles"-->
      <!--          placeholder="请输入开放职务"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item label="是否私有" prop="status">
        <el-select v-model="queryParams.status" placeholder="是否审批" clearable>
          <el-option
            v-for="dict in dict.type.sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
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
          v-hasPermi="['info:discuss:add']"
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
          v-hasPermi="['info:discuss:edit']"
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
          v-hasPermi="['info:discuss:remove']"
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
          v-hasPermi="['info:discuss:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="discussList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <!--      <el-table-column label="主键" align="center" prop="recordId" />-->
      <el-table-column label="模块名称" align="center" prop="title"/>
      <el-table-column label="排序号" align="center" prop="sortNo"/>
      <el-table-column label="模块类型" align="center" prop="discussType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_discuss_type" :value="scope.row.discussType"/>
        </template>
      </el-table-column>
      <el-table-column label="版主" align="center" prop="userId"/>
      <!--      <el-table-column label="开放人员" align="center" prop="openUsers" />-->
      <!--      <el-table-column label="开放部门" align="center" prop="openDepts" />-->
      <!--      <el-table-column label="开放职务" align="center" prop="openRoles" />-->
      <el-table-column label="是否审批" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['info:discuss:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['info:discuss:remove']"
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

    <!-- 添加或修改讨论区对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="模块名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入模块名称"/>
        </el-form-item>
        <el-form-item label="排序号" prop="sortNo">
          <el-input v-model="form.sortNo" placeholder="请输入排序号"/>
        </el-form-item>
        <el-form-item label="模块类型" prop="discussType">
          <el-select v-model="form.discussType" placeholder="请选择模块类型">
            <el-option
              v-for="dict in dict.type.sys_discuss_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版主" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入版主"/>
        </el-form-item>
        <el-form-item label="开放人员" prop="openUsers">
          <el-input v-model="form.openUsers" placeholder="请输入开放人员"/>
        </el-form-item>
        <el-form-item label="开放部门" prop="openDepts">
          <el-input v-model="form.openDepts" placeholder="请输入开放部门"/>
        </el-form-item>
        <el-form-item label="开放职务" prop="openRoles">
          <el-input v-model="form.openRoles" placeholder="请输入开放职务"/>
        </el-form-item>
        <el-form-item label="是否私有" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.value"
            >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
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
import { listDiscuss, getDiscuss, delDiscuss, addDiscuss, updateDiscuss } from '@/api/info/discuss'

export default {
  name: 'Discuss',
  dicts: ['sys_discuss_type', 'sys_yes_no'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 讨论区表格数据
      discussList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        sortNo: null,
        discussType: null,
        userId: null,
        openUsers: null,
        openDepts: null,
        openRoles: null,
        status: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询讨论区列表 */
    getList() {
      this.loading = true
      listDiscuss(this.queryParams).then(response => {
        this.discussList = response.rows
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
        recordId: null,
        title: null,
        sortNo: null,
        discussType: null,
        userId: null,
        openUsers: null,
        openDepts: null,
        openRoles: null,
        status: null,
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
      this.ids = selection.map(item => item.recordId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加讨论区'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const recordId = row.recordId || this.ids
      getDiscuss(recordId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改讨论区'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.recordId != null) {
            updateDiscuss(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addDiscuss(this.form).then(response => {
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
      const recordIds = row.recordId || this.ids
      this.$modal.confirm('是否确认删除讨论区编号为"' + recordIds + '"的数据项？').then(function() {
        return delDiscuss(recordIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('info/discuss/export', {
        ...this.queryParams
      }, `discuss_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
