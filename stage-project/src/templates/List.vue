<script setup lang="ts">
import { ref } from 'vue';
import { vElementVisibility } from '@vueuse/components';
import type { Content, ListContent } from '../types/types';

const props = defineProps<{
  content: ListContent<Content>
}>();

const list = ref(structuredClone(props.content));
const isVisible = ref(new Array<boolean>(list.value.items.length).fill(false));
const current = ref(-1);

function onElementVisibility(state: boolean, element: number) {
  isVisible.value[element] = state;
  current.value = isVisible.value.indexOf(true);
}
</script>

<template>
  <ListBase :items="list.items">
    <template #item="{ item, index }">
      <div class="item-container" :class="item.class" v-element-visibility="(state: boolean) => onElementVisibility(state, index)">
        <div class="image-container">
          <img :src="item.image" />
        </div>
        <Teleport v-if="index === current" to="#main-logo">
          <img class="image-ext" :src="item.image" />
        </Teleport>
        <div class="item">
          <h2>{{ item.title }}</h2>
          <div v-html="item.description"></div>
        </div>
      </div>
    </template>
  </ListBase>
</template>

<style scoped>
.item-container {
	display: flex;
    flex-grow: 1;
    margin: 8px;
}

:deep(.item-line) {
	min-height: 344px;
}

:deep(.item-line):nth-child(even) > .item-container {
	flex-direction: row-reverse;
}
.image-container {
	display: flex;
	width: 344px;
	min-height: 344px;
	align-items: center;
}

img {
	max-width: 344px;
	max-height: 344px;
	height: auto;
}

.item {
	max-width: calc(80% - 344px);
	margin: auto;
	text-align: center;
}

.image-ext {
	display: none;
}

@media screen and (max-width: 720px) /*Phone media querie*/
{
	.image-container {
		display: none;
	}
	
	.image-ext {
		display: initial;
	}

	.item {
		max-width: 100%;
	}
}
</style>