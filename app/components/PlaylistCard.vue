<template>
  <v-card
    class="rounded-lg"
    :outlined="selected"
  >
    <v-responsive :aspect-ratio="1/1.5">
      <v-container>
        <v-responsive :aspect-ratio="1">
          <v-avatar
            class="rounded-lg"
            tile
            width="100%"
            height="100%"
          >
            <v-img
              v-if="image"
              :aspect-ratio="1"
              :src="image.url"
            />
            <v-icon
              v-else
            >
              mdi-music
            </v-icon>
          </v-avatar>
        </v-responsive>
      </v-container>
      <v-tooltip
        bottom
        open-on-hover
        open-delay="1000"
      >
        <template #activator="{ on, attrs }">
          <div
            v-bind="attrs"
            v-on="on"
          >
            <v-card-title>
              <div
                class="text-truncate"
                style="max-width: 100%;"
              >
                {{ title }}
              </div>
            </v-card-title>
            <v-card-subtitle>{{ numberOfSongsString }}</v-card-subtitle>
          </div>
        </template>
        <span>{{ title }}</span>
      </v-tooltip>
    </v-responsive>
  </v-card>
</template>

<script>
export default {
  name: 'PlaylistComponent',
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
    image: {
      type: Object,
      required: true
    }
  },
  computed: {
    numberOfSongsString () {
      let word = 'songs'
      if (this.numberOfSongs === 1) { word = 'song' }
      return `${this.numberOfSongs} ${word}`
    }
  },
  methods: {
    handleClick () {
      console.log(this.title)
    },
    handleChange () {
      this.$emit('input', this.selected)
    }
  }
}
</script>
