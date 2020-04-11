<template>
  <div>
    1111
  </div>
</template>

<script>
import { getParty } from '@/api/user'
export default {
  created() {
    this.getPartyList()
  },
  methods: {
    getPartyList() {
      getParty().then((res, error) => {
        if (error) {
          console.log(error)
        } else {
        //   const data = res.data
          const partydata = res.data[0].partydata
          console.log(partydata)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
