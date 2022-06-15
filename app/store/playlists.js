export const state = () => ({
  list: [],
  amount: 0,
});

export const mutations = {
  add(state, playlist) {
    state.list.push({ playlist, selected: false });
  },
  setAmount(state, amount) {
    state.amount = amount;
  },
  toggle(_state, item) {
    item.selected = !item.selected;
  },
};

export const actions = {
  async getPlaylists({ commit }) {
    let res = { next: "/me/playlists?limit=50" };
    do {
      res = await this.$axios.$get(res.next);
      for (const item of res.items) {
        commit("add", item);
      }
    } while (res.next);
    commit("setAmount", res.total);
  },
};
