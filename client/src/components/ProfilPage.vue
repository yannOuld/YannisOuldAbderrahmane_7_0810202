<template lang="fr">
     
    <div class="paper flex column" >
     <h1></h1>
      <div >
      <img src="../assets/images/icon.png" class="profil-pic" />
      </div>
      
      
      <div>
      </div>
      <div>
        <p class="description">description: </p>
      </div>
      <button class="patch"> modifier</button>
    </div>
    
</template>

<script>
import { onMounted } from "vue";
import { useUserStore } from "../stores/user";
import myfetch from "../utils/fetch.js";
export default {
  name: "ProfilPage",
  setup() {
    onMounted(() => {});
    return {};
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
  padding: 40px;
  margin: 40px;
  border-radius: 15px;
  font-size: 20px;
  height: 80vh;
  position: relative;
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
}
</style>
