import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Luca Bergman',
    title: 'Your Spotify Monthly',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  auth: {
    redirect: {
      logout: '/logout'
    },
    plugins: [],
    // cookie: false,
    localStorage: false,
    strategies: {
      social: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://accounts.spotify.com/authorize',
          token: undefined,
          userInfo: 'https://api.spotify.com/v1/me'
          // logout: '/'
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800
        },
        // refreshToken: {
        //   property: 'refresh_token',
        //   maxAge: 60 * 60 * 24 * 30
        // },
        responseType: 'token',
        grantType: 'authorization_code',
        accessType: undefined,
        redirectUri: `${process.env.CLIENT_URL}/dashboard`,
        logoutRedirectUri: undefined,
        clientId: process.env.SPOTIFY_CLIENT_ID,
        scope: ['user-read-private', 'user-read-email', 'user-follow-read', 'playlist-read-collaborative', 'playlist-read-private', 'user-library-read'],
        state: '',
        codeChallengeMethod: '',
        responseMode: '',
        acrValues: '',
        autoLogout: true
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://api.spotify.com/v1'
  },

  compilerOptions: {
    types: [
      '@nuxtjs/auth-next'
    ]
  },

  router: {
    middleware: ['auth']
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build:
   {
     watch: ['api'],
     /*
    ** You can extend webpack config here
    */
     extend (_config, _ctx) {}
   },

  serverMiddleware: [
    '~/api'
  ]
}
