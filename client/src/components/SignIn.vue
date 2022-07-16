<template>
  <div class="bloc">
    <h1>Inscription</h1>
    <form @submit.prevent="submit()">
      <div>
        <!-- Prénom -->
        <div class="form-group">
          <input
            v-model="formData.firstName"
            class="form-control"
            id="inputfirstName"
            placeholder="Prénom"
          />
        </div>
        <!-- message d'erreur -->
        <p v-if="v$.firstName.$error">le prénom est requis</p>

        <!--nom -->
        <div class="form-group">
          <input
            v-model="formData.lastName"
            class="form-control"
            id="inputName"
            placeholder="Nom"
          />
          <!-- message d'erreur -->
          <p v-if="v$.lastName.$error">le nom est requis</p>
        </div>

        <!-- Email -->
        <div class="form-group">
          <input
            v-model="formData.email"
            type="email"
            class="form-control"
            id="inputEmail"
            placeholder="email"
          />
          <!-- message d'erreur -->
          <p v-if="v$.email.$error">votre adresse email est invalide</p>
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
          <!-- message d'erreur -->
          <p v-if="v$.password.$error">
            le mot de passe doit contenir au moins 8 caractères dont une
            majuscule, un chiffre et un symbole.
          </p>
        </div>

        <!-- Confirm Password -->
        <div class="form-group">
          <input
            v-model="formData.confirmPassword"
            type="password"
            class="form-control"
            id="inputConfirm"
            placeholder="Confirmez mot de passe"
          />
          <!-- message d'erreur -->
          <p v-if="v$.confirmPassword.$error">
            Les mots de passes doivent correspondre
          </p>
        </div>

        <!-- Form Submit Button -->
        <div class="text-center">
          <button class="btn">s'inscrire</button>
        </div>
      </div>
    </form>
    <!-- Pop up-->
    <div class="modal" v-if="isOpen">
      <p class="succes">votre compte à été créée avec succès.</p>
    </div>
  </div>
</template>

<script>
import myfetch from "@/utils/fetch";
import { reactive } from "vue";
import { ref, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";

export default {
  name: "SignIn",
  setup() {
    const regex = helpers.regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    );
    let isOpen = ref(false);
    let closePopup;

    const formData = reactive({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const rules = computed(() => {
      return {
        firstName: { required, minLength: minLength(2) },
        lastName: { required, minLength: minLength(2) },
        email: { required, email },
        password: { required, helpers: regex },
        confirmPassword: { required, sameAs: sameAs(formData.password) },
      };
    });

    const v$ = useVuelidate(rules, formData);

    const showPopup = () => {
      {
        isOpen.value = true;
        clearTimeout(closePopup);

        closePopup = setTimeout(() => {
          isOpen.value = false;
        }, 2000);
      }
    };

    const submit = async () => {
      const validation = await v$._value.$validate();

      if (!validation) {
        alert("Veuillez vérifier les informations.");
      } else {
        const response = await myfetch("POST", "/user/signup", formData);
        if (response.uuid) {
          return showPopup();
        } else {
          alert("email déja utilisée");
        }
      }
    };

    return {
      v$,
      isOpen,
      formData,
      submit,
    };
  },
};
</script>

<style scoped>
.bloc {
  position: relative;
  margin: auto;
  border: solid 2px;
  border-radius: 15px;
  padding: 10px;
  width: 500px;
  font-size: 16px;
  background-color: white;
  text-align: center;
}
h1 {
  font-weight: 700;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
p {
  margin: 0;
  padding: 0;
  color: red;
}
.succes {
  color: black;
}
.modal {
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
  font-weight: 700;
  width: 100%;
  background-color: white;
}
.form-group {
  flex-direction: column;
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
