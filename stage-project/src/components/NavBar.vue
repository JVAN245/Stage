<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const isDark = ref(false)

function DarkModeOn() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

const props = defineProps<{
  links: Array<{ title: string; to: string }>
  darkMode: {
    light: { alt: string; src: string }
    dark: { alt: string; src: string }
  }
}>()
</script>

<template>
  <nav>
    <ul>
      <li v-for="link in props.links" :key="link.to">
        <RouterLink :to="link.to">{{ link.title }}</RouterLink>
      </li>

      <li>
        <button @click="DarkModeOn">
            <img
            v-if="isDark"
            :src="props.darkMode.light.src"
            :alt="props.darkMode.light.alt"
            width="20"
            >
            <img
            v-else
            :src="props.darkMode.dark.src"
            :alt="props.darkMode.dark.alt"
            width="20"
            >
        </button>
      </li>
    </ul>
  </nav>
  <RouterView />
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
  background-color: var(--color-background);
  color: var(--color-text);
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

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
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
