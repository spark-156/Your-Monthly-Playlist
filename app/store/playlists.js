export const state = () => ({
  list: [],
  amount: 0,
  loading: true
})

export const mutations = {
  async getPlaylists (_state) {
    this.commit('playlists/setLoading', true)
    let res = { next: '/me/playlists?limit=50' }
    do {
      res = await this.$axios.$get(res.next)
      for (const item of res.items) {
        this.commit('playlists/add', item)
      }
    } while (res.next)
    this.commit('playlists/setAmount', res.total)
    this.commit('playlists/setLoading', false)
  },
  refresh () {
    this.commit('playlists/reset')
    this.commit('playlists/getPlaylists')
  },
  add (state, playlist) {
    state.list.push({ playlist, selected: false })
  },
  setAmount (state, amount) {
    state.amount = amount
  },
  remove (state, { item }) {
    state.list.splice(state.list.indexOf(item), 1)
  },
  toggle (_state, item) {
    item.selected = !item.selected
  },
  reset (state) {
    state.loading = true
    state.list = []
    state.amount = 0
  },
  setLoading (state, boolean) {
    state.loading = boolean
  }
}
