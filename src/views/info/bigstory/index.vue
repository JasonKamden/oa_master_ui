<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="事记标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入事记标题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="事记日期" prop="happenTime">
        <el-date-picker clearable
          v-model="queryParams.happenTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择事记日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="事记类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择事记类型" clearable>
          <el-option
            v-for="dict in dict.type.sys_bigstory_type"
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
          v-hasPermi="['info:bigstory:add']"
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
          v-hasPermi="['info:bigstory:edit']"
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
          v-hasPermi="['info:bigstory:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['info:bigstory:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="bigstoryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="主键" align="center" prop="attachId" />-->
      <el-table-column label="事记标题" align="center" prop="title" />
      <el-table-column label="事记日期" align="center" prop="happenTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.happenTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="事记类型" align="center" prop="type">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_bigstory_type" :value="scope.row.type"/>
        </template>
      </el-table-column>
      <el-table-column label="事记摘要" align="center" prop="context" >
        <template slot-scope="scope">
          <span v-html="scope.row.context"></span>
        </template>
      </el-table-column>
      <el-table-column label="事记图片" align="center" prop="mainPicture" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.mainPicture" :width="50" :height="50"/>
        </template>
      </el-table-column>
<!--      <el-table-column label="附件" align="center" prop="attachFile" />-->
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['info:bigstory:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['info:bigstory:remove']"
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

    <!-- 添加或修改大事记管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="事记标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入事记标题" />
        </el-form-item>
        <el-form-item label="事记日期" prop="happenTime">
          <el-date-picker clearable
            v-model="form.happenTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择事记日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="事记类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择事记类型">
            <el-option
              v-for="dict in dict.type.sys_bigstory_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="事记摘要">
          <editor v-model="form.context" :min-height="192"/>
        </el-form-item>
        <el-form-item label="事记图片" prop="mainPicture">
          <image-upload v-model="form.mainPicture"/>
        </el-form-item>
        <el-form-item label="附件" prop="attachFile">
          <file-upload v-model="form.attachFile"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
import { listBigstory, getBigstory, delBigstory, addBigstory, updateBigstory } from "@/api/info/bigstory";

export default {
  name: "Bigstory",
  dicts: ['sys_bigstory_type'],
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
      // 大事记管理表格数据
      bigstoryList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        happenTime: null,
        type: null,
        context: null,
        mainPicture: null,
        attachFile: null,
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
    /** 查询大事记管理列表 */
    getList() {
      this.loading = true;
      listBigstory(this.queryParams).then(response => {
        this.bigstoryList = response.rows;
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
        attachId: null,
        title: null,
        happenTime: null,
        type: null,
        context: null,
        mainPicture: null,
        attachFile: null,
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
      this.ids = selection.map(item => item.attachId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加大事记管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const attachId = row.attachId || this.ids
      getBigstory(attachId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改大事记管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.attachId != null) {
            updateBigstory(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBigstory(this.form).then(response => {
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
      const attachIds = row.attachId || this.ids;
      this.$modal.confirm('是否确认删除大事记管理编号为"' + attachIds + '"的数据项？').then(function() {
        return delBigstory(attachIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('info/bigstory/export', {
        ...this.queryParams
      }, `bigstory_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
