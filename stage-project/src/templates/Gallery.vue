<script setup lang="ts">
const props = defineProps<{ content: { images: string[] } }>();
</script>

<template>
  <div class="gallery">
    <img v-for="(img, i) in props.content.images" :key="i" :src="img" />
  </div>
</template>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
.gallery img {
  width: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
}
</style>
