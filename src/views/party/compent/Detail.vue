<template>
  <div>
    <el-form ref="postForm" :model="postForm">
      <sticky :class-name="'sub-navbar'">
        <el-button v-if="!isEdit" size="mini" type="primary" @click="showGuide">显示帮助</el-button>
        <el-button
          v-loading="loading"
          size="mini"
          type="success"
          style="margin-left: 10px"
          @click="submitParty"
        >{{ isEdit ? '编辑聚餐' :'新建聚餐' }}</el-button>
      </sticky>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky/index'

export default {
  components: {
    Sticky
  },
  props: {
    isEdit: Boolean
  },
  data() {
    return {
      loading: false,
      postForm: {
        status
      }
    }
  },
  methods: {
    showGuide() {
      console.log('show guide...')
    },
    submitParty() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
</style>
