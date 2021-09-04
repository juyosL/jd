<template>
  <footer class="footer">
    <ul>
      <router-link to="/home" tag="li">
        <span class="iconfont icon-shouye"></span>
        <p>首页</p>
      </router-link>
      <router-link to="/kind" tag="li">
        <span class="iconfont icon-leimupinleifenleileibie"></span>
        <p>分类</p>
      </router-link>
      <router-link to="/cart" tag="li">
        <span class="iconfont icon-gouwuche"></span>
        <p>购物车</p>
      </router-link>
      <router-link to="/user" tag="li">
        <span class="iconfont icon-wode"></span>
        <p>我的</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
export default {
  // 开启命名空间
  namespaced: true
}

</script>

<style lang="stylus" scoped>
.footer
  height .5rem
  background-color #efefef
  ul
    width 100%
    height 100%
    display flex
    align-items center
    justify-content center
    li
      flex 1
      text-align center
      span
        font-size .24rem
      p
        font-size .12rem
      &.router-link-active
        color #f66
</style>
