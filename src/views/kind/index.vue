<template>
  <div class="container">
    <div class="box">
      <header class="header">
        <!-- header s -->
        <van-nav-bar left-arrow @click-left="$router.back()" click-right>
          <template #title>
            <div class="search" @click="$router.back()">
                <van-icon name="search" size="18px" color="#999"/>
                <span style="color:#999" >游戏主机</span>
            </div>
          </template>
        </van-nav-bar>
        <!-- end -->
      </header>
      <div class="content">
        <div class="left">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item :title="item" v-for="(item, index) in Spulist" :key="index" />
          </van-sidebar>
        </div>
        <div class="right">
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
    <Tabbar />
  </div>
</template>
<script>
import { Tabbar } from '@/components'
import { NavBar, Icon, Sidebar, SidebarItem } from 'vant'
export default {
  components: {
    Tabbar,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem
  },
  data () {
    return {
      activeKey: 0,
      Spulist: []
    }
  },
  mounted () {
    this.$http.SPU().then(res => {
      this.Spulist = res.data.data
    })
  }
}
</script>
<style lang="stylus" scoped>
.container
  display flex
  flex-direction column
  .box
    overflow hidden
    flex 1
    display flex
    flex-direction  column
    .header
      height .44rem
      background-color #ff6666
      .search
        width 2rem
        justify-content: center
        display flex
        border-radius: 22px
        align-items: center
        background #f7f7f7
        height .35rem
        p
          padding 0 .1rem
          img
            height .15rem
        span
          color #ddd
        .van-icon-search
          padding 0 .1rem
    .content
      overflow hidden
      display flex
      flex 1
      background-color #f6b6b6
      .left
        overflow-y auto
        .van-sidebar
          width 100%
        .van-sidebar-item--select
          color #f47920
          &:before
            background-color transparent
      .right
        width 100%
        height 100%
        background-color #fff
</style>
