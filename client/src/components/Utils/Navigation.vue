<template>
  <div class="bar">
    <img src="../../assets/images/icon-left-font.png" class="logo" />
    <div class="nav">
      <button @click="home()">
        <span>
          <font-awesome-icon icon="fa-solid fa-house" />
        </span>
        Home
      </button>
      <button @click="profil()">
        <span>
          <font-awesome-icon icon="fa-solid fa-user" />
        </span>
        Profil
      </button>
      <button>
        <font-awesome-icon icon="fa-solid fa-gear" />
      </button>

      <button @click="logOut()">
        <span>
          <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
        </span>
        deconnection
      </button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";
export default {
  name: "NavigationLinks",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const { userData } = authStore;

    const home = () => {
      router.push("/home");
    };

    const profil = () => {
      router.push({
        name: "ProfilView",
        params: { uuid: userData.user.uuid },
      });
    };

    const logOut = () => {
      authStore.logout();
      return router.push("/");
    };
    return {
      logOut,
      profil,
      home,
      router,
    };
  },
};
</script>

<style scoped>
div {
  text-align: center;
  display: flex;
}
.logo {
  width: 250px;
  height: 100px;
  object-fit: cover;
}

.bar {
  width: 100%;
  height: 100px;
  margin: auto 100px;
  display: flex;
  justify-content: space-between;
}

.nav {
  margin: auto 0;
  border: 1px solid transparent;
  background-color: white;
  border-radius: 15px;
  background-color: transparent;
  z-index: 2;
}

button {
  padding: 15px 15px;
  background-color: #f59794;
  color: white;
  border: none;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
}
span {
  width: 15px;
  margin: 0 15px 0 0;
}
</style>
