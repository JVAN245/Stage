<script setup lang="ts">
import useDarkMode from '../composable/useDarkMode';
import Light from '../assets/sun-line.svg';
import Dark from '../assets/moon-line.svg';

const { isDark, setDarkMode } = useDarkMode();
</script>

<template>
    <button @click="setDarkMode">
        <div id="icon-container">
            <Light
                v-if="isDark"
                alt="Light mode"
            />
            <Dark
                v-else
                alt="Dark mode"
            />   
        </div>
    </button>
</template>

<style scoped>
button {
    width: 32px;
    height: 32px;
    margin: 0;
    padding: 4px 4px;
}
#icon-container {
    width: 22.5px;
    height: 22.5px;
}

#icon-container svg {
    width: 100%;
    height: 100%;
}
</style>