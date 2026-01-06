<script setup lang="ts">
// Handle GitHub OAuth success
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const state = urlParams.get('state');
  const storedState = localStorage.getItem('state');

  if (state !== storedState) {
    alert('Invalid state');
    return;
  }

  if (code) {
    // Exchange code for token
    fetch('/api/github/oauth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('login', data.login);
      const origin = localStorage.getItem('origin') || '/';
      router.push(origin);
    })
    .catch(err => console.error(err));
  }
});
</script>

<template>
  <div>Loading...</div>
</template>