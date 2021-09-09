<template>
  <div>
    <div>
       <van-nav-bar title="登录" left-arrow @click-left="$router.back()">
      </van-nav-bar>
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
    next () {
      this.$http.dologin({ loginname: this.loginname, password: this.pwd })
        .then(res => {
          console.log(res)
          if (res.data.code === '200') {
            Toast(res.data.message)
            localStorage.setItem('isLogin', true) // 前端校验登录的方式
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('userid', res.data.data.userid)
            this.$router.back()
          } else if (res.data.code === '10010') {
            Dialog.confirm({ message: '该用户不存在,手机号未注册,是否去注册' })
              .then(() => {
                // on confirm
                this.$router.push('/register/step1')
              })
              .catch(() => { })
          } else {
            Toast(res.data.message)
            this.$router.back()
          }
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.btn
  margin-bottom .1rem
</style>
