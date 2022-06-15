import { getAccessorType } from "typed-vuex";

// Import all your submodules
import * as likedsongs from "~/store/likedsongs";
import * as playlists from "~/store/playlists";

// Keep your existing vanilla Vuex code for state, getters, mutations, actions, plugins, etc.
// ...

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  // state,
  // getters,
  // mutations,
  // actions,
  modules: {
    // The key (submodule) needs to match the Nuxt namespace (e.g. ~/store/submodule.ts)
    likedsongs,
    playlists,
  },
});
