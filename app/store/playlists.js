export const state = () => ({
  list: [],
  amount: 0,
  hasLoaded: false
})

export const mutations = {
  async getPlaylists (_state) {
    this.commit('playlists/setHasLoadedFalse')
    let res = { next: '/me/playlists?limit=50' }
    do {
      res = await this.$axios.$get(res.next)
      for (const item of res.items) {
        this.commit('playlists/add', item)
      }
    } while (res.next)
    this.commit('playlists/setAmount', res.total)
    this.commit('playlists/setHasLoadedTrue')
  },
  async refreshPlaylists (_state) {
    this.commit('playlists/setHasLoadedFalse')
    this.commit('playlists/empty')
    await this.commit('playlists/getPlaylists')
    this.commit('playlists/setHasLoadedTrue')
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
  empty (state) {
    state.list = []
  },
  setHasLoadedTrue (state) {
    state.hasLoaded = true
  },
  setHasLoadedFalse (state) {
    state.hasLoaded = false
  }
}
