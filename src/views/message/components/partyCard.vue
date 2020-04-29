<template>
  <div class="dashboard-container">
    <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-top:30px;">
      <el-card class="box-card-component" style="margin-left:8px;">
        <div slot="header" class="box-card-header" />
        <div style="position:relative;">
          <pan-thumb image="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png" class="panThumb" />
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import PanThumb from '@/components/PanThumb'
export default {
  components: {
    PanThumb
  }
}
</script>

<style lang="scss" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>

<style lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 25px;
    opacity:0.1;
    background-color: rgba(	248,248,255,1);
  }
//   .mallki-text {
//     position: absolute;
//     top: 0px;
//     right: 0px;
//     font-size: 20px;
//     font-weight: bold;
//   }
  .panThumb {
    z-index: 100;
    height: 70px!important;
    width: 70px!important;
    position: absolute!important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none!important;
    /deep/ .pan-info {
      box-shadow: none!important;
    }
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
//   @media only screen and (max-width: 1510px){
//     .mallki-text{
//       display: none;
//     }
//   }
}
</style>
