<template>
  <div class="allBackground">
    <div class="head">
      <p class="headTitle"> 聚餐列表 (共 {{ list.length }} 条）</p>
      <p class="headBody"> 您所创建和所参加的聚餐都会在这里显示 </p>
      <!-- <el-button type="success" circle>111</el-button> -->
    </div>
    <el-row>
      <el-col v-for="(item, i) of list" :key="i" ref="i" :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="color:#0d0d0d; font-weight: 700; font-size: 18px; line-height:35px">{{ (i+1) +'. '+ item.name }}</span>
            <el-tooltip class="item" effect="dark" content="注意！删除后不可恢复" placement="top">
              <el-button :loading="loading" type="info" style="font-size: 8px" icon="el-icon-delete" class="button" circle @click="deleteParty(item._id)" />
            </el-tooltip>
          </div>

          <div class="text item">
            <div class="title">
              <div class="itemTitle">
                <p style=" line-height:1.7; max-width:330px">
                  <i class="cardBody el-icon-user" />{{ item.leader }}发起的<i class="cardBody el-icon-goblet-square-full" />{{ item.type }}会在
                  <i class="cardBody el-icon-time" />{{ item.time }}开始， 他邀请了<i class="cardBody el-icon-message" />
                  <span v-for="(index, j) of item.memberList" :key="j">{{ ' '+index }}</span>（<i class="cardBody el-icon-chat-dot-round" />{{ item.desc }}）
                </p>
              </div>
              <div class="itemBottom">
                <div class="tagTitle">食物选择：</div>
                <span v-for="(index, j) of item.select" :key="j" class="tagBody">{{ index }}</span>
              </div>
              <!-- <div class="itemMoney">
                <span class="tagTitle">添加聚餐总金额：</span>
                <el-button v-if="addMoney" type="info" icon="el-icon-plus" size="mini" plain @click="insertMoney(item._id)" />
                <el-input v-if="!addMoney" v-model="input" size="mini" style="width:100px" />
                <span style="padding-left:5px">元</span>
              </div> -->
              <div v-if="allMoney[i]" class="itemMoney">
                <span class="tagTitle">添加聚餐花费：</span>
                <el-button v-if="addMoney[i]" type="info" icon="el-icon-plus" size="mini" plain @click="insertMoney(i)" />
                <el-input v-if="inputMoney[i]" ref="saveTagInput" v-model="inputValue[i]" size="mini" style="width:100px" @keyup.enter.native="handleInputConfirm(i,item._id)" />
                <el-tag
                  v-if="tagMoney[i]"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(i)"
                >
                  {{ dynamicTags[i] }}
                </el-tag>
                <span style="padding-left:5px">元</span>
              </div>
              <div v-if="!allMoney[i]" class="itemMoney">
                <span class="tagTitle">此次聚餐花费</span>
                <span style="padding-left:5px">{{ item.money }} 元</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getParty, remove } from '@/api/party'
export default {
  // props: {
  //   listLength: {
  //     type: Object,
  //     default: function() {
  //       return this.list.length
  //     }
  //   }
  // },
  data() {
    return {
      allMoney: [],
      addMoney: [],
      inputMoney: [],
      tagMoney: [],
      list: Array,
      date: '',
      loading: false,
      inputValue: [],
      dynamicTags: []
    }
  },
  created() {
    this.getPartyList()
  },
  // beforeDestroy() {
  //   this.postMoney()
  // },
  methods: {
    // postMoney() {
    //   remove(this.dynamicTags)
    // },
    open1() {
      this.$notify({
        title: '聚餐删除成功',
        type: 'success'
      })
    },
    open2() {
      this.$notify({
        title: '请输入聚餐花费',
        type: 'error'
      })
    },
    open3() {
      this.$notify({
        title: '请输入数字',
        type: 'error'
      })
    },
    deleteParty(item) {
      const index = [item]
      console.log(index)
      this.loading = true
      remove(index).then(() => {
        this.loading = false
        this.getPartyList()
        this.open1()
      }).catch(() => {
        this.loading = false
      })
    },
    handleClose(i) {
      this.dynamicTags[i] = ''
      this.inputValue[i] = ''
      this.$set(this.tagMoney, i, false)
      setTimeout(() => {
        this.$set(this.addMoney, i, true)
      }, 300)
      // setInterval(this.$set(this.addMoney, i, true), 10000)
      // this.$set(this.addMoney, i, true)
      // this.addMoney[i] = true
      // this.tagMoney[i] = false
    },
    insertMoney(i) {
      console.log(i)
      this.$set(this.addMoney, i, false)
      this.$set(this.inputMoney, i, true)
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
      // this.$refs.saveTagInput.$refs.input.focus()
      // this.$nextTick(_ => {
      //   this.$refs.input.focus()
      // })

      // this.addMoney[i] = false
      // this.inputMoney[i] = true
    },
    handleInputConfirm(i, id) {
      var numReg = /^[0-9]+$/
      var numRe = new RegExp(numReg)
      if (this.inputValue[i]) {
        if (!numRe.test(this.inputValue[i])) {
          this.open3()
        } else {
          const money = this.inputValue[i]
          const arr = [id, money]
          remove(arr).then(() => {
            this.$set(this.inputMoney, i, false)
            this.getPartyList()
          })
          // this.dynamicTags[i] = this.inputValue[i]
          // this.$set(this.inputMoney, i, false)
          // this.$set(this.tagMoney, i, true)
        }
      } else {
        this.open2()
      }
    },
    localDate(v) {
      const d = new Date(v)
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
      return d.toISOString()
    },
    getPartyList() {
      getParty().then((res, error) => {
        if (error) {
          console.log(error)
        } else {
        //   const data = res.data
          console.log(res)
          const partydata = res.data[0].partydata
          this.list = partydata.reverse()
          for (var j = 0; j < this.list.length; j++) {
            if (partydata[j].money) {
              this.$set(this.allMoney, j, false)
            } else {
              this.$set(this.allMoney, j, true)
              this.$set(this.addMoney, j, true)
            }
          }
        }
      })
    },
    getArrayIndex(arr, obj) {
      var i = arr.length
      while (i--) {
        if (arr[i] === obj) {
          return i
        }
      }
      return -1
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
  .headLabel{
    margin-top: 15px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    background: #ff4ef6;
    border-radius: 4em;
  }
  html{
      /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
      -ms-overflow-style:none;
      /*火狐下隐藏滚动条*/
      overflow:-moz-scrollbars-none;
  }
  //谷歌适用
  ::-webkit-scrollbar{
      display:none;
  }
  .allBackground {
    background-color: $main;
  }
  .head {
    margin-left: 25px;
    max-width: 600px;
    margin-bottom: 10px;
  }
  .headTitle {
    margin: 0;
    padding: 30px 0 10px 0;
    color: $fontTitle;
    font-size: 25px;
    font-weight: 700;
  }
  .headBody {
    margin: 0;
    margin-bottom: 10px;
    color:$fontTitle;
    font-size: 15px;
    line-height: 1.3;
    font-weight: 400;
  }
  .button {
    float: right;
  }
  .text {
    font-size: 14px;
  }
  .title{
    max-width: 310px;
    overflow-y: scroll;
    height: 230px;
    width: 100%;
    overflow-x: hidden;
  }

  .item {
    margin-bottom: 18px;
    // display: flex;
    // overflow-y: scroll;
    // height: 250px;
  }

  .itemTitle {
    // flex-shrink: 0;
    margin-bottom: 20px;
  }

  .itemBottom {
    margin-bottom: 0px;
  }

  .tagTitle {
    color: $fontTitle;
    font-weight: 700;
  }

  .itemMoney{
    margin-top: 30px;
  }

  .tagBody {
    display: inline-block;
    margin-right: 8px;
    margin-top: 8px;
    padding: 5px 10px;
    border-radius: 3px;
    color: $white;
    background-color: $hightLigth;
    font-size: 14px;
    font-weight: 700;
  }
  .cardBody {
    color: $hightLigth;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    margin: 20px;
    padding: 10px;
    max-width: 480px;
  }
</style>
