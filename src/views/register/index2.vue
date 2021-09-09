<template>
  <div>
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
      <van-button round class="btn" :disabled="flag" block color="#ff6666" @click="next" >下一步</van-button>
    </div>
  </div>
</template>

<script>
import { Field, Button, Toast } from 'vant'
export default {
  computed: {
    flag () {
      return this.sms.length < 4
    }
  },
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast
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
    this.sendCode()
  },
  methods: {
    next () {
      var tel = localStorage.getItem('tel')
      // 验证码
      this.$http.docheckcode({ tel, telcode: this.sms })
        .then(res => {
          console.log(res)
          if (res.data.code === '10007') {
            Toast(res.data.message)
          } else {
            this.$router.push('/register/step3')
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
          this.text = `重新发送(${this.time})`
          this.time--
        } else {
          this.time = 60
          clearTimeout(this.timer)
        }
      }, 1000)
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
