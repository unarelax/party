<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            好友卡片
          </div>
          <count-to :start-val="0" :end-val="friendLength" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('money')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            聚餐总花费
          </div>
          <count-to :start-val="0" :end-val="moneyAll" :duration="2000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="food" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            已有聚餐
          </div>
          <count-to :start-val="0" :end-val="partylength" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { pfData } from '@/api/remote-search'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      partylength: Number,
      friendLength: Number,
      moneyAll: Number
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // handleSetLineChartData(type) {
    //   this.$emit('handleSetLineChartData', type)
    // }
    evil(fn) {
      const Fn = Function // 一个变量指向Function，防止有些前端编译工具报错
      return new Fn('return ' + fn)()
    },
    fetchData() {
      pfData().then(response => {
        // console.log(response.data)
        const parLength = response.data.data[0].partydata.length
        if (parLength === 0) {
          this.partylength = 0
        } else {
          this.partylength = parLength
        }
        const party = response.data.data[0].partydata
        var a = []
        for (var i = 0; i < party.length; i++) {
          if (party[i].money) {
            a.push(party[i].money)
            // console.log(party[i].money)
          }
        }
        if (a.length === 0) {
          this.moneyAll = 0
        } else {
          this.moneyAll = this.evil(a.join('+'))
        }
        // var s = 0
        // for (var i = party.length - 1; i >= 0; i--) {
        //   s += party[i].money
        //   console.log(s)
        // }
        // this.moneyAll = s
        const friLength = response.data.doc[0].friendList.length
        if (friLength === 0) {
          this.friendLength = 0
        } else {
          this.friendLength = friLength
        }
        // console.log( this.partylength, this.friendLength)
        // this.list = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #fdd45e
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #fdd45e
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
