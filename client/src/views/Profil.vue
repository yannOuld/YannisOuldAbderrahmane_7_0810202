<template>
  <div>
    <div>
      <ProfilPage />
    </div>
  </div>
</template>

<script>
import ProfilPage from "../components/ProfilPage.vue";

export default {
  name: "ProfilView",
  components: {
    ProfilPage,
  },
};
</script>

<style scoped>
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
