<template>
  <div class="bod">
    <div>
      <van-nav-bar left-arrow @click-left="$router.back()" click-right>
        <template #title>
          <van-search v-model.trim="keyword" placeholder="电视盒子" autofocus />
        </template>
        <template #right>
          <van-button type="danger" round @click="toHresult">搜素</van-button>
        </template>
      </van-nav-bar>
    </div>
    <div>
      <div v-if="record && record.length > 0">
        <div class="history">
          <div class="history_header">
            <h2>浏览记录</h2>
            <van-icon name="delete-o" size="18" @click="Reomvehistory"/>
          </div>
          <div class="history_btn">
            <van-button type="default"
            v-for="(item, index) in record"
            :key="index"
            :text="item"
            @click="$router.replace({ name: 'Hresult', params: { keyword: item } })"
            />
          </div>
        </div>
      </div>
      <div>
        <h2>热门搜索</h2>
        <div class="history_btn">
          <van-button type="default"
          v-for="(item, index) in host"
          :key="index"
          :text="item.keyword"
          @click="$router.replace({ name: 'Hresult', params: { keyword: item.keyword } })"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar, Button, Search, Icon } from 'vant'
import { mapMutations } from 'vuex'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Search.name]: Search,
    [Icon.name]: Icon

  },
  data () {
    return {
      keyword: '',
      host: [],
      record: []
    }
  },
  mounted () {
    this.record = JSON.parse(localStorage.getItem('record'))
    this.hostseach()
  },
  methods: {
    ...mapMutations({
      Changestate: 'hresult/Changestate'
    }),
    toHresult () {
      if (this.keyword !== '') {
        // 历史记录
        if (localStorage.getItem('record')) {
          var arr = JSON.parse(localStorage.getItem('record'))
          if (arr.findIndex(item => item === this.keyword) !== -1) {
            arr.splice(arr.findIndex(item => item === this.keyword), 1)
          }
          arr.unshift(this.keyword)
          localStorage.setItem('record', JSON.stringify(arr))
        } else {
          localStorage.setItem('record', JSON.stringify([this.keyword]))
        }
        // 搜索
        this.$router.replace({ name: 'Hresult', params: { keyword: this.keyword } })
      } else {
        console.log('不能为空')
      }
    },
    // 清楚历史
    Reomvehistory () {
      localStorage.removeItem('record')
      this.record = []
    },
    hostseach () {
      this.$http.Hostword().then(res => {
        this.host = res.data.data
        this.Changestate(true)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.van-button--danger
  height 28px
.van-button--round
  border-radius: 10px;
.history
  .history_header
    height .3rem
    display flex
    justify-content: space-between
    align-items: center
.history_btn
    display flex
    flex-wrap: wrap
    .van-button--default
      background #f0f2f5
      margin .05rem .1rem
</style>
