<template>
  <div class="allBackground">
    <div class="head">
      <p class="headTitle"> 聚餐列表 </p>
      <p class="headBody"> 您所创建和所参加的聚餐都会在这里显示 </p>
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
  data() {
    return {
      list: Array,
      date: '',
      loading: false,
      list1: [],
      list2: []
    }
  },
  // computed: {
  //   titleData() {
  //     const data = this.localDate(this.list[this.$refs.i].time)
  //     return data
  //   }
  // },
  created() {
    this.getPartyList()
  },
  methods: {
    open1() {
      this.$notify({
        title: '聚餐删除成功',
        type: 'success'
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
    localDate(v) {
      const d = new Date(v)
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
      return d.toISOString()
    },
    findElem(leader, list) {
      const list1 = this.list1
      const list2 = this.list2
      const list3 = []
      for (var i = 0; i < list.length; i++) {
        const value = list1.indexOf(list[i])
        if (value !== -1) {
          list3.push(list2[i])
        }
      }
      // const member = list.memberList
      list.memberList = list3
      // member.splice.call(member, 0, member.length, ...list3)
    },
    getPartyList() {
      getParty().then((res, error) => {
        if (error) {
          console.log(error)
        } else {
        //   const data = res.data
          // console.log(res)
          const partydata = res.data.data[0].partydata
          const doc = res.data.doc
          console.log(doc, partydata)
          const list1 = this.list1
          const list2 = this.list2
          for (var i = 0; i < doc.length; i++) {
            list1.push(doc[i].username)
            list2.push(doc[i].nickname)
          }
          this.list = partydata.reverse()
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
