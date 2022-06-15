import {
  mutationTree,
  actionTree,
  // getterTree
} from "typed-vuex";
import { GetLikedSongs } from "~/types/GetLikedSongs";
import { LikedSong } from "~/types/LikedSong";

export const state = () => ({
  list: [] as LikedSong[],
  amount: 0 as number,
  selected: false as boolean,
});

export const mutations = mutationTree(state, {
  append(state, items: LikedSong[]) {
    state.list = state.list.concat(items);
  },
  setAmount(state, amount: number) {
    state.amount = amount;
  },
  toggle(state) {
    state.selected = !state.selected;
  },
});

export const actions = actionTree(
  {
    state,
    // getters,
    mutations,
  },
  {
    async getLikedSongsInit({ commit }): Promise<void> {
      const res = await this.$axios.$get<GetLikedSongs>("/me/tracks?limit=50");
      commit("setAmount", res.total);
      commit("append", res.items);
    },
  }
);
