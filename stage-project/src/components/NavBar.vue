<script setup lang="ts">
import { RouterLink } from 'vue-router'
import DarkMode from './DarkMode.vue';

const props = defineProps<{
  links: Array<{ title: string; to: string }>
}>()
</script>

<template>
  <nav>
    <ul>
      <li v-for="link in props.links" :key="link.to">
        <RouterLink :to="link.to">{{ link.title }}</RouterLink>
      </li>
      <li>
          <DarkMode></DarkMode>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
