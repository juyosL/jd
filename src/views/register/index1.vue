<template>
  <div>
    <div>
       <van-nav-bar title="注册" left-arrow @click-left="$router.back()">
      </van-nav-bar>
    </div>
    <div>
      <van-field v-model="tel" type="tel" label="手机号" placeholder="请输入手机号" />
      <van-button round class="btn" block color="#ff6666" @click="next" ref="btn">下一步</van-button>
    </div>
  </div>
</template>

<script>
import { Field, Button, NavBar, Dialog } from 'vant'
export default {
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Dialog.Component.name]: Dialog.Component
  },
  data () {
    return {
      tel: ''
    }
  },
  methods: {
    next () {
      Dialog.confirm({ title: '标题', message: `我们将发送短信/语音验证码至:${this.tel}` })
        .then(() => {
          // on confirm
          this.$http.docheckphone({ tel: this.tel })
            .then(res => {
              if (res.data.code === '10005') {
                Dialog.alert({
                  message: res.data.message
                })
              } else {
                localStorage.setItem('tel', this.tel)
                this.$router.push('/register/step2')
              }
            })
        })
        .catch(() => {
        })
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
