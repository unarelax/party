<template>
  <div>
    <el-form>
      <sticky :class-name="'sub-navbar'">
        <el-button size="mini" type="primary" @click="showGuide">显示帮助</el-button>
        <el-button
          :loading="loading"
          size="mini"
          type="success"
          style="margin-left: 10px"
          @click="submitParty"
        >{{ isEdit ? '聚餐列表' :'新建聚餐' }}</el-button>
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
      }, 50)
    }
  }
}
</script>

<style scoped>
</style>
