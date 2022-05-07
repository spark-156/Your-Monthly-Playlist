<template>
  <v-card
    class="rounded-lg"
    :outlined="outlined"
    :color="cardColor"
    @click="click"
    @mouseover="hover = true"
    @mouseleave="hover = false"
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
            <v-fab-transition>
              <v-btn
                v-show="hover"
                fab
                color="green"
                absolute
                right
                small
                class="floating-fab-bottom"
              >
                <v-icon>{{ icon }}</v-icon>
              </v-btn>
            </v-fab-transition>
            <v-img
              v-if="imageUrl"
              :aspect-ratio="1"
              :src="imageUrl"
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
    outlined: {
      type: Boolean,
      default: false
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
    },
    icon: {
      type: String,
      required: true
    },
    click: Function
  },
  data () {
    return {
      hover: false
    }
  },
  computed: {
    numberOfSongsString () {
      let word = 'songs'
      if (this.numberOfSongs === 1) { word = 'song' }
      return `${this.numberOfSongs} ${word}`
    },
    cardColor () {
      if (this.hover) {
        return '#303030'
      } else {
        return 'dark'
      }
    }
  }
}
</script>

<style scoped>
.floating-fab-bottom {
  bottom: 16px;
}
</style>
