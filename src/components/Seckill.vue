<template>
  <div class="Seckill">
    <div class="heade">
      <div class="title">海购秒杀</div>
      <div class="nth">{{ hour }}</div>
      <van-count-down :time="time">
        <template #default="timeData">
          <span class="block">{{ timeData.hours }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.minutes }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
      <p>更多秒杀<van-icon name="clock" /></p>
    </div>
    <div></div>
  </div>
</template>
<script>
import { CountDown, Icon } from 'vant'
export default {
  data () {
    return {
      hour: 120 * 1000,
      time: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const date = new Date()
      console.log(date.getFullYear())
      this.hour = date.getHours() % 2 === 0 ? date.getHours() + 2 : date.getHours() - 1
      this.time = new Date(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours() % 2 ? date.getHours() + 1 === 24 ? '00' : date.getHours() + 1 : date.getHours() + 2 === 24 ? '00' : date.getHours() + 2}:00:00`).getTime() - date.getTime()

      // 请求秒杀商品数据
      this.$http.getSeckillList({ count: 1, limitNum: 6 })
        .then(res => {
          console.log(res.data.data)
        })
    }
  },
  components: {
    [CountDown.name]: CountDown,
    [Icon.name]: Icon
  }
}
</script>
<style lang="stylus" scoped>
.Seckill
  height 1.5rem
  margin .1rem
  border-radius .15rem
  background-color #fff
  .heade
    height .34rem
    line-height .34rem
    background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABYwAAACQBAMAAABZrTKvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURUdwTO0QEO0QEO0WFuoNDe0SEuwREewREYfJP0kAAAAIdFJOUwB9ZA+zIzZPcd7tbgAAA/BJREFUeNrt3TGP41QUBtDZtRbaTVig3SxIaS0sQz1oEO0uwaaFIk4LAeK/j+1kMg6FBynzZnPDOfVUnz5dX9vPmZubSW/uHtzeQEjjGt+Jg5ju1Bg1hgtbKuzGqDF8LH+NavyjOIjp51GNfxAHMb0Y1fi1OIjp1ajG78VBUF8fW/y9MIi/VdgpCCu7f+R2mwuDsF4eavxWFAT2YWjx54IgtF/e3N3+LQYAAAAAAACeyKvtYr58Lwci+242+FMSxPXJ7OBXWRBVtriv8TyXBkF9Mzv6ShpEH8Yd45iYXo5aPHsrD0L6bVzjL+RByJ1idsJWQUSfntb4d4kQ0IvTGr+WCAF9OK2xD3uJ6I/TGn8pEQJanNZ4LhHUGD6G2b9IBDUGSwWoMf9XHrhxBbz+4Ap4Gc0VcDSIK+CgJtfAsXmugI+YuIatYvTk2Bf+RPXTQ40/kwbhx7FhTFx+/Ipr4KcIuQZ+GBYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACC3PZEBwWZYVekz0FhedPJcEkRVFtVoVciB4izvGMbF3iqqq667HoiBwjYuqbtbrqtBjAu8UZdX0PV5ZKgg8jcu6bppm7SaP6DtF023HakzgpaLqh7FpTOhpnPWrcdOYxsS+xRuWim4au8cj8lIxTGNLBRe9NRSTB3+y4YFbXa0MYy532A7yqT+o6nX/+kONudwW7980F1Nbxf5PnNXkQuX7x2mTszY/HA2S1nlJO1uVbhiXdbNp28mnwt3uXJaFYXxeiXsiTJRuWW/a5bZtd+uJO7jske2ZR2+jD6ubENPEWzXtu17bTLzdyLse+xrvrBaXjqWkjLdut0ONl+1axAkvetWwulV6nKTG5WEY9+N4Yqu4MYrPuwPpLnrLtp285HFGvJvtocbLXWVxSzYt9he9/pIn5AQ1ru+HcTeObRXparw53IHsVmr89Mp6e6zxcr0SSOKLnktemho3oxo3apxsWhzvQMyKJBe7UY13KzdyqaeFWZGmxvt05/sau+ClnhZdyPJ48ny/3bx7oMZqHHkaz+8TVuPk00LISfI9jImFhNNP47lZ8Sy3eBJ5hqVCjZPdQs/dRNuN49fY64/0MS88cEs1JrL+ufzCy+jUNR69/hDy03M06HnGxT7mhZBTbW37g5rzxw5qcta0GB0NMo1TBFxvHo7Nq3GyaXE8qGlWpMi32yr+w0dMnL28Ne1269h8wruPTdsul9OflHL2OK6a3fARkyyS5Ntd75p2+MBfi5Nux4dPSh0iTLVW9D9e3PjPHqljrtY+8E84JwT8PJe9ovSzQUkHRRewWZy+x7kWpx3ImY0N4BIueCIAALgE/wB5Hy4N/5rMxgAAAABJRU5ErkJggg==') no-repeat
    background-size contain
    .van-icon-clock
      &:before
        transform rotatez(-135deg)
    .van-count-down
      transform scale(0.8)
    .nth
      color #ff2727
      display inline-block
      &:after
        height 0.2rem
        width 0.2rem
        content ""
        display inline-block
        background-position 10%
        vertical-align middle
        background-size contain
        background-image url('//wq.360buyimg.com/wxsq_project/portal/m_jd_index/images/seckill-time-to_1de70c91.png')
        background-repeat no-repeat
    .title
      font-size .14rem
      margin-left .12rem
      margin-right .12rem
      display inline-block
    p
      float right
      color #f23030
    .van-count-down
      display inline-block
    .colon
      display: inline-block
      margin: 0 4px
      color: #ee0a24
    .block
      display: inline-block
      width: 22px
      color: #fff
      border-radius .08rem
      font-size: 12px
      text-align: center
      background-color: #ee0a24
</style>
