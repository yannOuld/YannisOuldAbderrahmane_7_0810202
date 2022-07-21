<template>
  <div class="paper">
    <form @submit="submit()">
      <h1>Envoyer un Post.</h1>
      <div>
        <label>Titre: </label>
        <input type="text" name="title" id="title" v-model="title" />
      </div>

      <div>
        <label>Fichier à envoyer </label>
        <input type="file" />
      </div>

      <div>
        <label>Message </label>
        <input type="text" name="content" id="content" v-model="content" />
      </div>

      <button class="btn">Envoyer</button>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "PostForm",
  setup() {
    const formData = reactive({
      title: "",
      password: "",
      content: "",
    });
    return {
      formData,
    };
  },
};
</script>

<style scoped>
form {
  color: white;
  border: 1px solid transparent;
  background-color: #fc4640;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
input {
  margin: 10px auto;
}
.btn {
  margin: 20px auto;
}
</style>
