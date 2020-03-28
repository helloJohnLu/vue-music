<template>
  <div class="rand">
    排行
  </div>
</template>

<script>
  import {getTopListDetail} from "../api/index";


  export default {
    name: "Rank",
    created() {
      getTopListDetail()
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }
  }
</script>

<style scoped>

</style>