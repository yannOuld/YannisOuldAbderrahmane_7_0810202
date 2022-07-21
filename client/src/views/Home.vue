<template>
  <div>
    <div class="navigation">
      <NavigationLinks />
    </div>
    <img src="../assets/images/icon.png" class="img" alt="" />
    <div>
      <PostForm />
    </div>
  </div>
</template>

<script>
import NavigationLinks from "../components/Utils/Navigation.vue";
import PostForm from "../components/Post/PostForm.vue";
export default {
  name: "HomeView",
  components: {
    NavigationLinks,
    PostForm,
  },
};
</script>

<style scoped>
.navigation {
  width: 100%;
  display: flex;
  justify-content: center;
}
.img {
  width: 300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
}
</style>
