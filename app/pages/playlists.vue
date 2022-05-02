<template>
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
            @click="refreshPlaylists"
            color="green"
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
      v-for="(item, i) in unselectedPlaylists"
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
      await this.refreshPlaylists()
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
    unselectedPlaylists () {
      return this.$store.state.playlists.list.filter(item => !item.selectected)
    },
    selectectedPlaylists () {
      return this.$store.state.playlists.list.filter(item => item.selectected)
    }
  },
  methods: {
    async getPlaylists () {
      let res = { next: '/me/playlists?limit=50' }
      do {
        res = await this.$axios.$get(res.next)
        for (const item of res.items) {
          this.$store.commit('playlists/add', item)
        }
      } while (res.next)
      this.$store.commit('playlists/setAmount', res.total)
    },
    async refreshPlaylists () {
      this.$store.commit('playlists/setHasLoadedFalse')
      this.$store.commit('playlists/empty')
      await this.getPlaylists()
      this.$store.commit('playlists/setHasLoadedTrue')
    },
    ...mapMutations({
      toggle: 'playlists/toggle'
    }),
    log () {
      console.log(this.$store.state.playlists.list)
      console.log(this.$store.state.playlists.list.filter(item => item.selected))
    }
  }
}
</script>
