<template>
  <div class="list">
    <div>
      <el-row :gutter="12">
        <el-col v-for="(item, i) of partner" :key="i" :span="8">
          <el-card class="box-card" :style="{'background-image': item.color , 'color':fontcolor}">
            <p style="font-size: 18px">{{ item.name }}</p>
            <div class="block">
              <div v-for="(index, j) of item.userList" :key="j" class="avatar">
                <el-avatar class="title" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <span style="line-height:1.5">{{ index }}</span>
              </div>
            </div>
            <div class="buttom">
              <i class="el-icon-edit" style="padding-right:10px" />
              <i class="el-icon-delete" style="margin-right:-10px" @click="open(item._id)" />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
import { getList, deleteUser } from '@/api/partner'
export default {
  data() {
    return {
      fontcolor: 'white',
      partner: Array
    }
  },
  created() {
    this.getUerList()
  },
  methods: {
    open(item) {
      const index = [item]
      this.$confirm('是否继续删除改好友列表?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(index).then(() => {
          this.getUerList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getUerList() {
      getList().then((res, error) => {
        if (error) {
          console.log(error)
        } else {
          const userdata = res.data[0].friendList
          console.log(userdata)
          this.partner = userdata
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  .list {
    padding-top: 30px;
    background-color: #eff0f3;
  }
  .avatar {
    display: inline-block;
    padding-top: 8px;
    padding-right: 20px;
  }
  .title {
    display: block;
    margin:  0 auto;
  }
  .box-card {
    border-radius:5px;
    border: 0px;
    margin: 20px;
    padding: 10px;
    max-width: 480px;
  }
  .buttom{
    margin-top: 12px;
    margin-bottom: 10px;
    float: right;
  }
</style>
