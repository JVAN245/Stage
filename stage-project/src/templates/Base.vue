<script setup lang="ts">
import { watch } from 'vue';
const props = defineProps<{ content: string, edit: boolean }>();
const emit = defineEmits<{ (event: "modified", template: string, content: string): void }>()
let html = props.content;
watch(
    () => props.edit,
    () => {
		if (html != props.content)
			emit("modified", "Base", html)
	}
);
</script>

<template>
	<Editor v-if="edit" v-model="html" />
	<div v-else v-html="html"></div>
</template>

<style>
</style>