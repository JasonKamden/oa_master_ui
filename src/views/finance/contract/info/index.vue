<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="合同ID" prop="contractId">
        <el-input
          v-model="queryParams.contractId"
          placeholder="请输入合同"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="甲方名称" prop="firstName">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.firstName"-->
      <!--          placeholder="请输入甲方名称"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="乙方名称" prop="secondName">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.secondName"-->
      <!--          placeholder="请输入乙方名称"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="甲方地址" prop="firstAddr">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.firstAddr"-->
      <!--          placeholder="请输入甲方地址"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="乙方地址" prop="secondAddr">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.secondAddr"-->
      <!--          placeholder="请输入乙方地址"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="甲方法人" prop="firstLegalPerson">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.firstLegalPerson"-->
      <!--          placeholder="请输入甲方法人"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="乙方法人" prop="secondLegalPerson">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.secondLegalPerson"-->
      <!--          placeholder="请输入乙方法人"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="甲方签订人" prop="firstSignUser">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.firstSignUser"-->
      <!--          placeholder="请输入甲方签订人"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="乙方签订人" prop="secondSignUser">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.secondSignUser"-->
      <!--          placeholder="请输入乙方签订人"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="甲方联系电话" prop="firstMobile">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.firstMobile"-->
      <!--          placeholder="请输入甲方联系电话"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="乙方联系电话" prop="secondMobile">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.secondMobile"-->
      <!--          placeholder="请输入乙方联系电话"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="甲方开户行" prop="firstBank">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.firstBank"-->
      <!--          placeholder="请输入甲方开户行"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="乙方开户行" prop="secondBank">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.secondBank"-->
      <!--          placeholder="请输入乙方开户行"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="甲方账号" prop="firstBankAccount">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.firstBankAccount"-->
      <!--          placeholder="请输入甲方账号"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="乙方账号" prop="secondBankAccount">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.secondBankAccount"-->
      <!--          placeholder="请输入乙方账号"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="甲方税号" prop="firstTaxNo">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.firstTaxNo"-->
      <!--          placeholder="请输入甲方税号"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="乙方税号" prop="secondTaxNo">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.secondTaxNo"-->
      <!--          placeholder="请输入乙方税号"-->
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
          v-hasPermi="['contract:info:add']"
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
          v-hasPermi="['contract:info:edit']"
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
          v-hasPermi="['contract:info:remove']"
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
          v-hasPermi="['contract:info:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="infoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <!--      <el-table-column label="合同甲乙方ID" align="center" prop="infoId" />-->
      <el-table-column label="合同" align="center" prop="contractId"/>
      <!--      <el-table-column label="甲方名称" align="center" prop="firstName" />-->
      <!--      <el-table-column label="乙方名称" align="center" prop="secondName" />-->
      <!--      <el-table-column label="甲方地址" align="center" prop="firstAddr" />-->
      <!--      <el-table-column label="乙方地址" align="center" prop="secondAddr" />-->
      <!--      <el-table-column label="甲方法人" align="center" prop="firstLegalPerson" />-->
      <!--      <el-table-column label="乙方法人" align="center" prop="secondLegalPerson" />-->
      <!--      <el-table-column label="甲方签订人" align="center" prop="firstSignUser" />-->
      <!--      <el-table-column label="乙方签订人" align="center" prop="secondSignUser" />-->
      <!--      <el-table-column label="甲方联系电话" align="center" prop="firstMobile" />-->
      <!--      <el-table-column label="乙方联系电话" align="center" prop="secondMobile" />-->
      <!--      <el-table-column label="甲方开户行" align="center" prop="firstBank" />-->
      <!--      <el-table-column label="乙方开户行" align="center" prop="secondBank" />-->
      <!--      <el-table-column label="甲方账号" align="center" prop="firstBankAccount" />-->
      <!--      <el-table-column label="乙方账号" align="center" prop="secondBankAccount" />-->
      <!--      <el-table-column label="甲方税号" align="center" prop="firstTaxNo" />-->
      <!--      <el-table-column label="乙方税号" align="center" prop="secondTaxNo" />-->
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
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
            v-hasPermi="['contract:info:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['contract:info:remove']"
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

    <!-- 添加或修改合同详情对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="合同ID" prop="contractId">
          <el-input v-model="form.contractId" placeholder="请输入合同ID"/>
        </el-form-item>
        <el-form-item label="甲方名称" prop="firstName">
          <el-input v-model="form.firstName" placeholder="请输入甲方名称"/>
        </el-form-item>
        <el-form-item label="乙方名称" prop="secondName">
          <el-input v-model="form.secondName" placeholder="请输入乙方名称"/>
        </el-form-item>
        <el-form-item label="甲方地址" prop="firstAddr">
          <el-input v-model="form.firstAddr" placeholder="请输入甲方地址"/>
        </el-form-item>
        <el-form-item label="乙方地址" prop="secondAddr">
          <el-input v-model="form.secondAddr" placeholder="请输入乙方地址"/>
        </el-form-item>
        <el-form-item label="甲方法人" prop="firstLegalPerson">
          <el-input v-model="form.firstLegalPerson" placeholder="请输入甲方法人"/>
        </el-form-item>
        <el-form-item label="乙方法人" prop="secondLegalPerson">
          <el-input v-model="form.secondLegalPerson" placeholder="请输入乙方法人"/>
        </el-form-item>
        <el-form-item label="甲方签订人" prop="firstSignUser">
          <el-input v-model="form.firstSignUser" placeholder="请输入甲方签订人"/>
        </el-form-item>
        <el-form-item label="乙方签订人" prop="secondSignUser">
          <el-input v-model="form.secondSignUser" placeholder="请输入乙方签订人"/>
        </el-form-item>
        <el-form-item label="甲方联系电话" prop="firstMobile">
          <el-input v-model="form.firstMobile" placeholder="请输入甲方联系电话"/>
        </el-form-item>
        <el-form-item label="乙方联系电话" prop="secondMobile">
          <el-input v-model="form.secondMobile" placeholder="请输入乙方联系电话"/>
        </el-form-item>
        <el-form-item label="甲方开户行" prop="firstBank">
          <el-input v-model="form.firstBank" placeholder="请输入甲方开户行"/>
        </el-form-item>
        <el-form-item label="乙方开户行" prop="secondBank">
          <el-input v-model="form.secondBank" placeholder="请输入乙方开户行"/>
        </el-form-item>
        <el-form-item label="甲方账号" prop="firstBankAccount">
          <el-input v-model="form.firstBankAccount" placeholder="请输入甲方账号"/>
        </el-form-item>
        <el-form-item label="乙方账号" prop="secondBankAccount">
          <el-input v-model="form.secondBankAccount" placeholder="请输入乙方账号"/>
        </el-form-item>
        <el-form-item label="甲方税号" prop="firstTaxNo">
          <el-input v-model="form.firstTaxNo" placeholder="请输入甲方税号"/>
        </el-form-item>
        <el-form-item label="乙方税号" prop="secondTaxNo">
          <el-input v-model="form.secondTaxNo" placeholder="请输入乙方税号"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-divider content-position="center">合同信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddSysContract">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteSysContract">删除</el-button>
          </el-col>
        </el-row>
        <el-table :data="sysContractList" :row-class-name="rowSysContractIndex"
                  @selection-change="handleSysContractSelectionChange" ref="sysContract"
        >
          <el-table-column type="selection" width="50" align="center"/>
          <el-table-column label="序号" align="center" prop="index" width="50"/>
          <el-table-column label="合同名称" prop="title" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.title" placeholder="请输入合同名称"/>
            </template>
          </el-table-column>
          <el-table-column label="合同编号" prop="contractCode" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.contractCode" placeholder="请输入合同编号"/>
            </template>
          </el-table-column>
          <el-table-column label="合同类型" prop="contractType" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.contractType" placeholder="请选择合同类型">
                <el-option
                  v-for="dict in dict.type.contract_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="合同开始期限" prop="startTime" width="240">
            <template slot-scope="scope">
              <el-date-picker clearable v-model="scope.row.startTime" type="date" value-format="yyyy-MM-dd"
                              placeholder="请选择合同开始期限"
              />
            </template>
          </el-table-column>
          <el-table-column label="合同结束期限" prop="endTime" width="240">
            <template slot-scope="scope">
              <el-date-picker clearable v-model="scope.row.endTime" type="date" value-format="yyyy-MM-dd"
                              placeholder="请选择合同结束期限"
              />
            </template>
          </el-table-column>
          <el-table-column label="签订时间" prop="signTime" width="240">
            <template slot-scope="scope">
              <el-date-picker clearable v-model="scope.row.signTime" type="date" value-format="yyyy-MM-dd"
                              placeholder="请选择签订时间"
              />
            </template>
          </el-table-column>
          <el-table-column label="结算方式" prop="payType" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.payType" placeholder="请选择结算方式">
                <el-option
                  v-for="dict in dict.type.pay_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="结算币种" prop="cashType" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.cashType" placeholder="请选择结算币种">
                <el-option
                  v-for="dict in dict.type.cash_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="合同总额" prop="total" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.total" placeholder="请输入合同总额"/>
            </template>
          </el-table-column>
          <el-table-column label="已收款" prop="realTotal" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.realTotal" placeholder="请输入已收款"/>
            </template>
          </el-table-column>
          <el-table-column label="是否为签订方" prop="isFirst" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.isFirst" placeholder="请选择是否为签订方">
                <el-option
                  v-for="dict in dict.type.sys_yes_no"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="签订地址" prop="signAddr" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.signAddr" placeholder="请输入签订地址"/>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="status" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" placeholder="请选择状态">
                <el-option
                  v-for="dict in dict.type.sys_normal_disable"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listInfo, getInfo, delInfo, addInfo, updateInfo } from '@/api/finance/contract/info'

export default {
  name: 'Info',
  dicts: ['pay_type', 'sys_yes_no', 'cash_type', 'sys_normal_disable', 'contract_type'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedSysContract: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 合同详情表格数据
      infoList: [],
      // 合同表格数据
      sysContractList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        contractId: null,
        firstName: null,
        secondName: null,
        firstAddr: null,
        secondAddr: null,
        firstLegalPerson: null,
        secondLegalPerson: null,
        firstSignUser: null,
        secondSignUser: null,
        firstMobile: null,
        secondMobile: null,
        firstBank: null,
        secondBank: null,
        firstBankAccount: null,
        secondBankAccount: null,
        firstTaxNo: null,
        secondTaxNo: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        contractId: [
          { required: true, message: '合同ID不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询合同详情列表 */
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
        infoId: null,
        contractId: null,
        firstName: null,
        secondName: null,
        firstAddr: null,
        secondAddr: null,
        firstLegalPerson: null,
        secondLegalPerson: null,
        firstSignUser: null,
        secondSignUser: null,
        firstMobile: null,
        secondMobile: null,
        firstBank: null,
        secondBank: null,
        firstBankAccount: null,
        secondBankAccount: null,
        firstTaxNo: null,
        secondTaxNo: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      }
      this.sysContractList = []
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
      this.ids = selection.map(item => item.infoId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加合同详情'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const infoId = row.infoId || this.ids
      getInfo(infoId).then(response => {
        this.form = response.data
        this.sysContractList = response.data.sysContractList
        this.open = true
        this.title = '修改合同详情'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.sysContractList = this.sysContractList
          if (this.form.infoId != null) {
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
      const infoIds = row.infoId || this.ids
      this.$modal.confirm('是否确认删除合同详情编号为"' + infoIds + '"的数据项？').then(function() {
        return delInfo(infoIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 合同序号 */
    rowSysContractIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 合同添加按钮操作 */
    handleAddSysContract() {
      let obj = {}
      obj.title = ''
      obj.contractCode = ''
      obj.contractType = ''
      obj.startTime = ''
      obj.endTime = ''
      obj.signTime = ''
      obj.payType = ''
      obj.cashType = ''
      obj.total = ''
      obj.realTotal = ''
      obj.isFirst = ''
      obj.signAddr = ''
      obj.status = ''
      obj.contenxt = ''
      obj.fileAttach = ''
      this.sysContractList.push(obj)
    },
    /** 合同删除按钮操作 */
    handleDeleteSysContract() {
      if (this.checkedSysContract.length == 0) {
        this.$modal.msgError('请先选择要删除的合同数据')
      } else {
        const sysContractList = this.sysContractList
        const checkedSysContract = this.checkedSysContract
        this.sysContractList = sysContractList.filter(function(item) {
          return checkedSysContract.indexOf(item.index) == -1
        })
      }
    },
    /** 复选框选中数据 */
    handleSysContractSelectionChange(selection) {
      this.checkedSysContract = selection.map(item => item.index)
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('contract/info/export', {
        ...this.queryParams
      }, `info_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
