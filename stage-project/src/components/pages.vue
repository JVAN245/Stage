<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, ref, watchEffect } from "vue";
import { templates } from "../templates"; 

const route = useRoute();
const pageData = ref<any>(null);

watchEffect(async () => {
  const { root, page } = route.meta as any;
  try {
    const data = await import(`../pages/${root}/${page}.json`);
    pageData.value = data.default;
  } catch (e) {
    console.error("Fichier JSON introuvable", e);
  }
});

const Wrapper = computed(() => templates.DefaultPage);

const blocks = computed(() => pageData.value?.templates ?? [])
</script>

<template>
  <component :is="Wrapper" v-if="blocks.length">
    <component
      v-for="(block, i) in blocks"
      :key="i"
      :is="templates[block.template]"
      v-bind="block.content"
    />
  </component>
</template>
