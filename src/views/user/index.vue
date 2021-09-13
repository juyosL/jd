<template>
  <div class="container">
    <div class="box">
      <header class="header">
        <div class="Avatar">
          <div class="Avatar_img">
            <img :src="information.avatar" alt="">
          </div>
          <div>
            <p v-text="information.nickname">name</p>
          </div>
        </div>
        <van-icon name="setting-o" size="24" @click="$router.push('/settings')"/>
      </header>
      <div class="content">
        <div>钱包
          <van-icon name="logistics" />
          <van-icon name="shopping-cart-o" />
          <van-icon name="description" />
        </div>
        <div> 金豆</div>
      </div>
    </div>
    <Tabbar/>
  </div>
</template>
<script>
import { Tabbar } from '@/components'
import { Icon } from 'vant'
export default {
  components: {
    Tabbar,
    [Icon.name]: Icon
  },
  data () {
    return {
      information: {}
    }
  },
  mounted () {
    this.$http.Getuser({ userid: localStorage.getItem('userid') })
      .then(res => {
        console.log(res.data.data)
        this.information = res.data.data[0]
      })
  }
}
</script>

<style lang="stylus" scoped>
*
  padding 0
  margin 0
  list-style none
html
  font-size 26.6666667vw
html,body,.container
  width 100%
  height 100%
body
  font-size .12rem
.container
  display flex
  flex-direction column
  .box
    flex 1
    display flex
    flex-direction  column
    .header
      height 1rem
      display flex
      justify-content space-between
      background url('http://wallcoo.com/cartoon/Scrapbook_Art_Paper_Sweet/wallpapers/1920x1080/LBA_SweetSensation_PP11.jpg') no-repeat
      .van-icon-setting-o
        margin-right .28rem
        margin-top .28rem
      .Avatar
        margin-left .5rem
        margin-top .15rem
        p
          font-size .2rem
          margin-left -10px
          font-weight bold
          color #f6f6f6
        .Avatar_img
          width .5rem
          height .5rem
          border-radius 50%
          img
            width  100%
            border-radius 50%
    .content
      flex 1
      background-color #f6b6b6
</style>
