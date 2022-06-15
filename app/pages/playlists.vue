<template>
  <div class="pb-10 mb-10">
    <v-row>
      <v-col cols="12">
        <v-card :loading="$fetchState.pending">
          <v-card-title>Playlists</v-card-title>
          <v-card-subtitle>{{ numberOfPlaylistsString }} found</v-card-subtitle>

          <v-card-text>
            Please select all the playlists you would like to include in the
            calculation of your monthly playlists.
          </v-card-text>
        </v-card>
      </v-col>

      <template v-if="!$fetchState.pending">
        <v-col cols="12" sm="6" lg="4" xl="2">
          <liked-songs />
        </v-col>

        <v-col
          v-for="(item, i) in playlists"
          :key="i"
          cols="6"
          sm="3"
          lg="2"
          xl="1"
        >
          <selectable-playlist-card
            :title="item.playlist.name"
            :number-of-songs="item.playlist.tracks.total"
            :image-url="getImageUrl(item)"
            :selected="item.selected"
            @toggleSelected="toggle(item)"
          />
        </v-col>
      </template>
    </v-row>
    <v-footer fixed class="pa-3">
      <v-row align="center" no-gutters>
        <v-col class="text-center">
          {{ numberOfPlaylistsSelectedString }} selected
        </v-col>
        <v-col cols="auto" align-self="end">
          <v-btn
            :disabled="!nextButtonDisabled"
            color="green"
            to="/dashboard"
            large
          >
            SHOW MY PLAYLISTS
          </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Playlist } from "~/types/Playlist";
import { accessorType } from "~/store";
import { createMapper } from "typed-vuex";
const mapper = createMapper(accessorType);
export default Vue.extend({
  name: "PlaylistPage",
  beforeRouteLeave(to, _from, next) {
    if (to.name === "dashboard") {
      if (this.selectedAmount === 0) {
        return false;
      }
    }
    next();
  },
  async fetch() {
    await Promise.all([
      this.$accessor.playlists.getPlaylists(),
      this.$accessor.likedsongs.getLikedSongsInit(),
    ]);
  },
  fetchOnServer: true,
  fetchKey: "playlists",
  computed: {
    numberOfPlaylistsString(): string {
      return this.grammarString("playlist", this.$store.state.playlists.amount);
    },
    playlists(): Playlist[] {
      return this.$accessor.playlists.list;
    },
    selectedAmount(): number {
      let count = this.$accessor.playlists.selectedPlaylistAmount;

      if (this.$accessor.likedsongs.selected) {
        count++;
      }

      return count;
    },
    numberOfPlaylistsSelectedString(): string {
      return this.grammarString("playlist", this.selectedAmount);
    },
    nextButtonDisabled(): boolean {
      const amount = this.selectedAmount;
      return amount > 0;
    },
  },
  methods: {
    grammarString(word: string, count: number) {
      if (count === 1) {
        return `${count} ${word}`;
      } else {
        return `${count} ${word}s`;
      }
    },
    toggle(playlist: Playlist) {
      return this.$accessor.playlists.toggle(playlist);
    },
    getImageUrl(item: Playlist) {
      try {
        return item.playlist.images[0].url;
      } catch {
        return undefined;
      }
    },
  },
});
</script>
