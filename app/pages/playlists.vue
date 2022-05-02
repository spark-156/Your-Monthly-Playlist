<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-card>
        <v-card-title>Playlists</v-card-title>
        <v-card-actions>
          <v-btn @click="log">
            log
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
        v-model="item.selected"
        :title="item.playlist.name"
        :number-of-songs="item.playlist.tracks.total"
        :image="item.playlist.images[0]"
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
    this.$store.commit('playlists/empty')
    await this.getPlaylists()
  },
  fetchOnServer: false,
  fetchKey: 'playlists',
  computed: {
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
