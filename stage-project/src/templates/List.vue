<script setup lang="ts">
import { ref } from 'vue';
import type { Content, ListContent } from '../types/types';

const props = defineProps<{
  content: ListContent<Content>
}>();

const list = ref(props.content.items);
</script>

<template>
  <div class="list-container">
    <div v-for="(item, index) in list" :key="index" class="item-container">
      <div v-if="item.image" class="image-container">
        <img :src="item.image" />
      </div>
      <div class="item">
        <h2 v-if="item.title">{{ item.title }}</h2>
        <div v-html="item.description"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.item-container {
  border-radius: 1rem;
  overflow: hidden;
  background-color: var(--color-background);
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.image-container img {
  width: 100%;
  height: auto;
  border-radius: 1rem;
  object-fit: cover;
}

.item h2 {
  margin: 1rem 0 0.5rem;
  font-size: 1.2rem;
}

.item div {
  font-size: 1rem;
  line-height: 1.4;
}
</style>
