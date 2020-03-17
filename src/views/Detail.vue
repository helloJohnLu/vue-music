<template>
  <div class="detail">
    <SubHeader :title="playlist.name"></SubHeader>
  </div>
</template>

<script>
  import SubHeader from "../components/SubHeader";
  import {getPlayList} from "../api/index";


  export default {
    name: "Detail",
    components: {
      SubHeader
    },
    data: function() {
      return {
        playlist: []
      }
    },
    created() {
      getPlayList({id: this.$route.params.id})
        .then(data => this.playlist = data.playlist)
        .catch(err => console.log(err));
    }
  }
</script>

<style scoped lang="scss">
  .detail {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: red;
  }
</style>