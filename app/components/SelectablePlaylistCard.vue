<template>
  <playlist-card
    class="green-border"
    :icon="icon"
    :outlined="selected"
    :title="title"
    :number-of-songs="numberOfSongs"
    :imageUrl="imageUrl"
    :click="handleChange"
  />
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "SelectablePlaylistCard",
  props: {
    selected: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    numberOfSongs: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  computed: {
    icon() {
      if (!this.selected) {
        return "mdi-plus";
      } else {
        return "mdi-minus";
      }
    },
  },
  methods: {
    handleChange() {
      this.$emit("toggleSelected", this.selected);
    },
  },
});
</script>

<style scoped>
.green-border {
  border-color: #4caf50 !important;
}
</style>
