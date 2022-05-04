export const state = () => ({
  list: [],
  amount: 0,
  loading: true,
  loadingPercentage: 0,
  hasInitialized: false,
  selected: false
})

export const mutations = {
  async getLikedSongsInit (_state) {
    this.commit('likedsongs/setLoading', true)
    const res = await this.$axios.$get('/me/tracks')
    this.commit('likedsongs/setAmount', res.total)
    for (const item of res.items) {
      this.commit('likedsongs/add', item)
    }
    this.commit('likedsongs/setLoading', false)
    this.commit('likedsongs/setHasInitialized', true)
  },
  async getLikedSongs (_state) {
    this.commit('likedsongs/setLoading', true)
    let res = { next: '/me/playlists?limit=50' }
    this.commit('likedsongs/setAmount', res.total)
    do {
      res = await this.$axios.$get(res.next)
      for (const item of res.items) {
        this.commit('likedsongs/add', item)
      }
    } while (res.next)
    this.commit('likedsongs/setLoading', false)
  },
  add (state, item) {
    state.list.push(item)
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
    state.loadingPercentage = 0
    state.hasInitialized = false
    state.selected = false
  },
  setLoading (state, boolean) {
    state.loading = boolean
  },
  setHasInitialized (state, boolean) {
    state.hasInitialized = boolean
  }
}
