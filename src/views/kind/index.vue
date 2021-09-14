<template>
  <div class="container">
    <div class="box">
      <header class="header">
        <!-- header s -->
        <van-nav-bar left-arrow @click-left="$router.back()" click-right>
          <template #title>
            <div class="search" @click="$router.push('/search')">
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
            <van-sidebar-item :title="item" v-for="(item, index) in Spulist" :key="index" @click="toSku"/>
          </van-sidebar>
        </div>
        <div class="right">
          <ul>
            <li v-for="(item, index) in Skulist" :key="index" @click="toHresult(item.brand)">
              <img src="//img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png" alt="">
              <p v-text="item.brand"></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Tabbar />
  </div>
</template>
<script>
import { Tabbar } from '@/components'
import { mapMutations } from 'vuex'
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
      Spulist: [],
      Skulist: []
    }
  },
  mounted () {
    this.$http.SPU().then(res => {
      this.Spulist = res.data.data
      this.toSku(0)
    })
  },
  methods: {
    ...mapMutations({
      Changestate: 'hresult/Changestate'
    }),
    toSku (index) {
      this.$http.SKU({ category: this.Spulist[index] })
        .then(res => {
          console.log(res)
          this.Skulist = res.data.data
        })
    },
    toHresult (brand) {
      this.Changestate(false)
      var keyword = `${this.Spulist[this.activeKey]},${brand}`
      this.$router.push({ name: 'Hresult', params: { keyword } })
    }
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
        ul
          display flex
          flex-wrap wrap
          li
            width .8rem
            height 1rem
            display flex
            flex-direction column
            justify-content center
            align-items center
            margin .1rem .1rem
            img
              height 80%
</style>
