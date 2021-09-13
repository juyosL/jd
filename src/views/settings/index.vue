<template>
  <div class="Box">
    <van-nav-bar title="设置" left-arrow @click-left="$router.back()"/>
    <div @click="fn(true)" class="inp">绑定用户名</div>
    <div @click="fn(false)" class="inp">修改密码</div>
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }" >
      <div>
        <van-button type="default" text="修改密码" disabled></van-button>
        <van-field v-model="values[0]" label="用户名" placeholder="请输入用户名" />
        <van-field v-model="values[1]" label="密码" placeholder="请输入旧密码" />
        <van-field v-model="values[2]" label="密码" placeholder="请输入新密码" />
        <van-button type="info" round text="确认" @click="updateinfo"></van-button>
      </div>
    </van-popup>
    <div>
      <van-button type="danger" round text="退出登录" @click="signout"></van-button>
    </div>
  </div>
</template>
<script>
import { Popup, Field, Button, NavBar } from 'vant'
import { mapMutations } from 'vuex'
export default {
  components: {
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Button.name]: Button,
    [NavBar.name]: NavBar
  },

  data () {
    return {
      values: ['', '', ''],
      show: false,
      flag: false
    }
  },
  methods: {
    ...mapMutations({
      changeLoginState: 'user/changeLoginState'
    }),
    signout () {
      localStorage.removeItem('userid')
      localStorage.removeItem('token')
      localStorage.removeItem('isLogin')
      this.changeLoginState(false)
      this.$touter.replace('/login')
    },
    fn (flag) {
      // true 修改用户名
      this.flag = flag
      this.show = !this.show
    },
    updateinfo () {
      console.log(this.values)
      if (this.flag) {
        this.$http.bindusername({
          userid: localStorage.getItem('userid'),
          oldpassword: this.values[1],
          newpassword: this.values[2]
        }).then(res => {
          console.log(res)
        })
      } else {
        this.$http.updatePassword({
          userid: localStorage.getItem('userid'),
          oldpassword: this.values[1],
          newpassword: this.values[2]
        }).then(res => {
          console.log(res)
        })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.Box
  height 100%
  background-color #f6f6f6
  .inp
    display flex
    margin .15rem auto
    background-color #fedcbd
    border-radius .2rem
    justify-content space-evenly
    align-items center
    width 90%
    height .8rem
  .van-button--normal
    width 100%
  .van-button--danger
    position absolute
    bottom 0
</style>
