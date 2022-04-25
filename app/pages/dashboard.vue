<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-container>
          <v-btn
            color="primary"
            elevation="4"
            rounded
            x-large
            @click="logUser"
          >
            Log user
          </v-btn>
          <v-btn
            color="primary"
            elevation="4"
            rounded
            x-large
            @click="logAuth"
          >
            Log auth
          </v-btn>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DashboardPage',
  data () {
    return {
      user: this.$auth.user
    }
  },
  methods: {
    logUser () {
      console.log(this.user)
    },
    logAuth () {
      console.log(this.$auth.strategy)
    }
  }
}
</script>
