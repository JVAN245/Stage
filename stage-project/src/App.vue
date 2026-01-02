<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar
    :links="[
      { title: 'Home', to: '/' },
      { title: 'About', to: '/about' }
    ]"
  />
  <main>
    <RouterView />
  </main>
</template>


