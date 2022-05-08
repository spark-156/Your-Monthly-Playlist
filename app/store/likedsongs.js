export const state = () => ({
  list: [],
  amount: 0,
  loading: true,
  hasInitialized: false,
  selected: false,
  hasLoaded: false
})

export const mutations = {
  async getLikedSongsInit (_state) {
    this.commit('likedsongs/setLoading', true)
    const res = await this.$axios.$get('/me/tracks?limit=50')
    this.commit('likedsongs/setAmount', res.total)
    for (const item of res.items) {
      this.commit('likedsongs/add', item)
    }
    this.commit('likedsongs/setLoading', false)
    this.commit('likedsongs/setHasInitialized', true)
  },
  refresh () {
    this.commit('likedsongs/reset')
    this.commit('likedsongs/getLikedSongsInit')
  },
  add (state, item) {
    state.list.push(item)
  },
  append (state, items) {
    state.list = state.list.concat(items)
  },
  setAmount (state, amount) {
    state.amount = amount
  },
  remove (state, { item }) {
    state.list.splice(state.list.indexOf(item), 1)
  },
  toggle (state) {
    state.selected = !state.selected
  },
  reset (state) {
    state.loading = true
    state.list = []
    state.amount = 0
    state.hasInitialized = false
    state.selected = false
  },
  setLoading (state, boolean) {
    state.loading = boolean
  },
  setHasInitialized (state, boolean) {
    state.hasInitialized = boolean
  },
  setHasLoaded (state, boolean) {
    state.hasLoaded = boolean
  }
}
