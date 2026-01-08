<script setup lang="ts">
const props = defineProps<{ content: { text: string; author?: string } }>();
</script>

<template>
  <blockquote>
    <p>{{ props.content.text }}</p>
    <footer v-if="props.content.author">— {{ props.content.author }}</footer>
  </blockquote>
</template>

<style scoped>
blockquote {
  font-style: italic;
  padding: 1rem;
  border-left: 4px solid var(--primary-color);
  margin: 1rem 0;
}
</style>
