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
        <van-button round block type="info" native-type="submit" @click="Icommit">确认</van-button>
        <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
          <van-address-edit
            :area-list="areaList"
            show-delete
            show-set-default
            show-search-result
            :save-button-text="flag ? '保存': '修改'"
            :address-info="addrssinfo"
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
import { NavBar, AddressList, AddressEdit, Card, Popup, Dialog, Toast, Button } from 'vant'
import { areaList } from '@vant/area-data'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    [NavBar.name]: NavBar,
    [AddressList.name]: AddressList,
    [AddressEdit.name]: AddressEdit,
    [Card.name]: Card,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast,
    [Button.name]: Button
  },
  data () {
    return {
      orderlist: [],
      areaList,
      searchResult: [],
      chosenAddressId: 0,
      addrssinfo: {},
      list: [],
      show: false,
      // true添加,false修改
      flag: false
    }
  },
  computed: {
    ...mapState({
      newAddress: state => state.address.newAddress
    })
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapMutations({
      upaddress: 'address/upaddress'
    }),
    init () {
      this.$http.addressList({
        token: localStorage.getItem('token'),
        userid: localStorage.getItem('userid')
      }).then(res => {
        var i = 0
        res.data.data.map(item => {
          item.id = i++
          item.address = item.province + item.county + item.city + item.addressDetail
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
      this.addrssinfo = item
      this.chosenAddressId = index
      this.show = !this.show
      this.flag = false
    },
    onSave (content) {
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
          this.$http.addressList({
            userid: localStorage.getItem('userid')
          }).then(res => {
            this.upaddress(res.data.data[res.data.data.length - 1].addressid)
            this.$router.back()
          })
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
          console.log('修改成功')
          this.list = []
          this.init()
          this.show = false
          // this.$router.back()
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
    // 手动选择地址
    Icommit () {
      this.upaddress(this.list[this.chosenAddressId].addressid)
      this.$router.back()
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
    .van-button--info
      position absolute
      margin-left .14rem
      margin-bottom .5rem
      width 3.42rem
      bottom 0
</style>
