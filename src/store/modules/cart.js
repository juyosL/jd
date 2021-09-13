import { getCartList } from '@/utils'
export default {
  namespaced: true,
  state: {
    cartList: ''
  },
  mutations: {
    changelist (state, payload) {
      state.cartList = payload
    }
  },
  actions: {
    init (context, params) {
      if (localStorage.getItem('isLogin')) {
        getCartList(params)
          .then(res => {
            if (res.data.data && res.data.data.length > 0) {
              context.commit('changelist', res.data.data.length)
            } else {
              context.commit('changelist', '')
            }
          })
      } else {
        context.commit('changelist', '')
      }
    }
  }
}
