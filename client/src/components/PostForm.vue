<template>
  <div>
    <form @submit="send()">
      <input type="text" name="title" id="title" />
      <input type="file" />
      <input type="text" name="content" id="content" />
      <button>Envoyer</button>
    </form>
  </div>
</template>
