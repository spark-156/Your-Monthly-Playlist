<template>
  <div>
    <v-row>
      <v-col
        cols="12"
      >
        <v-card>
          <v-card-title>Playlists</v-card-title>
          <v-card-subtitle>{{ numberOfPlaylistsString }} found</v-card-subtitle>

          <v-card-text>
            Please select all the playlists you would like to include in the calculation of your monthly playlists.
          </v-card-text>

          <v-card-actions>
            <v-btn
              :loading="!hasLoaded"
              color="green"
              @click="refreshPlaylists"
            >
              REFRESH
            </v-btn>
            <v-btn @click="log">
              DEBUG LOG
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col
        v-if="$fetchState.pending"
        cols="12"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </v-col>

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
    </v-row>
    <v-footer fixed>
      <v-col
        class="text-center"
        cols="12"
      >
        {{ selectectedPlaylistsCount }} playlists selected
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'PlaylistPage',
  data () {
    return {
      user: this.$auth.user
    }
  },
  async fetch () {
    if (!this.hasLoaded) {
      await this.$store.commit('playlists/getPlaylists')
    }
  },
  fetchOnServer: false,
  fetchKey: 'playlists',
  computed: {
    hasLoaded () {
      return this.$store.state.playlists.hasLoaded
    },
    numberOfPlaylistsString () {
      let word = 'playlists'
      if (this.numberOfSongs === 1) { word = 'playlists' }
      return `${this.$store.state.playlists.amount} ${word}`
    },
    playlists () {
      return this.$store.state.playlists.list
    },
    selectectedPlaylistsCount () {
      return this.$store.state.playlists.list.filter(item => item.selected).length
    }
  },
  methods: {
    ...mapMutations({
      toggle: 'playlists/toggle',
      refreshPlaylists: 'playlists/refreshPlaylists'
    }),
    log () {
      console.log(this.$store.state.playlists.list.filter(item => item.selected).length)
      console.log(this.$store.state.playlists.list)
      console.log(this.$store.state.playlists.list.filter(item => item.selected))
    }
  }
}
</script>
