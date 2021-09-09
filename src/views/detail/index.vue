<template>
  <div class="box">
    <!-- Nav -->
    <div>
      <van-nav-bar :title="commodity.proname" left-arrow @click-left="$router.back()">
        <template #right>
          <van-popover
            v-model="showPopover"
            theme="dark"
            trigger="click"
            :actions="actions"
            placement="bottom-end"
            @select="moreEvent"
          >
            <template #reference>
              <van-icon name="more-o" size="26"/>
            </template>
          </van-popover>
        </template>
      </van-nav-bar>
    </div>
    <!-- 图片展示 -->
    <div class="preview">
      <van-swipe @change="onChange">
        <van-swipe-item v-for="(item, index) in banners" :key="index" @click="previewImage(index)">
          <img :src="item" alt="">
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/{{banners.length}}</div>
        </template>
      </van-swipe>
      <div class="playBtn">
       <van-icon name="play-circle" size="18" color="#fe4d50" @click="show = !show"/>
       <!-- 视频播放 -->
       <van-overlay :show="show" @click.stop="show = !show" @click="closeOverLay">
          <div class="wrapper">
            <template>
              <video
              autoplay
              ref="vdo"
              width="100%"
              src="https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/1b147065379705072794210305/v.f20.mp4?dockingId=f782a297-b570-4701-bcea-9ae0c0749efe&storageSource=3" controls>
              </video>
            </template>
          </div>
        </van-overlay>
       <span>00'30"</span>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="content">
      <div class="buy_area">
        <div class="priceWrap">
          ￥<span>{{(commodity.originprice * commodity.discount /10).toFixed(2)}}</span>
          <del>￥{{commodity.originprice}}</del>
        </div>
      </div>
      <div class="goods_name">
        <van-tag type="danger">{{commodity.brand}}</van-tag>
        <van-tag type="danger">{{commodity.category}}</van-tag>
        <span v-text="commodity.proname"></span>
      </div>
      <div></div>
    </div>
    <div class="item_floor">
      2
    </div>
    <br><br><br><br><br><br><br><br>
    <!-- 分享 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
    <!-- tabber -->
    <div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" badge="" />
        <van-goods-action-icon icon="cart-o" text="购物车" :badge="badge" @click="flag"/>
        <van-goods-action-icon icon="shop-o" text="店铺" badge="" />
        <van-goods-action-button type="danger" text="已下架" disabled v-if="!commodity.issale"/>
        <van-goods-action-button type="warning" text="加入购物车" v-if="commodity.issale" @click="shopping"/>
        <van-goods-action-button type="danger" text="立即购买" v-if="commodity.issale"/>
      </van-goods-action>
    </div>
  </div>
</template>
<script>
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Icon,
  NavBar,
  Popover,
  ShareSheet,
  ImagePreview,
  Swipe,
  SwipeItem,
  Tag,
  Overlay,
  Toast
} from 'vant'
export default {
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
    [Popover.name]: Popover,
    [ShareSheet.name]: ShareSheet,
    [ImagePreview.Component.name]: ImagePreview.Component,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tag.name]: Tag,
    [Overlay.name]: Overlay,
    [Toast.name]: Toast
  },
  data () {
    return {
      showPopover: false,
      showShare: false,
      show: false,
      current: 0,
      badge: '',
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ],
      actions: [{ text: '首页' }, { text: '分类' }, { text: '我的' }, { text: '购物车' }, { text: '分享' }],
      banners: [],
      commodity: []
    }
  },
  mounted () {
    this.init()
    this.$http.getProDetail(this.$route.params.proid).then(res => {
      this.banners = res.data.data.banners[0].split(',')
      this.commodity = res.data.data
    })
  },
  methods: {
    // 分享
    moreEvent (action, index) {
      console.log(index, action)
      switch (index) {
        case 0: this.$router.push('/home')
          break
        case 1: this.$router.push('/kind')
          break
        case 2: this.$router.push('/user')
          break
        case 3: this.$router.push('/cart')
          break
        case 4: this.showShare = true
          break
      }
    },
    // 放大图片,点击开始位置
    previewImage (index) {
      ImagePreview({ images: this.banners, startPosition: index })
    },
    // 显示滑动到那张图片
    onChange (index) {
      this.current = index
    },
    // 暂停视频
    closeOverLay () {
      this.$refs.vdo.pause()
    },
    // 加入购物车
    shopping () {
      if (localStorage.getItem('isLogin')) {
        var token = localStorage.getItem('token')
        var userid = localStorage.getItem('userid')
        this.$http.addCart({ token, userid, proid: this.$route.params.proid, num: 1 })
          .then(res => {
            console.log(res)
            // Toast(res.data.message)
          }).catch(() => { })
        this.$router.push('/cart')
      } else {
        this.$router.push('/login')
      }
    },
    init () {
      // 已登录,请求购物车数量,显示
      if (localStorage.getItem('isLogin')) {
        this.$http.getCartList({ token: localStorage.getItem('token'), userid: localStorage.getItem('userid') })
          .then(res => {
            if (res.data.data.length) {
              this.badge = 0
              res.data.data.map(item => {
                this.badge += item.num
              })
            } else {
              this.badge = res.data.data.length
            }
          })
      }
    },
    // 购物车
    flag () {
      localStorage.getItem('isLogin') ? this.$router.push('/cart') : this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  overflow-y auto
  padding-bottom .5rem
  background-color #f2f2f2
  .preview
    width 3.75rem
    height 3.75rem
    position relative
    .playBtn
      width .6rem
      height .2rem
      display flex
      align-items: center
      position relative
      top -0.32rem
      left 50%
      margin-left -0.3rem
      border-radius 0.2rem
      border 1px solid #666
      background-color rgba(255,255,255,0.2)
      video
        position relative
      .van-overlay
        background-color rgb(0,0,0)
    .van-swipe-item
      width 3.75rem
      height 3.75rem
      img
        height 100%
    .custom-indicator
      position: absolute
      right: 5px
      bottom: 5px
      padding: 2px 5px
      font-size: 12px
      color #fff
      background: rgba(0, 0, 0, 0.2)
  .content
    margin-bottom .2rem
    background-color #fff
    border-radius 0 0 .12rem .12rem
    padding 0 .1rem
    .buy_area
      .priceWrap
        height .36rem
        font-size .16rem
        color: #f2270c
        del
          font-size .12rem
          color #b5b5b5
        span
          font-size .30rem
  .goods_name
    span
      font-size .16rem
    .van-tag
      margin-right .1rem
  .item_floor
    height 1rem
    border-radius: .12rem
    background-color #fff
  .wrapper
    display: flex
    align-items: center
    justify-content: center
    height: 100%
  .block
    width: 120px
    height: 120px
    background-color: #fff
</style>
