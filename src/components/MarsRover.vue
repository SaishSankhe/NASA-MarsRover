<template>

  <v-container class="my-5">
    <!-- card with all selection items -->
    <v-card flat outlined class="pa-3 mb-5 blue--text text--darken-4">
      <!-- Choose rover -->
      <v-layout row wrap justify-center align-center>
        <v-flex xs12 md6 lg6 class="mb-3 text-center">
          <h2>Choose rover</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center align-center>
        <v-flex xs6 md2 lg2 class="ma-2">
          <v-btn block class="rover-btn blue--text text--darken-4 rover" @click="chooseRover('curiosity')" id="curiosity">Curiosity</v-btn>
          </v-flex>
        <v-flex xs6 md2 lg2 class="ma-2">
          <v-btn block class="rover-btn blue--text text--darken-4 rover" @click="chooseRover('opportunity')" id="opportunity">Opportunity</v-btn>
        </v-flex>
        <v-flex xs6 md2 lg2 class="ma-2">
          <v-btn block class="rover-btn blue--text text--darken-4 rover" @click="chooseRover('spirit')" id="spirit">Spirit</v-btn>
        </v-flex>
      </v-layout>

      <!-- Choose camera -->
      <v-layout row wrap justify-center align-center>
        <v-flex xs12 md6 lg6 class="mt-5 mb-3 text-center">
          <h2>Choose camera</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center align-center>
        <v-flex xs3 md2 lg2 class="ma-2">
          <v-btn block @click="chooseCam('allCam')" id="allCam" class="blue--text text--darken-4 cam">All cameras</v-btn>
        </v-flex>
        <v-flex xs3 md2 lg2 class="ma-2">
          <v-btn block @click="chooseCam('fhaz')" id="fhaz" class="blue--text text--darken-4 cam">FHAZ</v-btn>
        </v-flex>
        <v-flex xs3 md2 lg2 class="ma-2">
          <v-btn block @click="chooseCam('rhaz')" id="rhaz" class="blue--text text--darken-4 cam">RHAZ</v-btn>
        </v-flex>
        <v-flex xs3 md2 lg2 class="ma-2">
          <v-btn block @click="chooseCam('mast')" id="mast" class="blue--text text--darken-4 cam">MAST</v-btn>
        </v-flex>
        <v-flex xs3 md2 lg2 class="ma-2">
          <v-btn block @click="chooseCam('chemcam')" id="chemcam" class="blue--text text--darken-4 cam">CHEMCAM</v-btn>
        </v-flex>
        <v-flex xs3 md2 lg2 class="ma-2">
          <v-btn block @click="chooseCam('mahli')" id="mahli" class="blue--text text--darken-4 cam">MAHLI</v-btn>
        </v-flex>
        <v-flex xs3 md2 lg2 class="ma-2">
          <v-btn block @click="chooseCam('mardi')" id="mardi" class="blue--text text--darken-4 cam">MARDI</v-btn>
        </v-flex>
        <v-flex xs3 md2 lg2 class="ma-2">
          <v-btn block @click="chooseCam('navcam')" id="navcam" class="blue--text text--darken-4 cam">NAVCAM</v-btn>
        </v-flex>
        <v-flex xs3 md2 lg2 class="ma-2">
          <v-btn block @click="chooseCam('pancam')" id="pancam" class="blue--text text--darken-4 cam">PANCAM</v-btn>
        </v-flex>
        <v-flex xs3 md2 lg2 class="ma-2">
          <v-btn block @click="chooseCam('minites')" id="minites" class="blue--text text--darken-4 cam">MINITES</v-btn>
        </v-flex>
      </v-layout>

      <!-- Choose date  -->
      <v-layout row wrap justify-center align-center>
        <v-flex xs12 md6 lg6 class="mt-5 mb-3 text-center">
          <h2>Choose Date</h2>
        </v-flex>
      </v-layout>
      <form @submit.prevent="fetchApi">
        <v-layout row wrap justify-center align-center>
          <v-flex xs3 md2 lg2 class="ma-2 text-center">
            <input id="date" type="date" v-model="dateIn" class="blue--text text--darken-4"/>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center align-center>
          <v-flex xs3 md2 lg2 class="ma-2">
            <v-btn block class="mx-2 blue--text text--darken-4" type="submit">Submit</v-btn>
          </v-flex>
          <v-flex xs3 md2 lg2 class="ma-2">
            <v-btn block depressed class="ma-2 blue--text text--darken-4" @click="clearAll()">Clear all filters</v-btn>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center align-center>
          <div class="caption">Note: Click submit button after changing any filters</div>
        </v-layout>
      </form>

      <!-- Display mission manifest data -->
      <v-layout row wrap justify-center align-center outlined>
        <v-flex xs6 md6 lg6 class="my-2 text-center">
          <h2>Rover status - <span class="text-decoration-underline">{{ status.toUpperCase() }}</span></h2>
        </v-flex>
        <v-flex xs6 md6 lg6 class="my-2 text-center">
          <h2>Total photos - <span class="text-decoration-underline">{{ totalPhotos }}</span></h2>
        </v-flex>
      </v-layout>
    </v-card>

    <ShowPhotos :info = "info"></ShowPhotos>
  </v-container>
</template>

<script>
  const axios = require("axios");
  import ShowPhotos from './ShowPhotos';

  export default {
    name: 'MarsRover',
    components: {
      ShowPhotos
    },

    data() {
      return {
        info: {},
        images: {},
        dateIn: '',
        rover: '',
        camName: '',
        status: '',
        totalPhotos: ''
      }
    },
    mounted() {
      // funtion to be executed when the app mounts, page load

      // set date to a random date
      this.date = this.randomDate(new Date(2008, 0, 1), new Date());
      this.dateIn = this.date;

      // set camera to "all"
      this.camName = "all"

      // set default rover - curiosity
      this.rover = "curiosity"

      // add selected states to respective buttons
      document.getElementById("curiosity").classList.add("selected")
      document.getElementById("allCam").classList.add("selected")

      // disable cameras not available for curiosity rover
      document.getElementById("mast").classList.remove("v-btn--disabled");
      document.getElementById("chemcam").classList.remove("v-btn--disabled");
      document.getElementById("mahli").classList.remove("v-btn--disabled");
      document.getElementById("mardi").classList.remove("v-btn--disabled");
      document.getElementById("pancam").classList.add("v-btn--disabled");
      document.getElementById("minites").classList.add("v-btn--disabled");
      
      // get mission manifest data for respective rover
      this.getManifest(this.rover)

      // manipulate url for specific date
      var url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${this.date}&api_key=ACLiv8vogNyP7Z7yxOo7IDSfGIyCLDBLgjDzaeTc`;
      
      // fetch API via axios
      axios
        .get(url)
        .then(response1 => {
          this.info = response1.data.photos
        })
        .catch(error => {
          console.log(error)
      });
    },
    methods: {
      getManifest(roverName) { 
        // function to get mission manifest data for respective rover

        var url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}?api_key=ACLiv8vogNyP7Z7yxOo7IDSfGIyCLDBLgjDzaeTc`;

        // fetch API via axios
        axios
          .get(url)
          .then(response => {
            this.status = response.data.photo_manifest.status
            this.totalPhotos = response.data.photo_manifest.total_photos
          })
          .catch(error => {
            console.log(error)
        });
      },
      randomDate(start, end) {
        // function to generate random date
        var out = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        let year = out.getFullYear();
        let month = (1 + out.getMonth()).toString().padStart(2, '0');
        let day = out.getDate().toString().padStart(2, '0');

        // return date in required format YYYY-MM-DD
        return year + '-' + month + '-' + day;
      },
      clearAll() {
        // function to clear all filters

        this.camName = 'all'
        this.dateIn = ''
        this.rover = ''

        // clears all selected rover button states
        let rovers = document.querySelectorAll('.rover')
        rovers.forEach(rover => {
          rover.classList.remove("selected")
        })

        // reset any selected buttons
        let cameras = document.querySelectorAll('.cam')
        cameras.forEach(camera => {
          camera.classList.remove("selected")
        })

        // select all cam option by default
        document.getElementById("allCam").classList.add("selected")
        
      },
      chooseRover(rover) {
        // function to choose rover
        this.rover = rover;
        this.camName = 'all'

        // reset and set rover button selected states
        let rovers = document.querySelectorAll('.rover')
        rovers.forEach(rover => {
          rover.classList.remove("selected")
        })
        document.getElementById(rover).classList.add("selected")

        // reset camera button select states and set to all
        // reset any selected buttons
        let cameras = document.querySelectorAll('.cam')
        cameras.forEach(camera => {
          camera.classList.remove("selected")
        })

        // select all cam option by default
        document.getElementById("allCam").classList.add("selected")

        // set camera buttons for curiosity
        if (rover == "curiosity") {
          document.getElementById("mast").classList.remove("v-btn--disabled");
          document.getElementById("chemcam").classList.remove("v-btn--disabled");
          document.getElementById("mahli").classList.remove("v-btn--disabled");
          document.getElementById("mardi").classList.remove("v-btn--disabled");
          document.getElementById("pancam").classList.add("v-btn--disabled");
          document.getElementById("minites").classList.add("v-btn--disabled");
        }

        // set camera buttons for opportunity and spirit
        else if (rover == "opportunity" || rover == "spirit") {
          document.getElementById("mast").classList.add("v-btn--disabled");
          document.getElementById("chemcam").classList.add("v-btn--disabled");
          document.getElementById("mahli").classList.add("v-btn--disabled");
          document.getElementById("mardi").classList.add("v-btn--disabled");
          document.getElementById("pancam").classList.remove("v-btn--disabled");
          document.getElementById("minites").classList.remove("v-btn--disabled");
        }
      },
      chooseCam(camera) {
        // function to choose camera

        this.camName = camera;

        // set button active state
        // reset any selected buttons
        let cameras = document.querySelectorAll('.cam')
        cameras.forEach(camera => {
          camera.classList.remove("selected")
        })

        // select camera button whichever is passed through the function
        document.getElementById(camera).classList.add("selected")
      },
      fetchApi() {
        // function to call NASA api and get the image source urls

        // set date
        if (this.dateIn == '') {
          // generate a random date
          this.date = this.randomDate(new Date(2008, 0, 1), new Date());
          this.dateIn = this.date;
        }
        else {
          // get date from form
          this.date = this.dateIn;
        }

        // set rover, if not selected
        if(this.rover == '') {
          this.rover = 'curiosity'
          document.getElementById("curiosity").classList.add("selected")
        }

        // manipulate url for specific rover, camera and date
        var url = ''

        if (this.camName == 'all') {
          url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${this.rover}/photos?earth_date=${this.date}&api_key=ACLiv8vogNyP7Z7yxOo7IDSfGIyCLDBLgjDzaeTc`;
        }
        else {
          url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${this.rover}/photos?earth_date=${this.date}&camera=${this.camName}&api_key=ACLiv8vogNyP7Z7yxOo7IDSfGIyCLDBLgjDzaeTc`;
        }
        
        // get manifest data
        this.getManifest(this.rover)

        // fetch API via axios
        axios
          .get(url)
          .then(response => {
            this.info = response.data.photos
          })
          .catch(error => {
            console.log(error)
          });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 0;
    float: left;
    display: block;
  }
  a {
    color: #42b983;
  }
  .selected {
    background-color: aliceblue;
    border: 2px solid black; 
  }
  #date {
    border: 2px black solid;
    padding: 5px 15px;
    border-radius: 5px;
  }
</style>
