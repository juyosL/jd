<template>
  <div>
    <div>
      <van-field v-model="tel" type="tel" label="手机号" placeholder="请输入手机号" />
      <van-button round class="btn" block color="#ff6666" @click="next" :disabled="flag">下一步</van-button>
    </div>
  </div>
</template>

<script>
import { Field, Button, Dialog } from 'vant'
export default {
  computed: {
    flag () {
      return !/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(this.tel)
    }
  },
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Dialog.Component.name]: Dialog.Component
  },
  data () {
    return {
      tel: ''
    }
  },
  methods: {
    next () {
      this.$http.docheckphone({ tel: this.tel })
        .then(res => {
          if (res.data.code === '10005') {
            Dialog.confirm({
              message: `${res.data.message},为您跳转登录页面?`
            }).then(() => {
              this.$router.push('/login')
            }).catch(() => { })
          } else {
            Dialog.confirm({ message: `我们将发送短信验证码至:<br>${this.tel}` })
              .then(() => {
                // on confirm
                localStorage.setItem('tel', this.tel)
                this.$router.push('/register/step2')
              })
              .catch(() => { })
          }
        })
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
