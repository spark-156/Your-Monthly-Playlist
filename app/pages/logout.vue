<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-container>
          You have been logged out. Thanks for using my application!
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "LogoutPage",
  //@ts-ignore
  auth: false,
});
</script>
