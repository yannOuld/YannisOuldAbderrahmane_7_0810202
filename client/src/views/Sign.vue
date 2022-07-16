<template>
  <div class="view">
    <NavigationLinks />
    <img
      class="logo"
      alt="Groupamania logo"
      src="../assets/images/icon-left-font-monochrome-black.png"
    />

    <div v-if="mode.state == 'login'">
      <LoggIn />
      <button @click="switchRegister()">
        Vous n'avez pas de compte ? <span>S'inscrire.</span>
      </button>
    </div>

    <div v-if="mode.state == 'register'">
      <SignIn />
      <button @click="switchLogin()">
        Déja inscrit ? <span> Se connecter.</span>
      </button>
    </div>
  </div>
</template>

<script>
import NavigationLinks from "../components/Navigation.vue";
import SignIn from "../components/SignIn.vue";
import LoggIn from "../components/LoggIn.vue";
import { reactive } from "vue";

export default {
  name: "SignView",
  components: {
    SignIn,
    LoggIn,
    NavigationLinks,
  },

  setup() {
    const mode = reactive({
      state: "login" || "register",
    });

    const switchLogin = () => {
      mode.state = "login";
    };

    const switchRegister = () => {
      mode.state = "register";
    };

    return {
      mode,
      switchLogin,
      switchRegister,
    };
  },
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
}
.logo {
  width: 300px;
  text-align: none;
  margin: 10px 40px;
}
button {
  border: none;
  background-color: transparent;
  font-size: 15px;
  margin: 10px 0;
  text-align: center;
  cursor: pointer;
}
span {
  color: blue;
  font-weight: 900;
}
</style>
