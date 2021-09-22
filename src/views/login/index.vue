<template>
  <div>
    <div>
       <van-nav-bar title="登录" left-arrow @click-left="$router.back()"/>
    </div>
    <div>
      <van-field
        v-model="loginname"
        right-icon="closed-eye"
        placeholder="账户名/手机号/邮箱"
      />
      <van-field
        v-model="pwd"
        right-icon="closed-eye"
        placeholder="请设置8-20位登录密码"
      />
      <van-button round class="btn" block color="#ff6666" @click="next" >登录</van-button>
      <router-link to="/register/step1">立即注册</router-link>
    </div>
  </div>
</template>

<script>
import { Field, Button, NavBar, Toast, Dialog } from 'vant'
import { mapActions } from 'vuex'
export default {
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Dialog.Component.name]: Dialog.Component
  },
  data () {
    return {
      loginname: '',
      pwd: ''
    }
  },
  mounted () {
    // 13935252215账号
    this.loginname = localStorage.getItem('tel') ? localStorage.getItem('tel') : ''
  },
  methods: {
    ...mapActions({
      loginAction: 'user/loginAction'
    }),
    next () {
      this.loginAction({ loginname: this.loginname, password: this.pwd })
      // this.$router.back()
    }
  }
}
</script>
<style lang="stylus" scoped>
.btn
  margin-bottom .1rem
</style>
