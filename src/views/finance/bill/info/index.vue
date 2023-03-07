<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="账单" prop="recordId">
        <el-input
          v-model="queryParams.recordId"
          placeholder="请输入账单"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="发票编号" prop="billCode">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.billCode"-->
      <!--          placeholder="请输入发票编号"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item label="发票类型" prop="billType">
        <el-select v-model="queryParams.billType" placeholder="请选择发票类型" clearable>
          <el-option
            v-for="dict in dict.type.bill_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="票据事件" prop="isOpen">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.isOpen"-->
      <!--          placeholder="请输入票据事件"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="发票金额" prop="total">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.total"-->
      <!--          placeholder="请输入发票金额"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item label="开票日期" prop="billTime">
        <el-date-picker clearable
                        v-model="queryParams.billTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择开票日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="发票状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择发票状态" clearable>
          <el-option
            v-for="dict in dict.type.bill_status"
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
          v-hasPermi="['bill:info:add']"
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
          v-hasPermi="['bill:info:edit']"
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
          v-hasPermi="['bill:info:remove']"
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
          v-hasPermi="['bill:info:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="infoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <!--      <el-table-column label="票据编号" align="center" prop="billId" />-->
      <el-table-column label="账单" align="center" prop="recordId"/>
      <el-table-column label="发票编号" align="center" prop="billCode" width="250">
        <template slot-scope="scope">
          <barcode v-bind:value="scope.row.billCode"
                   height="50"
                   displayValue="false"
          >
            Show this if the rendering fails.
          </barcode>
        </template>
      </el-table-column>
      <el-table-column label="发票类型" align="center" prop="billType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.bill_type" :value="scope.row.billType"/>
        </template>
      </el-table-column>
      <el-table-column label="票据事件" align="center" prop="isOpen">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.bill_event" :value="scope.row.isOpen"/>
        </template>
      </el-table-column>
      <el-table-column label="发票金额" align="center" prop="total"/>
      <el-table-column label="开票日期" align="center" prop="billTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.billTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发票状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.bill_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <!--      <el-table-column label="附件" align="center" prop="fileAttach" />-->
      <!--      <el-table-column label="备注" align="center" prop="remark" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['bill:info:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['bill:info:remove']"
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

    <!-- 添加或修改票据详情对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="账单ID" prop="recordId">
          <el-input v-model="form.recordId" placeholder="请输入账单ID"/>
        </el-form-item>
        <el-form-item label="发票编号" prop="billCode">
          <el-input v-model="form.billCode" placeholder="请输入发票编号"/>
        </el-form-item>
        <el-form-item label="发票类型" prop="billType">
          <el-select v-model="form.billType" placeholder="请选择发票类型">
            <el-option
              v-for="dict in dict.type.bill_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="票据事件" prop="isOpen">
          <el-input v-model="form.isOpen" placeholder="请输入票据事件"/>
        </el-form-item>
        <el-form-item label="发票金额" prop="total">
          <el-input v-model="form.total" placeholder="请输入发票金额"/>
        </el-form-item>
        <el-form-item label="开票日期" prop="billTime">
          <el-date-picker clearable
                          v-model="form.billTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择开票日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发票状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.bill_status"
              :key="dict.value"
              :label="dict.value"
            >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="附件" prop="fileAttach">
          <file-upload v-model="form.fileAttach"/>
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
import { listInfo, getInfo, delInfo, addInfo, updateInfo } from '@/api/finance/bill/info'
import VueBarcode from 'vue-barcode'

export default {
  name: 'Info',
  dicts: ['bill_type', 'bill_status'],
  components: {
    'barcode': VueBarcode
  },
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
      // 票据详情表格数据
      infoList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        recordId: null,
        billCode: null,
        billType: null,
        isOpen: null,
        total: null,
        billTime: null,
        status: null,
        fileAttach: null
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
    /** 查询票据详情列表 */
    getList() {
      this.loading = true
      listInfo(this.queryParams).then(response => {
        this.infoList = response.rows
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
        billId: null,
        recordId: null,
        billCode: null,
        billType: null,
        isOpen: null,
        total: null,
        billTime: null,
        status: null,
        fileAttach: null,
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
      this.ids = selection.map(item => item.billId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加票据详情'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const billId = row.billId || this.ids
      getInfo(billId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改票据详情'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.billId != null) {
            updateInfo(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addInfo(this.form).then(response => {
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
      const billIds = row.billId || this.ids
      this.$modal.confirm('是否确认删除票据详情编号为"' + billIds + '"的数据项？').then(function() {
        return delInfo(billIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('bill/info/export', {
        ...this.queryParams
      }, `info_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
