<template>
  <div>
    <detail :is-edit="false" />
    <partyForm />
  </div>
</template>

<script>
import partyForm from './compent/partyForm'
import Detail from './compent/Detail'
export default {
  components: {
    partyForm,
    Detail
  }
}
</script>

<style scoped>
</style>
