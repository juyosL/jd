<template>
  <div>
      <van-nav-bar title="注册" left-arrow @click-left="$router.back()">
      </van-nav-bar>
    <router-view></router-view>
  </div>
</template>
<script>
import { NavBar } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar
  }
}
</script>
<style lang="stylus" scoped>
</style>
