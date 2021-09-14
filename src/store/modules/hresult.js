export default {
  namespaced: true,
  state: {
    // true 搜索, false 分类
    Classification: false
  },
  mutations: {
    Changestate (state, payload) {
      state.Classification = payload
    }
  }
}
