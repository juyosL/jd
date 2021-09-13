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
        <p>购物车{{cartList}}</p>
      </router-link>
      <router-link to="/user" tag="li" v-if="isLogin">
        <span class="iconfont icon-wode"></span>
        <p>我的</p>
      </router-link>
      <router-link to="/login" tag="li" v-else>
        <span class="iconfont icon-wode"></span>
        <p>未登录</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  // 开启命名空间
  namespaced: true,
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      cartList: state => state.cart.cartList
    })
  },
  mounted () {
    this.init({ userid: localStorage.getItem('userid') })
  },
  methods: {
    ...mapActions({
      init: 'cart/init'
    })
  }
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
