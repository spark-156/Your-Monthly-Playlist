<template>
  <div class="pb-10 mb-10">
    <v-row>
      <v-col
        cols="12"
      >
        <v-card
          :loading="loading"
        >
          <v-card-title>Playlists</v-card-title>
          <v-card-subtitle>{{ numberOfPlaylistsString }} found</v-card-subtitle>

          <v-card-text>
            Please select all the playlists you would like to include in the calculation of your monthly playlists.
          </v-card-text>

          <v-card-actions>
            <v-btn
              :loading="!hasLikedSongsAndPlaylistsLoaded"
              color="green"
              @click="refresh"
            >
              CLEAR &amp; REFRESH
            </v-btn>
            <v-btn @click="log">
              DEBUG LOG
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="4"
        xl="2"
      >
        <liked-songs />
      </v-col>

      <template
        v-if="!loading"
      >
        <v-col
          v-for="(item, i) in playlists"
          :key="i"
          cols="6"
          sm="3"
          lg="2"
          xl="1"
        >
          <playlist-card
            :title="item.playlist.name"
            :number-of-songs="item.playlist.tracks.total"
            :image="item.playlist.images[0]"
            :selected="item.selected"
            @toggleSelected="toggle(item)"
          />
        </v-col>
      </template>
    </v-row>
    <v-footer fixed class="pa-3">
      <v-row
        align="center"
        no-gutters
      >
        <v-col
          class="text-center"
        >
          {{ numberOfPlaylistsSelectedString }} selected
        </v-col>
        <v-col
          cols="auto"
          align-self="end"
        >
          <v-btn
            :disabled="nextButtonDisabled"
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

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'PlaylistPage',
  beforeRouteLeave (to, _from, next) {
    if (to.name === 'dashboard') {
      if (this.selectedPlaylistsCount === 0) {
        return false
      }
    }
    next()
  },
  data () {
    return {
      user: this.$auth.user
    }
  },
  async fetch () {
    if (!this.hasLoaded) {
      await this.$store.commit('playlists/getPlaylists')
      await this.$store.commit('likedsongs/getLikedSongsInit')
    }
  },
  fetchOnServer: false,
  fetchKey: 'playlists',
  computed: {
    hasLikedSongsAndPlaylistsLoaded () {
      return !this.$store.state.playlists.loading && !this.$store.state.likedsongs.loading
    },
    numberOfPlaylistsString () {
      return this.grammarString('playlist', this.$store.state.playlists.amount)
    },
    playlists () {
      return this.$store.state.playlists.list
    },
    loading () {
      return this.$store.state.playlists.loading
    },
    selectedPlaylistsCount () {
      let count = this.$store.state.playlists.list.filter(item => item.selected).length

      if (this.$store.state.likedsongs.selected) { count++ }

      return count
    },
    numberOfPlaylistsSelectedString () {
      return this.grammarString('playlist', this.selectedPlaylistsCount)
    },
    nextButtonDisabled () {
      return !this.selectedPlaylistsCount > 0
    }
  },
  methods: {
    grammarString (word, count) {
      if (count === 1) { return `${count} ${word}` } else { return `${count} ${word}s` }
    },
    refresh () {
      this.$store.commit('playlists/refresh')
      this.$store.commit('likedsongs/refresh')
    },
    ...mapMutations({
      toggle: 'playlists/toggle'
    }),
    log () {
      console.log(this.$store.state.playlists.list.filter(item => item.selected).length)
      console.log(this.$store.state.playlists.list)
      console.log(this.$store.state.playlists.list.filter(item => item.selected))
    }
  }
}
</script>
