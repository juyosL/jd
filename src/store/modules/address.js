export default {
  namespaced: true,
  state: {
    newAddress: ''
  },
  mutations: {
    upaddress (state, payload) {
      state.newAddress = payload
    }
  },
  actions: {
  }
}
