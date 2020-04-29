<template>
  <div class="dashboard-container">
    <party-card />
  </div>
</template>

<script>
import partyCard from './components/partyCard'
export default {
  components: {
    partyCard
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container{
    background-color: #f0f2f5;
}
</style>
