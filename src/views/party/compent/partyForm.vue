<template>
  <div>
    <el-alert
      v-if="showable"
      title="请输入聚餐消息"
      type="info"
      show-icon
      close-text="知道了"
    />
    <el-form ref="partyForm" :model="partyForm" :rules="rules" label-width="80px" style="margin:50px;">
      <el-form-item label="聚餐名称" prop="name">
        <el-input v-model="partyForm.name" placeholder="为这次聚餐取个名字" prefix-icon="el-icon-date" />
      </el-form-item>
      <el-form-item label="聚餐时间">
        <div class="partyData">
          <el-form-item prop="date1">
            <el-date-picker v-model="partyForm.date1" type="datetime" placeholder="请选择聚餐的日期和时间" default-time="19:00:00" style="width: 100%;" />
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="聚餐类型" prop="resource">
        <el-radio-group v-model="partyForm.resource">
          <el-radio label="员工聚餐" />
          <el-radio label="庆功宴" />
          <el-radio label="日常小聚" />
          <el-radio label="其他" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="食物选项" prop="dynamicTags">
        <el-tag
          v-for="tag in partyForm.dynamicTags"
          :key="tag"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="saveTagInput"
          v-model="partyForm.inputValue"
          class="input-new-tag"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 食物</el-button>
      </el-form-item>
      <el-form-item label="聚餐备注" prop="desc">
        <el-input v-model="partyForm.desc" type="textarea" maxlength="500" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="submitForm('partyForm')">立即创建</el-button>
        <el-button @click="resetForm('partyForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { submit } from '@/api/party'
export default {
  data() {
    return {
      partyForm: {
        name: '',
        date1: '',
        desc: '',
        resource: '',
        dynamicTags: [],
        inputValue: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择聚餐时间', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择聚餐类型', trigger: 'change' }
        ],
        dynamicTags: [
          { required: true, message: '请添加聚餐食物', trigger: 'blur' }
        ]
      },
      inputVisible: false,
      showable: false,
      // submitResult: false,
      loading: false
    }
  },
  methods: {
    open1() {
      this.$notify({
        title: '新建聚餐成功',
        message: '已发消息通知您的同伴',
        type: 'success'
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = this.partyForm
          submit(data).then(() => {
            this.loading = false
            // this.submitResult = true
            this.open1()
            this.resetForm(formName)
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.showable = true
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleClose(tag) {
      this.partyForm.dynamicTags.splice(this.partyForm.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.partyForm.inputValue
      if (inputValue) {
        this.partyForm.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.partyForm.inputValue = ''
    }
  }
}
</script>

<style  scoped>
  .el-tag {
    margin-right: 10px;
  }
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 100px;
    vertical-align: bottom;
  }
</style>

