<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import templates, { Base } from "../templates";
import type { PageData, TemplateItem } from "../types/types";

const route = useRoute();
const { root, page, title } = route.meta as { root: string; page: string; title: string };

const pageData = ref<PageData | null>(null);

onMounted(async () => {
  try {
    const mod = await import(`../pages/${root}/${page}.json`);
    pageData.value = mod.default;
  } catch (err) {
    console.error("Erreur lors du chargement de la page :", err);
  }
});

const templateItems = computed<TemplateItem[]>(() => {
  if (!pageData.value) return [];

  if (Array.isArray(pageData.value.templates)) return pageData.value.templates;

  if (pageData.value.content !== undefined) {
    return [
      {
        id: "single",
        template: pageData.value.template ?? "Base",
        content: pageData.value.content,
      },
    ];
  }

  return [];
});

const validItems = computed(() =>
  templateItems.value.filter(
    (t) =>
      t.content !== undefined &&
      (typeof t.content === "string" || typeof t.content === "object")
  )
);
</script>

<template>
  <div class="page">
    <div id="title">
      <h1>{{ title }}</h1>
    </div>

    <div v-for="item in validItems" :key="item.id || item.template">
      <component
        v-if="item.template && templates[item.template]"
        :is="templates[item.template]"
        :content="item.content"
      />
      <Base v-else-if="typeof item.content === 'string'" :content="item.content" />
    </div>
  </div>
</template>

<style scoped>
.page {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

#title {
  font-size: 1.6rem;
  margin-bottom: 1rem;
}
</style>
