<template>
  <div>
    <div>
       <van-nav-bar title="注册" left-arrow @click-left="$router.back()">
      </van-nav-bar>
    </div>
    <div>
       <van-field
          v-model="pwd"
          right-icon="closed-eye"
          placeholder="请设置8-20位登录密码"
        />
      <van-button round class="btn" block color="#ff6666" @click="next" >下一步</van-button>
    </div>
  </div>
</template>

<script>
import { Field, Button, NavBar, Dialog, CountDown } from 'vant'
export default {
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Dialog.Component.name]: Dialog.Component,
    [CountDown.name]: CountDown
  },
  data () {
    return {
      pwd: ''
    }
  },
  mounted () {
    // this.sendCode()
  },
  methods: {
    next () {
      var tel = localStorage.getItem('tel')
      this.$http.dofinishregister({ tel, password: this.pwd })
        .then(res => {
          if (res.data.code === '200') {
            console.log('登录页面')
          } else {
            console.log(res.data.message)
          }
        })
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
