<template>
  <v-card
    class="rounded-lg card d-flex flex-column green-border"
    :class="{ card: !selected, 'card-selected': selected }"
    :outlined="selected"
    :loading="loading"
    height="100%"
    @click="handleChange"
  >
    <v-card-text>
      <div v-for="song in lastFiveLikedSongs" :key="song.track.id">
        {{ song.track.name }}
      </div>
    </v-card-text>
    <v-spacer />
    <v-card-title>Liked Songs</v-card-title>
    <v-card-subtitle>{{ amount }} liked songs</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: 'LikedSongs',
  data () {
    return {
      hover: false
    }
  },
  computed: {
    icon () {
      if (!this.selected) { return 'mdi-plus' } else { return 'mdi-minus' }
    },
    selected () {
      return this.$store.state.likedsongs.selected
    },
    loading () {
      return this.$store.state.likedsongs.loading
    },
    amount () {
      return this.$store.state.likedsongs.amount
    },
    lastFiveLikedSongs () {
      return this.$store.state.likedsongs.list.slice(0, 5)
    },
    lastLikedSong () {
      return this.$store.state.likedsongs.list[0]
    },
    lastLikedSongImage () {
      return this.lastLikedSong.track.album.images[0]
    },
    lastLikedSongAddedDate () {
      return new Date(this.lastLikedSong.added_at).toLocaleDateString()
    },
    lastLikedSongTrackName () {
      return this.lastLikedSong.track.name
    }
  },
  methods: {
    handleChange () {
      this.$store.commit('likedsongs/toggle')
    }
  }
}
</script>

<style scoped>
.card {
  background-image: linear-gradient(to bottom right, #651FFF, #8C9EFF);
}

.card-selected {
  /* bottom right to accent */
  background-image: linear-gradient(to bottom right, #651FFF, #B9F6CA);
}

.floating-fab-bottom {
  bottom: 16px;
}

.green-border {
  border-width: 3px;
  border-color: #4CAF50 !important;
}
</style>
