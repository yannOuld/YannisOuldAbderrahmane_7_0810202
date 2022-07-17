<template>
  <div class="bloc">
    <h1>Connexion</h1>
    <form @submit.prevent="submit">
      <div class="form-row">
        <!-- Email -->
        <div class="form-group">
          <input
            v-model="formData.email"
            type="email"
            class="form-control"
            id="inputEmail"
            placeholder="email"
          />
          <p v-if="v$.email.$error">une adresse email valide est requise</p>
        </div>
        <!-- Password -->
        <div class="form-group">
          <input
            v-model="formData.password"
            type="password"
            class="form-control"
            id="inputPassword"
            placeholder="Mot de passe"
          />
          <p v-if="v$.password.$error">le mot de passe est requis</p>
        </div>

        <!-- Form Submit Button -->
        <div class="text-center">
          <button class="btn">Se connecter</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useAuthStore } from "../stores/auth";

export default {
  name: "LoggIn",
  setup() {
    // store pinia d'authentification
    const authStore = useAuthStore();

    // données reactives du formulaire
    const formData = reactive({
      email: "",
      password: "",
    });

    //regles de validation de vuelidate
    const rules = computed(() => {
      return {
        email: { required, email },
        password: { required },
      };
    });

    //constante d'appelle du router
    const router = useRouter();

    // constante vuelidate d'appel de la fonction de validation des inputs
    const v$ = useVuelidate(rules, formData);

    //fonction d'envoie du formulaire
    const submit = async () => {
      //validation des inputs
      const result = await v$._value.$validate();
      if (result) {
        // fetch login du store
        await authStore.login(formData);
        //création d'une page profil avec uuid en params
        await router.push({
          name: "ProfilView",
          params: { uuid: authStore.user.user.uuid },
        });
      } else {
        // message d'erreur
        alert("Les identifiants ne correspondent à aucun utilisateur.");
      }
    };

    return {
      v$,
      formData,
      submit,
      router,
    };
  },
};
</script>

<style scoped>
h1 {
  font-weight: 700;
}
p {
  color: red;
  padding: 0;
  margin: 0;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.bloc {
  text-align: center;
  margin: auto;
  border: solid 2px;
  border-radius: 15px;
  padding: 10px;
  width: 500px;
  font-size: 16px;
  background-color: white;
}
.form-group {
  flex-direction: row;
}
.form-control {
  width: 200px;
}
input {
  margin: 10px;
}
.link {
  color: cornflowerblue;
  cursor: pointer;
  font-weight: 700;
}
.logo {
  width: 300px;
  background-color: transparent;
  color: brown;
  margin: 0 20px;
}
.btn {
  background-color: #0787f7;
  color: aliceblue;
  font-weight: 700;
  padding: 10px;
  font-size: 14px;
  border-style: hidden;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
}
.disabled {
  background-color: grey;
  cursor: not-allowed;
}
.alert {
  color: red;
  font-weight: 900;
}
</style>
