<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="合同名称" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入合同名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="合同编号" prop="contractCode">-->
<!--        <el-input-->
<!--          v-model="queryParams.contractCode"-->
<!--          placeholder="请输入合同编号"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="合同类型" prop="contractType">-->
<!--        <el-select v-model="queryParams.contractType" placeholder="请选择合同类型" clearable>-->
<!--          <el-option-->
<!--            v-for="dict in dict.type.contract_type"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="合同开始期限" prop="startTime">-->
<!--        <el-date-picker clearable-->
<!--                        v-model="queryParams.startTime"-->
<!--                        type="date"-->
<!--                        value-format="yyyy-MM-dd"-->
<!--                        placeholder="请选择合同开始期限">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="合同结束期限" prop="endTime">-->
<!--        <el-date-picker clearable-->
<!--                        v-model="queryParams.endTime"-->
<!--                        type="date"-->
<!--                        value-format="yyyy-MM-dd"-->
<!--                        placeholder="请选择合同结束期限">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="签订时间" prop="signTime">-->
<!--        <el-date-picker clearable-->
<!--                        v-model="queryParams.signTime"-->
<!--                        type="date"-->
<!--                        value-format="yyyy-MM-dd"-->
<!--                        placeholder="请选择签订时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="结算方式" prop="payType">-->
<!--        <el-select v-model="queryParams.payType" placeholder="请选择结算方式" clearable>-->
<!--          <el-option-->
<!--            v-for="dict in dict.type.pay_type"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="结算币种" prop="cashType">-->
<!--        <el-select v-model="queryParams.cashType" placeholder="请选择结算币种" clearable>-->
<!--          <el-option-->
<!--            v-for="dict in dict.type.cash_type"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="合同总额" prop="total">-->
<!--        <el-input-->
<!--          v-model="queryParams.total"-->
<!--          placeholder="请输入合同总额"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="已收款" prop="realTotal">-->
<!--        <el-input-->
<!--          v-model="queryParams.realTotal"-->
<!--          placeholder="请输入已收款"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="是否为签订方" prop="isFirst">-->
<!--        <el-select v-model="queryParams.isFirst" placeholder="请选择是否为签订方" clearable>-->
<!--          <el-option-->
<!--            v-for="dict in dict.type.sys_yes_no"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="签订地址" prop="signAddr">-->
<!--        <el-input-->
<!--          v-model="queryParams.signAddr"-->
<!--          placeholder="请输入签订地址"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option
            v-for="dict in dict.type.sys_normal_disable"
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
          v-hasPermi="['contract:create:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['contract:create:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['contract:create:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['contract:create:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="createList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="合同ID" align="center" prop="contractId" />-->
      <el-table-column label="合同名称" align="center" prop="title" />
      <el-table-column label="合同编号" align="center" prop="contractCode" />
      <el-table-column label="合同类型" align="center" prop="contractType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.contract_type" :value="scope.row.contractType"/>
        </template>
      </el-table-column>
      <el-table-column label="合同开始期限" align="center" prop="startTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同结束期限" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="签订时间" align="center" prop="signTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.signTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="结算方式" align="center" prop="payType">-->
<!--        <template slot-scope="scope">-->
<!--          <dict-tag :options="dict.type.pay_type" :value="scope.row.payType"/>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="结算币种" align="center" prop="cashType">-->
<!--        <template slot-scope="scope">-->
<!--          <dict-tag :options="dict.type.cash_type" :value="scope.row.cashType"/>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="合同总额" align="center" prop="total" />-->
<!--      <el-table-column label="已收款" align="center" prop="realTotal" />-->
<!--      <el-table-column label="是否为签订方" align="center" prop="isFirst">-->
<!--        <template slot-scope="scope">-->
<!--          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isFirst"/>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="签订地址" align="center" prop="signAddr" />-->
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
        </template>
      </el-table-column>
<!--      <el-table-column label="合同说明" align="center" prop="contenxt" />-->
<!--      <el-table-column label="合同附件" align="center" prop="fileAttach" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['contract:create:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['contract:create:remove']"
          >删除</el-button>
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

    <!-- 添加或修改合同对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="合同名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入合同名称" />
        </el-form-item>
        <el-form-item label="合同编号" prop="contractCode">
          <el-input v-model="form.contractCode" placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="合同类型" prop="contractType">
          <el-select v-model="form.contractType" placeholder="请选择合同类型">
            <el-option
              v-for="dict in dict.type.contract_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同开始期限" prop="startTime">
          <el-date-picker clearable
                          v-model="form.startTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择合同开始期限">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同结束期限" prop="endTime">
          <el-date-picker clearable
                          v-model="form.endTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择合同结束期限">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="签订时间" prop="signTime">
          <el-date-picker clearable
                          v-model="form.signTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择签订时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结算方式" prop="payType">
          <el-select v-model="form.payType" placeholder="请选择结算方式">
            <el-option
              v-for="dict in dict.type.pay_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算币种" prop="cashType">
          <el-select v-model="form.cashType" placeholder="请选择结算币种">
            <el-option
              v-for="dict in dict.type.cash_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同总额" prop="total">
          <el-input v-model="form.total" placeholder="请输入合同总额" />
        </el-form-item>
        <el-form-item label="已收款" prop="realTotal">
          <el-input v-model="form.realTotal" placeholder="请输入已收款" />
        </el-form-item>
        <el-form-item label="是否为签订方" prop="isFirst">
          <el-radio-group v-model="form.isFirst">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="签订地址" prop="signAddr">
          <el-input v-model="form.signAddr" placeholder="请输入签订地址" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="合同说明">
          <editor v-model="form.contenxt" :min-height="192"/>
        </el-form-item>
        <el-form-item label="合同附件" prop="fileAttach">
          <file-upload v-model="form.fileAttach"/>
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
import { listCreate, getCreate, delCreate, addCreate, updateCreate } from "@/api/finance/contract/create";

export default {
  name: "Create",
  dicts: ['pay_type', 'sys_yes_no', 'cash_type', 'sys_normal_disable', 'contract_type'],
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
      // 合同表格数据
      createList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        contractCode: null,
        contractType: null,
        startTime: null,
        endTime: null,
        signTime: null,
        payType: null,
        cashType: null,
        total: null,
        realTotal: null,
        isFirst: null,
        signAddr: null,
        status: null,
        contenxt: null,
        fileAttach: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询合同列表 */
    getList() {
      this.loading = true;
      listCreate(this.queryParams).then(response => {
        this.createList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        contractId: null,
        title: null,
        contractCode: null,
        contractType: null,
        startTime: null,
        endTime: null,
        signTime: null,
        payType: null,
        cashType: null,
        total: null,
        realTotal: null,
        isFirst: null,
        signAddr: null,
        status: null,
        contenxt: null,
        fileAttach: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.contractId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加合同";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const contractId = row.contractId || this.ids
      getCreate(contractId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改合同";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.contractId != null) {
            updateCreate(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCreate(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const contractIds = row.contractId || this.ids;
      this.$modal.confirm('是否确认删除合同编号为"' + contractIds + '"的数据项？').then(function() {
        return delCreate(contractIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('contract/create/export', {
        ...this.queryParams
      }, `create_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
