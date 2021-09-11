<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()" click-right>
      <template #title>
        <van-search v-model="value" placeholder="电视盒子" />
      </template>
      <template #right>
        <van-button type="danger" round >搜素</van-button>
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
import { NavBar, Button, Search } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Search.name]: Search

  }
}
</script>
<style lang="stylus" scoped>
.van-button--danger
  height 28px
.van-button--round
  border-radius: 10px;
</style>
