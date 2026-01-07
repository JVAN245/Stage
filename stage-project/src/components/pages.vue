<script setup lang="ts">
import { useRoute } from "vue-router";
import routes from "../Pages/sitemap.json";
import { onMounted, ref } from "vue";
import * as templates from "../templates";
const { Base } = templates;

const { fullPath } = useRoute();
const splittedPath = fullPath.split("/");
splittedPath.shift();
const page = splittedPath.pop();
const root = splittedPath.pop() ?? "$r";
const route = routes.$r.find((r) => {
  if (r.children) {
    return r.children.find((c) => c.path === page);
  } else return r.path === page;
});

const subpageRoute = route?.children?.find((c) => c.path === page);

const title = subpageRoute?.title ?? route?.title ?? "404";

let template = ref("");
let content = ref("");

onMounted(async () => {
  const pageLoaded = await import(`../Pages/${root}/${page}.json`);
  template.value = pageLoaded.template;
  content.value = pageLoaded.content;
  console.log("Template:", template.value);
  console.log("Content:", content.value);
  console.log("Available templates:", Object.keys(templates));
});
</script>

<template>
  <div class="page" id="page">
    <div id="title">
      <h1>{{ title }}</h1>
    </div>
    <component v-if="template" :is="templates[template]" :content="content" />
    <Base v-else :content="content" />
  </div>
</template>

<style scoped>
@font-face {
  font-family: "NeuePlak-Light";
  src: url("/assets/fonts/NeuePlak-Light.otf") format("opentype");
  font-weight: normal;
  font-style: normal;
}

.page {
  font-family: "NeuePlak-Light";
  width: 100%;
  flex-grow: 1;
  font-weight: 600;
}

#title {
  padding: 2rem;
  position: relative;
  display: inline-block;
  font-size: 1.5rem;
}

#title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 4.5rem;
  width: 100%;
  height: 3px;
  background-color: #038cd9;
  box-shadow: 0 0 5px #038cd9, 0 0 10px #038cd9, 0 0 15px #038cd9,
    0 0 20px #038cd9;
}

:root.dark .page {
  background-color: #607182;
}

:root.dark #title {
  color: #fdfdfe;
}

@media (max-width: 768px) {
  #title {
    font-size: 1.3rem;
    text-align: left;
  }

  #title::after {
    bottom: 2.5rem;
    height: 2.5px;
  }

  .page {
    padding: 15px;
  }
}
</style>