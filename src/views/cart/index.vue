<template>
  <div class="container">
    <div class="box">
      <header class="header">购物车</header>
      <div class="content">
      </div>
    </div>
    <!-- 底部 SubmitBar -->
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { SubmitBar, checkbox } from 'vant'
export default {
  data () {
    return {
      checked: false
    }
  },
  components: {
    [SubmitBar.name]: SubmitBar,
    [checkbox.name]: checkbox
  },
  methods: {
    onClickEditAddress () {
    },
    onSubmit () {
    }
  }
}
</script>
<style lang="stylus">
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
      height .44rem
      background-color #ff6666
    .content
      flex 1
      background-color #f6b6b6
@media screen and (min-width 960px)
  html
    font-size 100px
</style>
