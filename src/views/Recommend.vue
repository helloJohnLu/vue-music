<template>
  <div class="recommend">
    <Banner :banners="banners"></Banner>
    <Personalized></Personalized>
  </div>
</template>

<script>
  import {getBanner, getPersonalized} from "../api/index";
  import Banner from "../components/Banner";
  import Personalized from "../components/Personalized";

  export default {
    name: "Recommend",
    components: {
      Banner,
      Personalized
    },
    data() {
      return {
        banners: [],
        personalized: []
      }
    },
    created() {
      getBanner()
        .then(data => this.banners = data.banners)
        .catch(err => console.log(err));
      getPersonalized()
        .then(data => this.personalized = data.result)
        .catch(err => console.log(err))
    }
  }
</script>

<style scoped>

</style>