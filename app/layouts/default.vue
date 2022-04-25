<template>
  <v-app dark>
    <v-app-bar
      clipped-left
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <v-btn
          class="btn-fix"
          x-large
          :to="homeButtonLink"
        >
          Your Spotify Monthly
        </v-btn>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          @click="drawer = false"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <div v-if="loggedIn">
          <v-list-item>
            <v-list-item-action>
              <v-avatar
                size="30px"
              >
                <v-img
                  v-if="profileImage"
                  alt="Avatar"
                  :src="profileImage.url"
                  :height="profileImage.height"
                  :width="profileImage.width"
                />
                <v-icon
                  v-else
                  color="blue"
                  text="mdi-account-multiple"
                />
              </v-avatar>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ user.display_name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-btn
              block
              color="primary"
              outlined
              elevation="2"
              @click="logout"
            >
              Logout
            </v-btn>
          </v-list-item>
        </div>

        <v-list-item>
          <v-list-item-content>
            <span>&copy; Made by <a href="https://www.lucabergman.nl/" target="_blank" class="button--doc text-green-500 hover:underline">Luca Bergman</a></span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      loggedIn: this.$auth.loggedIn,
      user: this.$auth.user,
      drawer: false,
      items: [
        {
          icon: 'mdi-home-variant',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/dashboard'
        }
      ]
    }
  },
  computed: {
    profileImage () {
      return this.user.images[0]
    },
    homeButtonLink () {
      if (this.$auth.loggedIn) {
        return '/dashboard'
      } else {
        return '/'
      }
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>

<style scoped>
.btn-fix::before {
  opacity: 0 !important;
}
</style>
