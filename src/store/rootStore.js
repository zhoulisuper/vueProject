const mutations = {
  setQueryFrom(state, v) {
    state.queryFormStore = Object.assign({}, v)
  },
}
const state = {
  queryFormStore: {},
}
export default {
  namespaced: true,
  state,
  mutations,
}
