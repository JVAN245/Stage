<script setup lang="ts">
const props = defineProps<{ content: { items: any[] } }>();
</script>

<template>
  <div class="cards-grid">
    <div
      v-for="(item, index) in props.content.items"
      :key="index"
      class="card"
      :class="{ 'blue-card': item.isBlue }"
    >
      <h2 v-if="item.title">{{ item.title }}</h2>
      <img v-if="item.image" :src="item.image" />
      <div v-if="item.content" v-html="item.content"></div>
    </div>
  </div>
</template>
<style scoped>
.mission-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem 1rem;
}

:deep(.list) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1440px;
  width: 100%;
  padding: 1rem;
}

:deep(.list > div) {
  display: unset;
}

.card {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  background-color: var(--card-bg);
  border: 1px solid var(--card-bg-alt);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
              0 1px 3px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15),
              0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.blue-card {
  background-color: var(--card-bg-alt);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blue-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.12),
              0 3px 6px rgba(0, 0, 0, 0.08);
}

.card-title {
  font-family: "NeuePlak-Bold", sans-serif;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  text-decoration: underline;
  color: var(--text-color);
}

.card-content {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-color-secondary);
}

@media (max-width: 1024px) {
  :deep(.list) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
  .card-image {
    height: 180px;
  }
}

@media (max-width: 768px) {
  :deep(.list) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .card {
    height: auto;
  }
  .blue-card {
    padding: 1.5rem;
    align-items: center;
    text-align: center;
  }
  .card-title {
    font-size: 1.5rem;
  }
}
</style>
