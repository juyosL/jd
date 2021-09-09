<template>
  <div>
    <div>
       <van-field
          v-model="pwd"
          right-icon="closed-eye"
          placeholder="请设置8-20位登录密码"
        />
      <van-button round :disabled="flag" class="btn" block color="#ff6666" @click="next" >登录</van-button>
    </div>
  </div>
</template>

<script>
import { Field, Button, Toast, Dialog } from 'vant'
export default {
  computed: {
    flag () {
      return this.pwd.length < 8
    }
  },
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
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
            // console.log('登录页面')
            Dialog.confirm({
              message: '跳转到登录页面'
            })
              .then(() => {
                // on confirm
                this.$router.go(-3)
              })
              .catch(() => {
                // on cancel
              })
          } else {
            Toast(res.data.message)
          }
        })
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
