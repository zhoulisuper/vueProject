const mutations = {
  setQueryFrom(state, v) {
    state.queryFormStore = v
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
