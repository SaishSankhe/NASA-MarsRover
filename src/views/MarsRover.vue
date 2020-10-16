<template>
  <div class="nasa">
    <form @submit.prevent="fetchCur">
      <input id="date" type="date" v-model="dateIn"/>
      <v-btn dark type="submit">Submit (default-Curiosity)</v-btn>
    </form>
    <h3>Rovers</h3>
    <v-btn dark @click="fetchCur">Curiosity</v-btn>
    <v-btn dark @click="fetchOpp">Opportunity</v-btn>
    <v-btn dark @click="fetchSpi">Spirit</v-btn>
    <br>
    <h3>Cameras</h3>
    <v-btn dark @click="fetchCam('all')" id="allCam">All cameras</v-btn>
    <v-btn dark @click="fetchCam('fhaz')" id="fhaz">FHAZ</v-btn>
    <v-btn dark @click="fetchCam('rhaz')" id="rhaz">RHAZ</v-btn>
    <v-btn dark @click="fetchCam('mast')" id="mast">MAST</v-btn>
    <v-btn dark @click="fetchCam('chemcam')" id="chemcam">CHEMCAM</v-btn>
    <v-btn dark @click="fetchCam('mahli')" id="mahli">MAHLI</v-btn>
    <v-btn dark @click="fetchCam('mardi')" id="mardi">MARDI</v-btn>
    <v-btn dark @click="fetchCam('navcam')" id="navcam">NAVCAM</v-btn>
    <v-btn dark @click="fetchCam('pancam')" id="pancam">PANCAM</v-btn>
    <v-btn dark @click="fetchCam('minites')" id="minites">MINITES</v-btn>
    
    <h2>Rover - {{ rover }}, Camera - {{ camName }}, Date - {{ dateIn }}</h2>
    <h2>Rover Status - {{ status }}, Total photos - {{ totalPhotos }}</h2>

    <p v-if="info.length==0">No photos</p>
    <ul v-else>
      <!-- loop through the array of data -->
      <li v-for="item in info" :key="item.id">
        <img :src = "item.img_src" width=200px height="auto"/>
      </li>
    </ul>
    
  </div>
</template>

<script>
  const axios = require("axios");
  export default {
    name: 'MarsRover',
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
      
      function randomDate(start, end) {
        var out = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        let year = out.getFullYear();
        let month = (1 + out.getMonth()).toString().padStart(2, '0');
        let day = out.getDate().toString().padStart(2, '0');
      
        return year + '-' + month + '-' + day;
      }

      this.date = randomDate(new Date(2008, 0, 1), new Date());
      this.dateIn = this.date;
      this.camName = "all"
      document.getElementById("fhaz").disabled = false;
      document.getElementById("rhaz").disabled = false;
      document.getElementById("mast").disabled = false;
      document.getElementById("chemcam").disabled = false;
      document.getElementById("mahli").disabled = false;
      document.getElementById("mardi").disabled = false;
      document.getElementById("navcam").disabled = false;
      document.getElementById("pancam").disabled = true;
      document.getElementById("minites").disabled = true;
      
      this.rover = "curiosity"
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
      fetchAPI() {
        // static data for now
        this.date = this.dateIn;
        // manipulate url for specific date
        var url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${this.date}&api_key=ACLiv8vogNyP7Z7yxOo7IDSfGIyCLDBLgjDzaeTc`;
        // fetch API via axios
        axios
          .get(url)
          .then(response => {
            this.info = response.data.photos
            console.log(this.info)
          })
          .catch(error => {
            console.log(error)
        });
      },
      getManifest(roverName) { 
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
      fetchOpp() {
        this.date = this.dateIn;
        this.camName = "all"
        document.getElementById("fhaz").disabled = false;
        document.getElementById("rhaz").disabled = false;
        document.getElementById("mast").disabled = true;
        document.getElementById("chemcam").disabled = true;
        document.getElementById("mahli").disabled = true;
        document.getElementById("mardi").disabled = true;
        document.getElementById("navcam").disabled = false;
        document.getElementById("pancam").disabled = false;
        document.getElementById("minites").disabled = false;
        
        this.rover = "opportunity"
        this.getManifest(this.rover)

        // manipulate url for specific date
        var url = `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?earth_date=${this.date}&api_key=ACLiv8vogNyP7Z7yxOo7IDSfGIyCLDBLgjDzaeTc`;
        
        // fetch API via axios
        axios
          .get(url)
          .then(response => {
            this.info = response.data.photos
            console.log(this.info)
          })
          .catch(error => {
            console.log(error)
        });
      },
      fetchCur() {
        this.date = this.dateIn;
        this.camName = "all"
        document.getElementById("fhaz").disabled = false;
        document.getElementById("rhaz").disabled = false;
        document.getElementById("mast").disabled = false;
        document.getElementById("chemcam").disabled = false;
        document.getElementById("mahli").disabled = false;
        document.getElementById("mardi").disabled = false;
        document.getElementById("navcam").disabled = false;
        document.getElementById("pancam").disabled = true;
        document.getElementById("minites").disabled = true;
        
        this.rover = "curiosity"
        this.getManifest(this.rover)

        // manipulate url for specific date
        var url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${this.date}&api_key=ACLiv8vogNyP7Z7yxOo7IDSfGIyCLDBLgjDzaeTc`;
        
        // fetch API via axios
        axios
          .get(url)
          .then(response1 => {
            this.info = response1.data.photos
            console.log(this.info)
          })
          .catch(error => {
            console.log(error)
        });
      },
      fetchSpi() {
        this.date = this.dateIn;
        this.camName = "all"

        document.getElementById("fhaz").disabled = false;
        document.getElementById("rhaz").disabled = false;
        document.getElementById("mast").disabled = true;
        document.getElementById("chemcam").disabled = true;
        document.getElementById("mahli").disabled = true;
        document.getElementById("mardi").disabled = true;
        document.getElementById("navcam").disabled = false;
        document.getElementById("pancam").disabled = false;
        document.getElementById("minites").disabled = false;

        this.rover = "spirit"
        this.getManifest(this.rover)

        // manipulate url for specific date
        var url = `https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?earth_date=${this.date}&api_key=ACLiv8vogNyP7Z7yxOo7IDSfGIyCLDBLgjDzaeTc`;
        
        // fetch API via axios
        axios
          .get(url)
          .then(response => {
            this.info = response.data.photos
            console.log(this.info)
          })
          .catch(error => {
            console.log(error)
        });
      },
      fetchCam(camName) {
        this.camName = camName
        this.date = this.dateIn;
        var url=""
        // manipulate url for specific date, camera and rover name
        if(camName != "all") {
          url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${this.rover}/photos?earth_date=${this.date}&camera=${camName}&api_key=ACLiv8vogNyP7Z7yxOo7IDSfGIyCLDBLgjDzaeTc`;
        }
        else {
          url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${this.rover}/photos?earth_date=${this.date}&api_key=ACLiv8vogNyP7Z7yxOo7IDSfGIyCLDBLgjDzaeTc`;
        }
        
        // fetch API via axios
        axios
          .get(url)
          .then(response => {
            this.info = response.data.photos
            console.log(this.info)
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
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
