<script setup lang="ts">
defineProps<{ items?: { title?: string; subtitle?: string }[] }>()
</script>

<template>
  <section class="hero-template">
    <header v-if="items?.length">
      <h1>{{ items[0].title }}</h1>
      <p>{{ items[0].subtitle }}</p>
    </header>
    <slot />
  </section>
</template>
