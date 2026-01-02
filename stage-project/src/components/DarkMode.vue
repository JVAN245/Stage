<script setup lang="ts">
import useDarkMode from '../composable/useDarkMode';
import Light from '../assets/light-mode.svg';
import Dark from '../assets/light-mode.svg';

const { isDark, setDarkMode } = useDarkMode();
</script>

<template>
    <button @click="setDarkMode">
        <Light
            v-if="isDark"
            alt="Light mode"
            width="20"
            height="20"
        />
        <Dark
            v-else
            alt="Dark mode"
            width="20"
            height="20"
        />
    </button>
</template>

<style scoped>
button {
    height: 32px;
}
svg {
    max-width: 24px;
    height: auto;
}
</style>