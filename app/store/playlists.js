export const state = () => ({
  list: [],
  amount: 0
})

export const mutations = {
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
    console.log(item)
    item.selected = !item.selected
  },
  empty (state) {
    state.list = []
  }
}
