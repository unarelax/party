<template>
  <div class="friend">
    <el-alert
      v-if="showable"
      title="请输入聚餐消息"
      type="info"
      show-icon
      close-text="知道了"
    />
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
          <div v-for="(item,i) of ruleForm.avatarList" :key="i" style="margin-right:10px" class="deavatar">
            <el-avatar :size="50" :src="item" @error="errorHandler" />
            <i class="el-icon-remove del" @click="delAva(i)" />
          </div>
        </el-form-item>

        <el-form-item label="卡片颜色" prop="color">
          <el-radio-group v-model="ruleForm.color[0]" :value="radio">
            <el-radio v-for="(item,index) of colorsList" :key="index" :label="item" @change="changeColor(index)">{{ item }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-col :span="8">
            <el-card shadow="always" :style="{'background-image': ruleForm.color , 'color':fontcolor}">
              <p style="font-size: 18px">{{ ruleForm.name }}</p>
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
      showable: false,
      radio: '百香果',
      loading: false,
      friend: '',
      color: 'white',
      fontcolor: 'black',
      colorsList: colorsList,
      allUser: [],
      avatars: [],
      ruleForm: {
        name: '',
        color: '',
        userList: [],
        avatarList: []
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
    delAva(i) {
      this.ruleForm.userList.splice(i, 1)
      this.ruleForm.avatarList.splice(i, 1)
      console.log(this.ruleForm.userList, this.ruleForm.avatarList)
    },
    errorHandler() {
      return true
    },
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
      const avatars = this.avatars
      const userList = this.ruleForm.userList
      const avatarList = this.ruleForm.avatarList
      const data = allUser.indexOf(friend)
      if (data !== -1) {
        if (userList.includes(friend)) {
          this.open3()
        } else {
          userList.push(friend)
          avatarList.push(avatars[data])
          this.friend = ''
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
            const avatar = data[i].avatar
            const allUser = this.allUser
            const avatars = this.avatars
            avatars.push(avatar)
            allUser.push(user)
          }
        }
      })
    },
    changeColor(index) {
      this.ruleForm.color = colorsCss[index]
      this.fontcolor = 'white'
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = this.ruleForm
          submitUser(data).then(() => {
            this.loading = false
            this.open1()
            this.resetForm(ruleForm)
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
      this.ruleForm.userList = []
      this.ruleForm.avatarList = []
      this.friend = ''
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
.deavatar{
  display: inline-block;
  position: relative;
}
.del{
  color: #f56c6c;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
