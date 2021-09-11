<template>
  <div class="container">
    <div class="box">
      <div class="header">
        <van-nav-bar title="收货地址管理" left-arrow @click-left="$router.back()" />
      </div>
      <div class="content">
        <!-- 地址 -->
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
        />

        <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
          <van-address-edit
            :area-list="areaList"
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
          />
        </van-popup>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar, AddressList, AddressEdit, Card, Popup, Dialog, Toast } from 'vant'
import { areaList } from '@vant/area-data'
export default {
  components: {
    [NavBar.name]: NavBar,
    [AddressList.name]: AddressList,
    [AddressEdit.name]: AddressEdit,
    [Card.name]: Card,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast
  },
  data () {
    return {
      orderlist: [],
      areaList,
      searchResult: [],
      chosenAddressId: '1',
      list: [],
      show: false,
      // true添加,false修改
      flag: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$http.addressList({
        token: localStorage.getItem('token'),
        userid: localStorage.getItem('userid')
      }).then(res => {
        console.log(res)
        var i = 0
        res.data.data.map(item => {
          item.id = i++
          if (item.isDefault) {
            this.list.push(item)
          }
        })
        res.data.data.map(item => {
          if (item.isDefault === false) {
            this.list.push(item)
          }
        })
      })
    },
    onAdd () {
      this.show = !this.show
      this.flag = true
    },
    onEdit (item, index) {
      // this.list[index].
      this.show = !this.show
      this.flag = false
    },
    onSave (content) {
      console.log(content)
      if (this.flag) {
        // 添加地址
        this.$http.Address({
          token: localStorage.getItem('token'),
          userid: localStorage.getItem('userid'),
          name: content.name,
          tel: content.tel,
          province: content.province,
          city: content.city,
          county: content.county,
          addressDetail: content.addressDetail,
          isDefault: content.isDefault
        }).then(res => {
          this.show = false
          Toast('添加成功')
          console.log('添加成功', res)
          this.$router.back()
          // 不跳转,返回订单,就使用
          // this.list = []
          // this.init()
        })
      } else {
        this.$http.addUpdate({
          token: localStorage.getItem('token'),
          userid: localStorage.getItem('userid'),
          addressid: this.list[this.chosenAddressId].addressid,
          name: content.name,
          tel: content.tel,
          province: content.province,
          city: content.city,
          county: content.county,
          addressDetail: content.addressDetail,
          isDefault: content.isDefault
        }).then(res => {
          Toast('修改成功')
          console.log('修改成功', res)
          this.show = false
          this.$router.back()
          // 不跳转,返回订单,就使用
          // this.list = []
          // this.init()
        })
      }
    },
    // 删除
    onDelete (content) {
      this.$http.addDelete({
        token: localStorage.getItem('token'),
        addressid: this.list[this.chosenAddressId].addressid
      }).then(res => {
        Toast('删除成功')
        console.log('删除成功', res)
        this.show = false
        this.list = []
        this.init()
      })
    },
    onChangeDetail () {}
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
  flex-direction column
  .content
    padding-bottom .5rem
    overflow auto
</style>
