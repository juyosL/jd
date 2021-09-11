<template>
  <div class="container">
    <div class="box">
      <header class="header">
        <van-nav-bar title="购物车" left-arrow @click-left="$router.back()" />
      </header>
      <div class="content">
        <!-- 购物车有商品 -->
        <div v-if="empty.length">
          <van-row v-for="(item, index) in empty" :key="item.proid">
            <!-- 多选 -->
            <van-col span="2">
              <van-checkbox v-model="item.flag" @click="one(index)"/>
            </van-col>
            <van-col span="22">
              <van-swipe-cell>
                <van-card
                  :num="item.num"
                  :price="(item.originprice * item.discount / 10).toFixed(2)"
                  :title="item.proname"
                  :origin-price="item.originprice"
                  class="goods-card"
                  :thumb="item.img1"
                >
                  <!-- 自增自减 -->
                  <template #footer>
                    <van-button size="mini" @click="updata(index, -1)">-</van-button>
                    <van-button size="mini" @click="updata(index, 1)">+</van-button>
                  </template>
                </van-card>
                <!-- 删除 -->
                <template #right>
                  <van-button square text="删除" type="danger" class="delete-button" @click="remover(index)"/>
                </template>
              </van-swipe-cell>
            </van-col>
          </van-row>
        </div>
        <!-- 空购物车 -->
        <div v-else>
          <van-empty
            class="custom-image"
            image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
            description="购物车空空如也,快去选购吧"
          />
          <van-button type="danger" class="bottom-button" @click="$router.push('/home')">
            立即选购
          </van-button>
        </div>
        <div class="guess">
          <van-divider>猜你喜欢</van-divider>
          <!-- <Prolist :ProList=""/> -->
          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          >
            <!-- <Prolist /> -->
            <Prolist :count="count" :ProList="relist" />
          </van-list>
        </div>
      </div>
    </div>
    <!-- 底部 SubmitBar -->
    <van-submit-bar :price="price" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { Prolist } from '../../components'
import { SubmitBar, checkbox, NavBar, Empty, Button, Col, Row, SwipeCell, Checkbox, Card, Toast, Divider, List } from 'vant'
export default {
  data () {
    return {
      sum: 0,
      empty: [],
      relist: [],
      count: 1,
      loading: false,
      finished: false
    }
  },
  components: {
    [SubmitBar.name]: SubmitBar,
    [checkbox.name]: checkbox,
    [NavBar.name]: NavBar,
    [Empty.name]: Empty,
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [SwipeCell.name]: SwipeCell,
    [Checkbox.name]: Checkbox,
    [Card.name]: Card,
    [Toast.name]: Toast,
    [Divider.name]: Divider,
    [List.name]: List,
    Prolist
  },
  computed: {
    price () {
      return this.total() * 100
    },
    // 全选
    checked: {
      get () {
        return this.empty.every(item => {
          return item.flag === true
        })
      },
      set () {
        // 购物车所有数据变化
        this.$http.selectall({
          token: localStorage.getItem('token'),
          userid: localStorage.getItem('userid'),
          type: !this.checked
        })
        if (this.checked) {
          this.empty.map(item => {
            item.flag = false
          })
        } else {
          this.empty.map(item => {
            item.flag = true
          })
        }
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 推荐商品
    onLoad () {
      this.loading = true
      this.$http.Recommendlist({ count: this.count++ }).then(res => {
        if (res.data.data.length) {
          if (this.count - 1 === 1) {
            this.relist = res.data.data
          } else {
            this.relist = [...this.relist, ...res.data.data]
          }
        } else {
          this.finished = true
        }
        this.loading = false
      })
    },
    onClickEditAddress () {
    },
    // 添加订单
    onSubmit () {
      // 提交订单
      this.$http.addOrder({
        token: localStorage.getItem('token'),
        userid: localStorage.getItem('userid')
      }).then(res => {
        localStorage.setItem('time', res.data.time)
        this.$router.push('/order')
        console.log(666)
      })
    },
    init () {
      if (localStorage.getItem('isLogin')) {
        this.$http.getCartList({ token: localStorage.getItem('token'), userid: localStorage.getItem('userid') })
          .then(res => {
            if (res.data.data.length) {
              this.empty = res.data.data
            } else {
              this.empty = []
            }
          })
      }
    },
    // 删除一条商品
    remover (index) {
      this.$http.removeCart({
        token: localStorage.getItem('token'),
        cartid: this.empty[index].cartid
      }).then(res => {
        Toast('删除成功')
        this.empty.splice(index, 1)
      })
    },
    // 更改商品数量
    updata (index, num) {
      if (this.empty[index].num + num) {
        this.$http.updatenumCart({
          token: localStorage.getItem('token'),
          cartid: this.empty[index].cartid,
          num: this.empty[index].num + num
        })
      }
      this.init()
    },
    // 总价
    total () {
      this.sum = 0
      this.empty.map(item => {
        this.sum += item.flag ? item.num * (item.originprice * item.discount / 10) : 0
      })
      return this.sum
    },
    // 勾选商品状态数据改变
    one (index) {
      this.$http.selectone({
        token: localStorage.getItem('token'),
        cartid: this.empty[index].cartid,
        flag: this.empty[index].flag
      })
    }
    // 猜你喜欢
    // PList () {
    //   this.$http.getProList({}).then(res => {
    //   })
    // }
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
    overflow auto
    padding-bottom: .6rem
    display flex
    flex-direction  column
    .header
      height .44rem
      background-color #ff6666
    .content
      flex 1
      overflow auto
      background-color #f6b6b6
      .guess
        margin-top .6rem
      .van-row
        margin .1rem 0
      .van-col--2
        display flex
        justify-content center
        height .88rem
        // height 100%
      .van-button--mini
        width .4rem
      .goods-card
        margin: 0
        background-color: @white
      .delete-button
        height: 100%
@media screen and (min-width 960px)
  html
    font-size 100px
</style>
