<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Card, ListContent } from "../types/types";
const props = defineProps<{
	content: ListContent<Card>,
	edit: boolean
}>();
const emits = defineEmits<{ (event: "modified", template: string, content: ListContent<Card>): void }>();
const list = ref(structuredClone(props.content));
const getImageUrl = computed(() => {
  return (imagePath: string | undefined) => {
    if (!imagePath) return undefined;
    return new URL(imagePath, import.meta.url).href;
  };
});
watch(
    () => props.edit,
    () => {
      if (JSON.stringify(list.value.items) !== JSON.stringify(props.content.items))
        emits("modified", "cards", list.value);
    }
);
</script>

<template>
  <section class="mission-section">
    <ListBase
      :edit="edit"
      :items="content.items"
      :empty-item="{}"
    >
      <template #editor="{ index }">
        <input type="text" v-model="list.items[index].image" />
        <input type="text" v-model="list.items[index].title" />
        <input type="checkbox" v-model="list.items[index].isBlue" />
        <Editor v-model="list.items[index].content" />
      </template>
      <template #item="{ item }">
        <div class="card" :class="{ 'blue-card': item.isBlue }">
          <h2 v-if="item.title" class="card-title">{{ item.title }}</h2>
          <img
            v-if="item.image"
            :src="getImageUrl(item.image)"
            class="card-image"
            alt="Image illustration"
          />
          <div v-if="item.content" v-html="item.content" class="card-content"></div>
        </div>
      </template>
    </ListBase>
  </section>
</template>

<style scoped>
.mission-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

:deep(.list) {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  max-width: 1440px;
  width: 100%;
}

:deep(.list > div) {
  display: unset;
}

.card {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  height: 364px;
  background-color: var(--card-bg);
  border: 1px var(--card-bg) solid;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);
}

.card-image {
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  object-fit: cover;
  border-radius: 1rem;
}

.blue-card {
  background-color: var(--card-bg-alt);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
}

.card-title {
  font-family: "NeuePlak-Bold", sans-serif;
  margin-bottom: 0.5rem;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .card {
    height: 300px;
  }

  .mission-title {
    font-size: 2rem;
  }
}
</style>