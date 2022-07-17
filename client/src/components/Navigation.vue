<template>
  <div>
    <nav>
      <button>
        <span>
          <font-awesome-icon icon="fa-solid fa-house" />
        </span>
        Home
      </button>
      <button>
        <span>
          <font-awesome-icon icon="fa-solid fa-user" />
        </span>
        Profil
      </button>

      <button>
        <span>
          <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
        </span>
        deconnection
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavigationLinks",
  setup() {},
};
</script>

<style scoped>
div {
  text-align: center;
  display: flex;
  margin: auto;
}

nav {
  position: fixed;
  width: 400px;
  border: 1px solid transparent;
  background-color: white;
  border-radius: 15px;
  z-index: 2;
}

button {
  padding: 15px 15px;
  background-color: #0787f7;
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
