<template> 
    <div class="photos-grid">
        <!-- No photos condition -->
        <h2 v-if="info.length==0" class="text-center font-weight-light blue--text text--darken-4">No photos available for selected filters.</h2>
        
        <!-- if photos found -->
        <ul v-else-if="info.length!=0">
            <!-- loop through the array of data -->
            <li v-for="item in info" :key="item.id">
                <img :src = "item.img_src" width=200px height="auto" loading="lazy/>
            </li>
        </ul>
        
        
        <!-- Fetching photos condition -->
        <h2 v-else class="text-center font-weight-light blue--text text--darken-4">Loading...</h2>
    </div>
</template>

<script>
export default {
    props: ['info'],
}
</script>

<style scoped>
    ul {
        list-style-type: none;
        padding: 0;
     }
    li {
        display: inline-block;
        margin: 0 10px;
    }
</style>
