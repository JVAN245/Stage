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

const Template = computed(() => {
  if (!pageData.value) return templates.DefaultPage;
  return templates[pageData.value.template] ?? templates.DefaultPage;
});

const body = computed(() => pageData.value?.body ?? []);
</script>

<template>
  <component :is="Template" v-if="pageData" v-bind="pageData">
    <component
      v-for="(block, i) in body"
      :key="i"
      :is="templates[block.component]"
      v-bind="block.props"
    />
  </component>
</template>