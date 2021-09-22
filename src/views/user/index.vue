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
        <div class="option">
          <div @click="show = !show">
            <van-icon name="logistics" size="24"/>
            <p>运输</p>
          </div>
          <div>
            <van-icon name="location-o" size="24" @click="$router.push('/address')"/>
            <p>地址</p>
          </div>
          <div>
            <van-icon name="shopping-cart-o" size="24" @click="$router.push('/cart')"/>
            <p>购物车</p>
          </div>
          <div>
            <van-icon name="description" size="24"/>
            <p>我的订单</p>
          </div>
        </div>
        <div class="option">
        </div>
        <div class="option">
        </div>
        <!-- <div class="Btmoption">
        </div> -->
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-steps direction="vertical" :active="0">
        <van-step>
          <h3>【{{address.split(' ')[1]}}】物流运送中</h3>
          <p>2016-07-12 12:40</p>
        </van-step>
        <van-step>
          <h3>【{{address.split(' ')[0]}}】物流运送至【{{address.split(' ')[1]}}】</h3>
          <p>2016-07-11 10:00</p>
        </van-step>
        <van-step>
          <h3>快件已发货</h3>
          <p>2016-07-10 09:30</p>
        </van-step>
      </van-steps>
    </van-popup>
    <Tabbar/>
  </div>
</template>
<script>
import { Tabbar } from '@/components'
import { Icon, Popup, Step, Steps } from 'vant'
export default {
  components: {
    Tabbar,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Step.name]: Step,
    [Steps.name]: Steps
  },
  data () {
    return {
      information: {},
      show: false,
      address: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('token') && localStorage.getItem('isLogin')) {
      next()
    } else {
      next('/login')
    }
  },
  mounted () {
    this.$http.Getuser({ userid: localStorage.getItem('userid') })
      .then(res => {
        console.log(res.data.data)
        this.information = res.data.data[0]
      })
    this.$http.confirmOrder({
      userid: localStorage.getItem('userid'),
      time: localStorage.getItem('time')
    }).then(res => {
      this.address = `${res.data.address.province} ${res.data.address.city} ${res.data.address.county} ${res.data.address.addressDetail} `
      // console.log(res, this.address, res.data.data)
    })
  }
}
</script>

<style lang="stylus" scoped>
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
      .option
        display flex
        justify-content space-around
        align-items center
        height 80px
        background-color #fff
        margin 10px 10px
        border-radius 10px
        div
          display flex
          align-items: center
          flex-direction: column
      // .Btmoption
      //   position absolute
      //   bottom 0
</style>
