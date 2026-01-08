<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { Content } from '../types/types';

const props = defineProps<{
  content: {
    items: Content[]
  }
}>();

const current = ref(0);
const total = props.content.items.length;

function next() {
  current.value = (current.value + 1) % total;
}

function prev() {
  current.value = (current.value - 1 + total) % total;
}

let interval: number | undefined;

onMounted(() => {
  interval = window.setInterval(next, 5000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <div class="carousel">
    <button class="prev" @click="prev">&#10094;</button>

    <div class="carousel-track">
      <div
        v-for="(item, index) in content.items"
        :key="index"
        class="carousel-item"
        :class="{ active: index === current }"
      >
        <img v-if="item.image" :src="item.image" :alt="item.title || ''" />
        <h3 v-if="item.title">{{ item.title }}</h3>
        <div v-html="item.description"></div>
      </div>
    </div>

    <button class="next" @click="next">&#10095;</button>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  min-width: 100%;
  flex-shrink: 0;
  display: none;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
}

.carousel-item.active {
  display: flex;
}

.carousel-item img {
  max-width: 100%;
  border-radius: 1rem;
  margin-bottom: 1rem;
}

.carousel-item h3 {
  margin: 0.5rem 0;
  font-size: 1.5rem;
}

.carousel-item div {
  font-size: 1rem;
  line-height: 1.4;
}

button.prev,
button.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(50, 50, 50, 0.5);
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 50%;
  font-size: 2rem;
  z-index: 2;
}

button.prev { left: 1rem; }
button.next { right: 1rem; }

button.prev:hover,
button.next:hover {
  background-color: rgba(50, 50, 50, 0.8);
}

@media (max-width: 768px) {
  .carousel-item h3 { font-size: 1.2rem; }
  .carousel-item div { font-size: 0.9rem; }
}
</style>