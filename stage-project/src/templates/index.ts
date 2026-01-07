import type { Component } from "vue";
import Hero from "./Hero.vue";
import TextBlock from "./TextBlock.vue";
import DefaultPage from "./DefaultPage.vue"; 
import Base from "./Base.vue"
import Cards from "./Cards.vue"

export const templates = {
  Base,
  Cards
} satisfies Record<string, Component>;

export type TemplateName = keyof typeof templates;