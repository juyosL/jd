<template>
  <router-view></router-view>
</template>
<script>
export default {
  mounted () {
    this.$router.replace('/register/step1')
  }
}
</script>
<style lang="stylus" scoped>
</style>
