<template>
  <v-app>
    <v-app-bar class="mb-5 blue darken-1" app>
      <v-toolbar-title class="headline text-uppercase blue--text text--lighten-5">Nasa Mars Rover</v-toolbar-title>
      <v-spacer />
      <a exact href="https://github.com/SaishSankhe/NASA-MarsRover" target="blank">
        <v-btn icon>
        <v-icon large color="white">mdi-github</v-icon>
      </v-btn>
      </a>
    </v-app-bar>

    <v-main class="mx-10">
      <MarsRover/>
    </v-main>
  </v-app>
</template>

<script>
import MarsRover from './components/MarsRover';

export default {
  name: 'App',

  components: {
    MarsRover,
  },

  data: () => ({
    //
  }),
};
</script>
