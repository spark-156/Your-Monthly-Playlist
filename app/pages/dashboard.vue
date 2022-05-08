<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-container v-if="loading">
        <v-row
          class="fill-height"
          align-content="center"
          justify="center"
        >
          <v-col
            class="text-subtitle-1 text-center"
            cols="12"
          >
            Getting your songs from {{ fetchingPlaylist }}
          </v-col>
          <v-col cols="6">
            <v-progress-linear
              v-model="loadingPercentage"
              color="deep-purple accent-4"
              rounded
              height="6"
            />
          </v-col>
          <v-col
            class="text-subtitle-1 text-center"
            cols="12"
          >
            {{ songsFetched() }} out of {{ amountOfSongsToFetch }}
          </v-col>
        </v-row>
      </v-container>
      <v-card v-else>
        <v-card-title>Your Monthly Playlists</v-card-title>
        <v-card-text>Fetched {{ songsFetched() }} songs of {{ amountOfSongsToFetch }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DashboardPage',
  beforeRouteEnter (_to, _from, next) {
    next((vm) => {
      if (vm.$store.state.playlists.list.filter(item => item.selected).length + vm.$store.state.likedsongs.selected === 0) {
        next('/playlists')
      }
    })
  },
  data () {
    return {
      user: this.$auth.user,
      fetchingPlaylist: '',
      loading: true
    }
  },
  async fetch () {
    if (this.$store.state.likedsongs.selected) {
      if (!this.$store.state.likedsongs.hasLoaded) {
        this.fetchingPlaylist = 'Liked Songs'
        await this.getLikedSongs()
      }
    }
    for (const item of this.selectedPlaylistsList) {
      if (!item.playlist.tracks.hasLoaded) {
        this.fetchingPlaylist = item.playlist.name
        await this.getSongsFromPlaylist(item)
      }
    }
    this.loading = false
  },
  fetchOnServer: false,
  fetchKey: 'dashboard',
  computed: {
    selectedPlaylistsList () {
      return this.$store.state.playlists.list.filter(item => item.selected)
    },
    amountOfSongsToFetch () {
      let counter = 0
      if (this.$store.state.likedsongs.selected) {
        counter += this.$store.state.likedsongs.amount
      }
      for (const { playlist } of this.selectedPlaylistsList) {
        counter += playlist.tracks.total
      }
      return counter
    },
    loadingPercentage () {
      return this.songsFetched() / this.amountOfSongsToFetch * 100
    }
  },
  methods: {
    async getLikedSongs () {
      if (this.$store.state.likedsongs.hasLoaded) { return }
      this.$store.commit('likedsongs/setLoading', true)
      let res
      if (this.$store.state.likedsongs.hasInitialized) {
        res = { next: '/me/tracks?offset=50&limit=50' }
      } else {
        res = { next: '/me/tracks?limit=50' }
      }
      do {
        res = await this.$axios.$get(res.next)
        this.$store.commit('likedsongs/append', res.items)
      } while (res.next)
      this.$store.commit('likedsongs/setLoading', false)
      this.$store.commit('likedsongs/setHasLoaded', true)
    },
    async getSongsFromPlaylist (item) {
      if (item.playlist.tracks.hasLoaded) { return }
      this.$store.commit('playlists/resetPlaylistTrackItems', item)
      let res = { next: item.playlist.tracks.href }
      do {
        res = await this.$axios.$get(res.next)
        this.$store.commit('playlists/appendPlaylistTrackItems', [item, res.items])
      } while (res.next)
      this.$store.commit('playlists/setPlaylistTrackHasLoaded', [item, true])
    },
    songsFetched () {
      // Not a computed property because caching of computed properties makes it so that new keys added in a dict in state do not get read:
      // https://stackoverflow.com/questions/42678983/vue-js-computed-property-not-updating
      let counter = 0
      if (this.$store.state.likedsongs.selected) {
        counter += this.$store.state.likedsongs.list.length
      }
      for (const { playlist } of this.selectedPlaylistsList) {
        if (playlist.tracks.items) {
          counter += playlist.tracks.items.length
        }
      }
      return counter
    }
  }
}
</script>
