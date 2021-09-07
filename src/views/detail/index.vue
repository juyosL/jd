<template>
  <div class="box">
    <!-- Nav -->
    <div>
      <van-nav-bar title="proname" left-arrow @click-left="$router.back()">
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
    <div @click="previewImage" class="preview">
      <van-swipe @change="onChange">
        <van-swipe-item v-for="(item, index) in banners" :key="index">
          <img :src="item" alt="">
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/{{banners.length}}</div>
        </template>
      </van-swipe>
      <div class="playBtn">
      </div>
    </div>
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
        <van-goods-action-icon icon="cart-o" text="购物车" badge="" />
        <van-goods-action-icon icon="shop-o" text="店铺" badge="" />
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
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
  SwipeItem
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
    [SwipeItem.name]: SwipeItem
  },
  data () {
    return {
      showPopover: false,
      showShare: false,
      current: 0,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ],
      actions: [{ text: '首页' }, { text: '分类' }, { text: '我的' }, { text: '购物车' }, { text: '分享' }],
      banners: []
    }
  },
  mounted () {
    console.log(this.$route.params.proid)
    this.$http.getProDetail(this.$route.params.proid).then(res => {
      console.log(res.data.data)
      this.banners = res.data.data.banners[0].split(',')
    })
  },
  methods: {
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
    previewImage () {
      ImagePreview(this.banners)
    },
    onChange (index) {
      this.current = index
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  .preview
    width 3.75rem
    height 3.75rem
    position relative
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
</style>
