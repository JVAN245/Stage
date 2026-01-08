<script setup lang="ts">
import { useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';

const route = useRoute();
</script>

<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    
    <main>
      <router-view :key="route.fullPath" />
    </main>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>


