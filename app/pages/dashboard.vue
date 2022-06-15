<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-btn @click="log">Log</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "DashboardPage",
  beforeRouteEnter(_to, _from, next) {
    next((vm) => {
      let count = vm.$accessor.playlists.selectedPlaylistAmount;

      if (vm.$accessor.likedsongs.selected) {
        count++;
      }

      if (count === 0) {
        next("/playlists");
      }
    });
  },
  data() {
    return {
      fetchingPlaylist: "",
    };
  },
  async fetch() {},
  fetchOnServer: false,
  fetchKey: "dashboard",
  computed: {
    selectedPlaylists() {
      return this.$accessor.playlists.selectedPlaylists;
    },
  },
  created() {
    console.log();
  },
  methods: {
    log() {
      console.log(this.selectedPlaylists);
    },
  },
  // methods: {
  //   async getLikedSongs() {
  //     if (this.$store.state.likedsongs.hasLoaded) {
  //       return;
  //     }
  //     this.$store.commit("likedsongs.ts/setLoading", true);
  //     let res = { next: "/me/tracks?limit=50" };
  //     do {
  //       res = await this.$axios.$get(res.next);
  //       this.$store.commit("likedsongs.ts/append", res.items);
  //     } while (res.next);
  //     this.$store.commit("likedsongs.ts/setLoading", false);
  //     this.$store.commit("likedsongs.ts/setHasLoaded", true);
  //   },
  //   async getSongsFromPlaylist(item) {
  //     if (item.playlist.tracks.hasLoaded) {
  //       return;
  //     }
  //     this.$store.commit("playlists/resetPlaylistTrackItems", item);
  //     let res = { next: item.playlist.tracks.href };
  //     do {
  //       res = await this.$axios.$get(res.next);
  //       this.$store.commit("playlists/appendPlaylistTrackItems", [
  //         item,
  //         res.items,
  //       ]);
  //     } while (res.next);
  //     this.$store.commit("playlists/setPlaylistTrackHasLoaded", [item, true]);
  //   },
  //   songsFetched() {
  //     // Not a computed property because caching of computed properties makes it so that new keys added in a dict in state do not get read:
  //     // https://stackoverflow.com/questions/42678983/vue-js-computed-property-not-updating
  //     let counter = 0;
  //     if (this.$store.state.likedsongs.selected) {
  //       counter += this.$store.state.likedsongs.list.length;
  //     }
  //     // for (const { playlist } of this.selectedPlaylistsList) {
  //     //   if (playlist.tracks.items) {
  //     //     counter += playlist.tracks.items.length;
  //     //   }
  //     // }
  //     return counter;
  //   },
  // },
});
</script>
