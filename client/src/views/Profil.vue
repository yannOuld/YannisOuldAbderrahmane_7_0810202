<template>
  <div>
    <div class="navigation">
      <NavigationLinks />
    </div>
    <div class="infos">
      <ProfilPage />
    </div>
  </div>
</template>

<script>
import ProfilPage from "../components/Profil/ProfilPage.vue";
import NavigationLinks from "../components/Utils/Navigation.vue";

export default {
  name: "ProfilView",
  components: {
    ProfilPage,
    NavigationLinks,
  },
};
</script>

<style scoped>
.navigation {
  width: 100%;
  display: flex;
  justify-content: center;
}
.infos {
  margin: 60px auto 10px;
}
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
