<template>
  <v-card
    class="rounded-lg card d-flex flex-column"
    :loading="loading"
    height="100%"
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
  computed: {
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
  }
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';

.card {
  background-image: linear-gradient(to bottom right, #9C27B0, #EA80FC);
}
</style>
