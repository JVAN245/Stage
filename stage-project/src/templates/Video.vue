<script setup lang="ts">
const props = defineProps<{ content: { url: string } }>();
</script>

<template>
  <div class="video-wrapper">
    <video controls :src="props.content.url"></video>
  </div>
</template>

<style scoped>
.video-wrapper video {
  width: 100%;
  max-width: 800px;
  border-radius: 0.5rem;
}
</style>
