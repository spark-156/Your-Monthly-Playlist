import { getterTree, actionTree, mutationTree } from "typed-vuex";
import { Playlist } from "~/types/Playlist";
import { GetUserPlaylists, Item } from "~/types/GetUserPlaylists";

export const state = () => ({
  list: [] as Playlist[],
  amount: 0 as number,
});

export const getters = getterTree(state, {
  selectedPlaylists: (state): Playlist[] =>
    state.list.filter((item) => item.selected),
  selectedPlaylistAmount: (
    _state,
    // getters not auto typed so have to do it myself
    getters: { selectedPlaylists: Playlist[] }
  ): number => getters.selectedPlaylists.length,
});

export const mutations = mutationTree(state, {
  add(state, playlist: Item) {
    state.list.push({ playlist, selected: false });
  },
  setAmount(state, amount: number) {
    state.amount = amount;
  },
  toggle(_state, item: Playlist) {
    item.selected = !item.selected;
  },
});

export const actions = actionTree(
  {
    state,
    // getters,
    mutations,
  },
  {
    async getPlaylists({ commit }): Promise<void> {
      let res: GetUserPlaylists = {
        next: "/me/playlists?limit=50",
        total: 0,
        items: [],
        limit: 50,
        href: "",
        offset: 0,
        previous: null,
      };
      do {
        res = await this.$axios.$get<GetUserPlaylists>(res.next);
        for (const item of res.items) {
          commit("add", item);
        }
      } while (res.next);
      commit("setAmount", res.total);
    },
  }
);
