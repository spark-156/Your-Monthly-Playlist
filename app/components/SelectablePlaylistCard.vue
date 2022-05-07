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

<script>
export default {
  name: 'SelectablePlaylistCard',
  props: {
    selected: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    numberOfSongs: {
      type: Number,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    imageUrl: {
      type: String,
      required: false
    }
  },
  computed: {
    icon () {
      if (!this.selected) { return 'mdi-plus' } else { return 'mdi-minus' }
    }
  },
  methods: {
    handleChange () {
      this.$emit('toggleSelected', this.selected)
    }
  }
}
</script>

<style scoped>
.green-border {
  border-color: #4CAF50 !important;
}
</style>
