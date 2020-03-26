<template>
  <div class="singer">
    歌手
  </div>
</template>

<script>
  import {getHotArtists} from "../api/index";

  export default {
    name: "Singer",
    created() {
      getHotArtists()
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
  }
</script>

<style scoped>

</style>