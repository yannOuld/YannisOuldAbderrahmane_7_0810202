<template>
  <div>
    <NavigationLinks />

    <ProfilPage />
  </div>
</template>

<script>
import ProfilPage from "../components/ProfilPage.vue";
import NavigationLinks from "../components/Navigation.vue";

export default {
  name: "ProfilView",
  components: {
    ProfilPage,
    NavigationLinks,
  },
};
</script>

<style scoped>
.div {
  position: relative;
}
.flex {
  display: flex;
}
.row {
  flex-direction: row;
}
.post-img {
  width: 200px;
}
.post {
  flex: 1;
}
.user-infos {
  flex: 2;
  display: flex;
}
</style>
