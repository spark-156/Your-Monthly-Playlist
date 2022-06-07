export const state = () => ({
  list: [],
  amount: 0,
  selected: false
})

export const mutations = {
  append (state, items) {
    state.list = state.list.concat(items)
  },
  setAmount (state, amount) {
    state.amount = amount
  },
  toggle (state) {
    state.selected = !state.selected
  }
}

export const actions = {
  async getLikedSongsInit ({ commit }) {
    const res = await this.$axios.$get('/me/tracks?limit=50')
    commit('setAmount', res.total)
    commit('append', res.items)
  }
}
