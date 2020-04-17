<template>
  <div class="friend">
    <div class="friendHeader">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="列表名称" prop="name">
          <el-col :span="19">
            <el-input v-model="ruleForm.name" placeholder="输入公司名称" />
          </el-col>
        </el-form-item>

        <el-form-item label="添加好友">
          <el-col :span="17">
            <el-input ref="name" v-model="friend" placeholder="请输入聚餐好友用户名" @keyup.enter.native="handleFriend(friend)" />
          </el-col>
          <el-col :span="3">
            <el-button type="success" icon="el-icon-plus" circle style="margin-left:5px" @click.native.prevent="handleFriend(friend)" />
          </el-col>
        </el-form-item>

        <el-form-item label="已添加好友" prop="userList">
          <el-avatar v-for="(item,i) of ruleForm.userList" :key="i" style="margin-right:10px" :size="50"> {{ item }} </el-avatar>
        </el-form-item>

        <el-form-item label="卡片颜色" prop="color">
          <el-radio-group v-model="ruleForm.color">
            <el-radio v-for="(item,index) of colorsList" :key="index" :label="index" @change="changeColor(index)">{{ item }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-col :span="8">
            <el-card shadow="always" :style="{'background-image': ruleForm.color , 'color':fontcolor}">
              <p>{{ ruleForm.name }}</p>
            </el-card>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-tooltip class="item" effect="dark" content="创建您在公司的好友列表" placement="top">
            <el-button :loading="loading" type="success" @click="submitForm('ruleForm')">创建卡片</el-button>
          </el-tooltip>
          <el-button type="info" plain @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
import { getUser, submitUser } from '@/api/partner'
// import user from '../../../../mock/user'
const colorsList = ['百香果', '莲雾', '牛油果', '柠檬', '桑葚']
const colorsCss = ['linear-gradient(25deg, #060d20, #392930, #694540, #9c6451)', 'linear-gradient(25deg, #ca337e, #d97b91, #e2b6a5, #e6efb8)', 'linear-gradient(25deg, #506798, #5f829b, #6b9e9e, #75bba0)', 'linear-gradient(25deg, #008bca, #89afa1, #bfd671, #e9ff15)', 'linear-gradient(25deg, #00205a, #5e255d, #9b2460, #d81862)']
export default {
  data() {
    return {
      loading: false,
      friend: '',
      color: 'white',
      fontcolor: 'black',
      colorsList: colorsList,
      allUser: [],
      ruleForm: {
        name: '',
        color: '',
        userList: []
      },
      rules: {
        name: [
          { required: true, message: '请输入聚餐列表名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        userList: [
          { required: true, message: '请为列表添加好友', trigger: 'blur' }
        ],
        color: [
          { required: true, message: '为您的卡片挑个颜色', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    open1() {
      this.$notify({
        title: '成功',
        message: '好友列表新建成功',
        type: 'success'
      })
    },
    open2() {
      this.$notify.error({
        title: '错误',
        message: '不存在该用户，请核验用户名'
      })
    },
    open3() {
      this.$notify({
        title: '该用户已添加',
        message: '',
        type: 'warning'
      })
    },
    handleFriend(friend) {
      this.getUsereList()
      // console.log(friend)
      // console.log(this.allUser)
      const allUser = this.allUser
      const userList = this.ruleForm.userList
      if (allUser.includes(friend)) {
        if (userList.includes(friend)) {
          this.open3()
        } else {
          userList.push(friend)
        }
      } else {
        this.open2()
      }
    },
    getUsereList() {
      getUser().then((res, error) => {
        if (error) {
          console.log(error)
        } else {
          const data = res.data
          for (var i = 0; i < data.length; i++) {
            const user = data[i].username
            const allUser = this.allUser
            allUser.push(user)
          }
        }
      })
    },
    changeColor(index) {
      this.ruleForm.color = colorsCss[index]
      this.fontcolor = 'white'
      console.log(this.ruleForm.color)
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = this.ruleForm
          submitUser(data).then(() => {
            this.loading = false
            this.open1()
          }).catch(() => {
            this.loading = false
          })
        } else {
          alert('请输入列表信息')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.friendHeader{
    margin-top: 50px;
    position: relative;
    left: 8%;
}
</style>
