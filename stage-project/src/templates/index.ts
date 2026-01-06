import type { Component } from "vue";
import Hero from "./Hero.vue";
import TextBlock from "./TextBlock.vue";
import DefaultPage from "./DefaultPage.vue"; 

export const templates = {
  Hero,
  TextBlock,
  DefaultPage
} satisfies Record<string, Component>;

export type TemplateName = keyof typeof templates;