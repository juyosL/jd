<template>
  <div class="container">
    <div class="box">
      <div class="header">
        <van-nav-bar title="填写订单" left-arrow @click-left="$router.back()" />
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
    </div>
  </div>
</template>
<script>
import { NavBar, AddressList, AddressEdit, Card } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar,
    [AddressList.name]: AddressList,
    [AddressEdit.name]: AddressEdit,
    [Card.name]: Card
  },
  data () {
    return {
      orderlist: []
    }
  },
  mounted () {
    this.$http.getCartList({
      token: localStorage.getItem('token'),
      userid: localStorage.getItem('userid')
    }).then(res => {
      res.data.data.map(item => {
        if (item.flag) {
          this.orderlist.push(item)
        }
      })
    })
  }
}
</script>
<style lang="stylus" scoped>
.box
  overflow auto
  height 100%
  display flex
  flex-direction column
  .content
    overflow auto
</style>
