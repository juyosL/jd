<template>
  <div class="container">
      <div class="box">
        <header class="header">首页</header>
        <div class="content" ref="content">
          <!-- 下拉 s -->
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <!-- 轮播图 s -->
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="item in bannerList" :key="item.bannerid">
                <!-- 如果后台图片为空,给个默认图片 -->
                <img :src="item.img?item.img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F9bd9891e78b679b55d7007628c3d46e2333540dc198ab-oMVgqq_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633339053&t=c4f5a9c69bea8fbe584aec048996ed14'" alt="">
              </van-swipe-item>
            </van-swipe>
            <!-- 轮播图 e -->
            <!-- 导航 nav  -->
            <van-grid :column-num="5" :border="false" :icon-size="44">
              <van-grid-item v-for="item in navlist" :key="item.navid" :icon="item.imgurl" :text="item.title" />
            </van-grid>
            <!-- 导航 e -->
            <!-- 秒杀 s -->
            <Seckill />
            <!-- 秒杀 e -->
            <!-- 商品 s -->
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <!-- <Prolist /> -->
              <Prolist :count="count" :ProList="ProList" />
            </van-list>
            <!-- 商品 e -->
          </van-pull-refresh>
          <!-- 下拉 e -->
          <!-- 回到顶部 -->
          <div class="Top" @click="backTop">
            <van-icon name="back-top" size="16"/>
          </div>
        </div>
      </div>
    <!-- 底部tabber -->
    <Tabbar />
  </div>
</template>
<script>
import { Swipe, SwipeItem, Grid, GridItem, List, PullRefresh, Icon } from 'vant'
import { Tabbar, Prolist, Seckill } from '@/components'

export default {
  data () {
    return {
      // 轮播
      bannerList: [],
      // 导航
      navlist: [
        { navid: 1, title: '嗨购超市', imgurl: 'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png' },
        { navid: 2, title: '数码电器', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/178015/31/13828/6862/60ec0c04Ee2fd63ac/ccf74d805a059a44.png!q70.jpg' },
        { navid: 3, title: '嗨购服饰', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/41867/2/15966/7116/60ec0e0dE9f50d596/758babcb4f911bf4.png!q70.jpg' },
        { navid: 4, title: '嗨购生鲜', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/177902/16/13776/5658/60ec0e71E801087f2/a0d5a68bf1461e6d.png!q70.jpg.dpg' },
        { navid: 5, title: '嗨购到家', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/196472/7/12807/7127/60ec0ea3Efe11835b/37c65625d94cae75.png!q70.jpg.dpg' },
        { navid: 6, title: '充值缴费', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/185733/21/13527/6648/60ec0f31E0fea3e0a/d86d463521140bb6.png!q70.jpg.dpg' },
        { navid: 7, title: '9.9元拼', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/36069/14/16068/6465/60ec0f67E155f9488/595ff3e606a53f02.png!q70.jpg.dpg' },
        { navid: 8, title: '领券', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/186080/16/13681/8175/60ec0fcdE032af6cf/c5acd2f8454c40e1.png!q70.jpg.dpg' },
        { navid: 9, title: '领金贴', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/196711/35/12751/6996/60ec1000E21b5bab4/38077313cb9eac4b.png!q70.jpg.dpg' },
        { navid: 10, title: 'plus会员', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/37709/6/15279/6118/60ec1046E4b5592c6/a7d6b66354efb141.png!q70.jpg.dpg' }
      ],
      ProList: [],
      count: 1,
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  mounted () {
    // 请求轮播图
    this.$http.getBannerList()
      .then(res => {
        this.bannerList = res.data.data
      })
    // this.$http.getProList({ count: 1, limitNum: 6 })
    //   .then(res => {
    //     console.log(res.data.data)
    //     this.proList = res.data.data
    //   })
  },
  methods: {
    onLoad () {
      this.loading = true
      this.$http.getProList({ count: this.count++ }).then(res => {
        if (res.data.data.length) {
          if (this.count - 1 === 1) {
            this.ProList = res.data.data
          } else {
            this.ProList = [...this.ProList, ...res.data.data]
          }
          this.isLoading = false
        } else {
          this.finished = true
        }
        this.loading = false
      })
    },
    onRefresh () {
      this.finished = false
      this.count = 1
      this.onLoad()
    },
    backTop () {
      this.$refs.content.scrollTop = 0
    }
  },
  components: {
    Tabbar,
    Prolist,
    Seckill,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Icon.name]: Icon
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
    overflow-y auto
    display flex
    flex-direction  column
    .header
      height .44rem
      background-color #ff6666
    .content
      flex 1
      // height 5.73rem
      overflow-y auto
      background-color #f6f6f6
      .Top
        width .3rem
        height .3rem
        border-radius 50%
        position fixed
        display flex
        justify-content center
        align-items center
        bottom .6rem
        right .1rem
        border: 1px solid #ccc
        background: hsla(0,0%,100%,.9) no-repeat 50%
.van-grid-item__content
  background-color transparent
@media screen and (min-width 960px)
  html
    font-size 100px
.my-swipe
  height 1.5rem
  img
    width 100%
    height 1.5rem
</style>
