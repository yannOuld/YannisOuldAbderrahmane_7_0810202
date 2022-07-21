<template lang="fr">
     
    <div  class="paper flex column" >
     <h1>{{user?.firstName}} {{user?.lastName}}</h1>
      <div >
      <img src="../../assets/images/icon.png" class="profil-pic" />
      </div>
      
      <div>
        <p>email: {{user?.email}}</p>
      </div>
      <div>
        <h2>description:</h2>
        <p class="description">{{user?.description}} </p>
      </div>
      
    </div>
    
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useUsersStore } from "../../stores/users";
import { useRouter } from "vue-router";

export default {
  name: "ProfilPage",
  setup() {
    const route = useRouter();
    const uuid = route.currentRoute._value.params.uuid;
    const usersStore = useUsersStore();
    const user = ref(null);

    onBeforeMount(async () => {
      await usersStore.fetchOneAuthor(uuid);
      user.value = usersStore.author;
    });
    return { route, user };
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}
.column {
  flex-direction: column;
}
.paper {
  background-color: antiquewhite;
  align-items: center;
  border-radius: 15px;
  font-size: 20px;
  width: 80vw;
  height: 80vh;
  position: relative;
  padding: auto;
  margin: auto;
}
.profil-pic {
  width: 250px;
  border-radius: 100%;
}
.patch {
  width: 100px;
  position: absolute;
  bottom: 30px;
  right: 30px;
  font-size: 20px;
  margin: 20px;
  color: aliceblue;
  background-color: #ff8300;
  cursor: pointer;
}
</style>
