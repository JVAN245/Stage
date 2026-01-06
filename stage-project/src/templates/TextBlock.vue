<script setup lang="ts">
defineProps<{ content?: string }>();
</script>

<template>
  <section class="TextBlock-template">
      <p>{{ content }}</p>

    <slot /> 
  </section>
</template>