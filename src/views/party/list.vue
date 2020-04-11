<template>
  <div>
    <detail :is-edit="true" />
    <partyList />
  </div>
</template>

<script>
import Detail from './compent/Detail'
import partyList from './compent/partyList'
export default {
  components: {
    Detail,
    partyList
  }
}
</script>

<style scoped>
</style>
