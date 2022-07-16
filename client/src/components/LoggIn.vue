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
import myfetch from "@/utils/fetch";
import { useRouter } from "vue-router";
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  name: "LoggIn",
  setup() {
    const formData = reactive({
      email: "",
      password: "",
    });

    const rules = computed(() => {
      return {
        email: { required, email },
        password: { required },
      };
    });

    const v$ = useVuelidate(rules, formData);

    const router = useRouter();

    const submit = async () => {
      const result = await v$._value.$validate();
      if (result) {
        const response = await myfetch("POST", "/user/login", formData);
        if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user));
          localStorage.setItem("token", JSON.stringify(response.token));
          await router.push(`/profil?=${response.user.uuid}`);
        } else {
          alert("Les identifiants ne correspondent à aucun utilisateur.");
        }
      }
    };

    return {
      v$,
      formData,
      router,
      submit,
    };
  },
  props: {},
  components: {},
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
