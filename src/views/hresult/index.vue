<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()" click-right>
      <template #title>
        <div class="search" @click="$router.back()">
            <van-icon name="search" size="18px" color="#999"/>
            <span style="color:#999" >游戏主机</span>
        </div>
      </template>
      <template #right>
         <van-icon name="more-o" size="26"/>
      </template>
    </van-nav-bar>
    <!--  -->
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" @change="Sortprice" />
      <van-dropdown-item v-model="value2" :options="option2" @change="SortSales"/>
      <!-- 筛选 -->
      <van-dropdown-item title="筛选" ref="dropdownitem">
        <van-cell center title="价格" />
        <van-cell center class="filterlayer">
          <template #right-icon>
            <input type="text" placeholder="最低价格" v-model.trim="inp[0]">
            <span>—</span>
            <input type="text" placeholder="最高价格" v-model.trim="inp[1]">
          </template>
        </van-cell>
        <div style="padding: 5px 16px;">
          <van-button type="danger" block round @click="onConfirm">
            确认
          </van-button>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
    <div>
      <van-empty description="没有找到相关商品" v-show="!ProList.length"/>
      <van-list
      v-show="ProList.length"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
        <!-- <Prolist /> -->
        <Prolist :ProList="newProList" />
      </van-list>
    </div>
  </div>
</template>
<script>
import { Prolist } from '../../components'
import { NavBar, Button, Search, Icon, DropdownMenu, DropdownItem, Cell, Divider, List, Empty } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Search.name]: Search,
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Cell.name]: Cell,
    [Divider.name]: Divider,
    [List.name]: List,
    [Empty.name]: Empty,
    Prolist
  },
  data () {
    return {
      keyword: '',
      count: 1,
      ProList: [],
      newProList: [],
      loading: false,
      finished: false,
      inp: [],
      value1: 0,
      value2: 'a',
      option1: [
        { text: '综合', value: 0 },
        { text: '价格升序', value: 1 },
        { text: '价格降序', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '销量升序', value: 'b' },
        { text: '销量降序', value: 'c' }
      ]
    }
  },
  mounted () {
    this.onLoad()
  },
  methods: {
    // 价格排序
    Sortprice (value) {
      this.newProList = JSON.parse(JSON.stringify(this.ProList))
      value === 1 ? this.newProList.sort((a, b) => a.originprice - b.originprice)
        : value === 2 ? this.newProList.sort((a, b) => b.originprice - a.originprice) : value = 0
    },
    SortSales (value) {
      this.newProList = JSON.parse(JSON.stringify(this.ProList))
      value === 'b' ? this.newProList.sort((a, b) => a.sales - b.sales)
        : value === 'c' ? this.newProList.sort((a, b) => b.sales - a.sales) : value = 0
    },
    // 筛选确认
    onConfirm () {
      if (/^[0-9]*$/.test(parseInt(this.inp[0])) && /^[0-9]*$/.test(parseInt(this.inp[1]))) {
        this.newProList = this.ProList.filter(item => item.originprice >= this.inp[0] && item.originprice <= this.inp[1])
      } else {
        console.log('输入错误')
      }
      this.inp = []
      this.$refs.dropdownitem.toggle()
    },
    // 商品更新
    onLoad () {
      this.loading = true
      this.$http.Prosearch({ count: this.count++, keyword: this.$route.params.keyword }).then(res => {
        if (res.data.code === '200') {
          if (this.count - 1 === 1) {
            this.ProList = res.data.data
          } else {
            this.ProList = [...this.ProList, ...res.data.data]
          }
          this.newProList = JSON.parse(JSON.stringify(this.ProList))
        } else {
          this.finished = true
        }
        this.loading = false
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.filterlayer
  font-size .12rem
  display flex
  span
    color #e5e5e5
    padding 0 .05rem
  input
    background #f7f7f7
    text-align center
    height .3rem
    border 0
.van-button--danger
  height 28px
.van-button--round
  border-radius: 10px;
.search
  width 2rem
  display flex
  border-radius: 22px
  align-items: center
  background #f7f7f7
  height .35rem
  p
    padding 0 .1rem
    img
      height .15rem
  span
    color #ddd
  .van-icon-search
    padding 0 .1rem
</style>
