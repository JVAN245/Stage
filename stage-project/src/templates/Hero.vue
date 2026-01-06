<script setup lang="ts">
defineProps<{ title?: string; subtitle?: string }>();
</script>

<template>
  <section class="hero-template">
    <header v-if="title">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
    </header>
    
    <slot /> 
  </section>
</template>