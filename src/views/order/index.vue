<template>
  <div class="container">
    <div class="box">
      <div class="header">
        <van-nav-bar title="填写订单" left-arrow @click-left="$router.back()" />
        <!-- 地址 -->
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
        />
      </div>
      <div class="content">
        <van-card
          v-for="item in orderlist" :key="item.proid"
          :num="item.num"
          :price="(item.originprice * item.discount / 10).toFixed(2)"
          :title="item.proname"
          :thumb="item.img1"
        />
      </div>
      <div class="foot">
        <van-submit-bar :price="total" button-text="去支付" @submit="onSubmit" />
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar, AddressList, AddressEdit, Card, Dialog, SubmitBar, Toast } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar,
    [AddressList.name]: AddressList,
    [AddressEdit.name]: AddressEdit,
    [Card.name]: Card,
    [Dialog.name]: Dialog,
    [SubmitBar.name]: SubmitBar,
    [Toast.name]: Toast

  },
  data () {
    return {
      orderlist: [],
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '',
          tel: '',
          address: '暂无地址'
        }
      ]
    }
  },
  computed: {
    total () {
      return this.orderlist.reduce((sum, item) => {
        return sum + item.originprice * item.num
      }, 0) * 100
    }
  },
  mounted () {
    // 获取订单商品
    this.$http.confirmOrder({
      userid: localStorage.getItem('userid'),
      time: localStorage.getItem('time')
    }).then(res => {
      // console.log(res.data.data)
      this.orderlist = res.data.data
      this.$forceUpdate()
    })
    // 获取地址
    this.$http.addressList({
      userid: localStorage.getItem('userid')
    }).then(res => {
      // 没数据
      if (res.data.data.length === 0) {
        Dialog.confirm({
          message: '你没有默认地址,是否现在去设置地址'
        }).then(() => {
          this.$router.push('/address')
        }).catch(() => {})
      } else {
        // 有数据
        this.$http.defaultAddress({
          userid: localStorage.getItem('userid')
        }).then(item => {
          // 判断有没有默认地址,没有就使用最新添加的地址
          if (item.data.data.length === 0) {
            this.list.splice(0, 1, res.data.data[res.data.data.length - 1])
          } else {
            // 有就直接使用
            this.list = item.data.data
          }
          this.combinedAddress()
        })
      }
    })
  },
  methods: {
    // 拼接地址,并且给订单添加上地址
    combinedAddress () {
      this.list[0].address = this.list[0].province + this.list[0].county + this.list[0].city + this.list[0].addressDetail
      // 添加地址
      this.$http.updateOrder({
        userid: this.list[0].userid,
        name: this.list[0].name,
        tel: this.list[0].tel,
        province: this.list[0].province,
        city: this.list[0].city,
        county: this.list[0].county,
        addressDetail: this.list[0].addressDetail,
        time: localStorage.getItem('time')
      }).then(res => {
        console.log(res)
      })
    },
    onAdd () {
      this.$router.push('/address')
    },
    onEdit () {
      this.$router.push('/address')
    },
    onSubmit () {
      Dialog.confirm({
        message: `一共需要支付<br>${this.total}元`
      }).then(() => {
        this.$http.deleteCart({
          userid: localStorage.getItem('userid')
        }).then((res) => {
          console.log(res)
          Toast('支付成功')
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {})
    }
  }
}
</script>
<style lang="stylus" scoped>
.box
  overflow auto
  height 100%
  display flex
  .header
    overflow hidden
    .van-address-list
      padding-bottom .3rem
    .van-address-list__bottom
      display none
  flex-direction column
  .content
    padding-bottom .5rem
    overflow auto
  .foot
    height .5rem
</style>
