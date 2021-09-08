<template>
  <div>
    <div>
       <van-nav-bar title="注册" left-arrow @click-left="$router.back()">
      </van-nav-bar>
    </div>
    <div>
      <van-field
      v-model="sms"
      center
      clearable
      label="短信验证码"
      placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button size="small" type="primary" @click="sendCode" :disabled="time === 60 ? false : true">
            {{text}}
          </van-button>
        </template>
      </van-field>
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
      sms: '',
      text: '发送验证码',
      timer: '',
      time: 60
    }
  },
  mounted () {
    // this.sendCode()
  },
  methods: {
    next () {
      var tel = localStorage.getItem('tel')
      this.$http.docheckcode({ tel, telcode: this.sms })
        .then(res => {
          console.log(res)
          if (res.data.code === '10007') {
            console.log('验证码错误')
          } else {
            this.$router.replace('/register/step3')
          }
        })
    },
    sendCode () {
      var tel = localStorage.getItem('tel')
      this.$http.dosendmsgcode({ tel })
        .then(res => {
          console.log('发送成功', res.data.data)
        })
      this.timer = setInterval(() => {
        if (this.time >= 0) {
          this.text = this.time
          this.time--
        } else {
          this.time = 60
          clearTimeout(this.timer)
        }
      }, 1000)
      setTimeout(() => {
        clearTimeout(this.timer)
        this.time = 60
        this.text = '重新发送'
      }, 60000)
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
