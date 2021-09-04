<template>
  <div class="prolist" :class="flag ? 'c1' : 'c2' ">
      <ul>
        <li
        v-for="item in ProList"
        :key="item.proid"
        @click="toDetail(item.proid)"
        >
          <div class="proImg">
              <img :src="item.img1" alt="">
          </div>
          <div class="probox">
            <span class="title" v-text="item.proname"></span>
            <span>￥{{item.originprice}}</span>
            <br>
            <div class="title" v-text="item.desc">标题</div>
          </div>
        </li>
      </ul>
    <!-- 切换 排列方式 -->
    <div class="cutover">
      <van-icon name="apps-o" size="18" v-if="flag" @click="flag=!flag"/>
      <van-icon name="bars" size="18" v-else  @click="flag=!flag"/>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  namespaced: true,
  data () {
    return {
      flag: false
    }
  },
  props: {
    count: { type: Number },
    ProList: { type: Array }
  },
  components: {
    [Icon.name]: Icon
  },
  methods: {
    toDetail (proid) {
      this.$router.push({ name: 'Detail', params: { proid } })
    }
  }
}
</script>

<style lang="stylus" scoped>
.cutover
  display flex
  align-items: center
  justify-content: center
  width .32rem
  height .32rem
  background-color red
  position fixed
  background: hsla(0,0%,100%,.9) no-repeat 50%;
  border: 1px solid #ccc;
  border-radius 50%
  right .1rem
  bottom 1rem
.prolist.c1
  margin .1rem
  ul
    display flex
    flex-wrap: wrap;
    justify-content: space-evenly
    li
      background-color #fff
      border-radius .1rem
      display flex
      height 1.5rem
      margin-bottom .1rem
      .proImg
        display flex
        height 1.5rem
        margin-bottom .1rem
        img
          height 100%
          display block
      .probox
        .title
          margin-top .2rem
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
// 1
.prolist.c2
  margin 1%
  ul
    display flex
    flex-wrap: wrap;
    justify-content: space-evenly
    li
      flex-direction: column
      align-items: center
      background-color #fff
      border-radius .1rem
      display flex
      width 48%
      height 2.9rem
      margin-bottom .1rem
      .proImg
        display flex
        width 1.7rem
        height 1.7rem
        margin-bottom .1rem
        img
          height 100%
          display block
      .probox
        .title
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
</style>
