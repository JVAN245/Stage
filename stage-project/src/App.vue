<script setup lang="ts">
import NavBar from './components/NavBar.vue'

</script>

<template>
  <NavBar
  :links="[
    { title: 'Home', to: '/' },
    { title: 'About', to: '/about' }
  ]"
  :darkMode="{
    light: { alt: 'Light mode', src: '../src/assets/light-mode.svg' },
    dark: { alt: 'Dark mode', src: '../src/assets/dark-mode.svg' }
  }"
/>
</template>


