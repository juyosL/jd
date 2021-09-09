<template>
  <div class="container">
    <div class="box">
      <div class="header">
        <van-nav-bar title="填写订单" left-arrow @click-left="$router.back()" />
      </div>
      <div class="content">
         <van-cell v-if="flag" title="吴勋勋 18813007814"  size="large" is-link label="北京昌平千锋教育" />
      <van-cell v-else title="请添加收获人信息"  size="large" is-link />
      <van-card
        v-for="item of orderlist"
        :key="item.orderid"
        :num="item.num"
        :price="item.originprice"
        :title="item.proname"
        :thumb="item.img1"
      />
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar, AddressList, AddressEdit, Card, Cell } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar,
    [AddressList.name]: AddressList,
    [AddressEdit.name]: AddressEdit,
    [Card.name]: Card,
    [Cell.name]: Cell
  },
  data () {
    return {
      flag: false,
      orderlist: []
    }
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>

</style>
