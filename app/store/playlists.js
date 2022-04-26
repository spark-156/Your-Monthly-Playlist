export const state = () => ({
  list: []
})

export const mutations = {
  add (state, playlist) {
    state.list.push({ playlist, selected: false })
  },
  remove (state, { item }) {
    state.list.splice(state.list.indexOf(item), 1)
  },
  toggle (_state, item) {
    item.selected = !item.selected
  }
}
