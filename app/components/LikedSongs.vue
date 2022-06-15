<template>
  <v-card
    class="rounded-lg card d-flex flex-column green-border"
    :class="{ card: !selected, 'card-selected': selected }"
    :outlined="selected"
    height="100%"
    @click="handleChange"
  >
    <v-card-text>
      <span v-for="song in lastFiveLikedSongs" :key="song.track.id">
        <b v-for="artist in song.track.artists">{{ artist.name }}</b>
        {{ song.track.name }}
      </span>
    </v-card-text>
    <v-spacer />
    <v-card-title>Liked Songs</v-card-title>
    <v-card-subtitle>{{ amount }} liked songs</v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "LikedSongs",
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    icon() {
      if (!this.selected) {
        return "mdi-plus";
      } else {
        return "mdi-minus";
      }
    },
    selected() {
      return this.$accessor.likedsongs.selected;
    },
    amount() {
      return this.$accessor.likedsongs.amount;
    },
    lastFiveLikedSongs() {
      return this.$accessor.likedsongs.list.slice(0, 5);
    },
  },
  methods: {
    handleChange() {
      this.$accessor.likedsongs.toggle();
    },
  },
});
</script>

<style scoped>
.card {
  background-image: linear-gradient(to bottom right, #651fff, #8c9eff);
}

.card-selected {
  /* bottom right to accent */
  background-image: linear-gradient(to bottom right, #651fff, #b9f6ca);
}

.green-border {
  border-width: 3px;
  border-color: #4caf50 !important;
}
</style>
