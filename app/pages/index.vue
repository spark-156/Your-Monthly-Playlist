<template>
  <section class="d-flex flex-column justify-center pa-2 text-center" fill-height>
    <v-img
      contain
      max-height="400"
      width="auto"
      src="/Example.png"
    />

    <blockquote class="blockquote text-center">
      &#8220;I wish I could see all the songs I've added in a particular month without putting all the effort in like my friends do&#8221;
      <footer>
        <small>
          <em>&mdash;Luca Bergman</em>
        </small>
      </footer>
    </blockquote>

    <p class="my-10">
      Boy do I have the tool for you! It's this one right on this very website! Do you also have friends that have those awesome playlists detailing what songs they added to their grand containerv-containerlection every month? Well I do and I'm very jealous but also way too lazy to do what they're doing.
    </p>

    <p class="my-10">
      Now you don't have to do a single thing anymore. This appliction will parse through all your selected playlists and sort them for you. You can also very easily save all the songs in a new playlist. All super simple fast and low effort. Absolutely perfect in my eyes!
    </p>
    <p>
      <v-btn
        x-large
        rounded
        nuxt
        color="green"
        to="login"
      >
        Try it out!
      </v-btn>
    </p>
  </section>
</template>

<script>
export default {
  name: 'IndexPage',
  auth: false
}
</script>
