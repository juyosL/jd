import { Dialog, Toast } from 'vant'
import router from '../../router/index'
import { dologin } from '@/utils'
export default {
  namespaced: true,
  state: {
    isLogin: localStorage.getItem('isLogin') === 'true' || false
  },
  mutations: {
    changeLoginState (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    loginAction (context, params) {
      dologin(params)
        .then(res => {
          if (res.data.code === '200') {
            Toast(res.data.message)
            localStorage.setItem('isLogin', true) // 前端校验登录的方式
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('userid', res.data.data.userid)
            context.commit('changeLoginState', true)
            router.back()
          } else if (res.data.code === '10010') {
            Dialog.confirm({ message: '该用户不存在,手机号未注册,是否去注册' })
              .then(() => {
                // on confirm
                router.push('/register/step1')
              })
              .catch(() => { })
          } else {
            Toast(res.data.message)
            // this.$router.back()
          }
        })
    }
  }
}
