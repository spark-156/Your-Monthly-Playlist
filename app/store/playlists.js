export const state = () => ({
  list: [],
  amount: 0,
  loading: true,
  hasLoaded: false
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
    this.commit('playlists/setHasLoaded', true)
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
  },
  appendPlaylistTrackItems (_state, [item, tracks]) {
    if (item.playlist.tracks.items) {
      item.playlist.tracks.items = item.playlist.tracks.items.concat(tracks)
    } else {
      item.playlist.tracks.items = tracks
    }
  },
  resetPlaylistTrackItems (_state, item) {
    item.playlist.tracks.items = []
    item.playlist.tracks.hasLoaded = false
  },
  setPlaylistTrackHasLoaded (_state, [item, boolean]) {
    item.playlist.tracks.hasLoaded = boolean
  },
  setHasLoaded (state, boolean) {
    state.hasLoaded = boolean
  }
}
