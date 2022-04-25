/* eslint-disable no-console */
<template>
  <v-btn
    color="green"
    elevation="2"
    large
    raised
    rounded
    x-large
    @click="userLogin"
  >
    Login
  </v-btn>
</template>

<script>
export default {
  name: 'LoginPage',
  methods: {
    async userLogin () {
      try {
        const response = await this.$auth.loginWith('social')
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
