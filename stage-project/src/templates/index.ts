import type { Component } from "vue";

import Base from "./Base.vue";
import Cards from "./Cards.vue";
import List from "./List.vue";
import Video from "./Video.vue";
import Quote from "./Quote.vue";
import Gallery from "./Gallery.vue";
import Carrousel from "./Carrousel.vue";

const templates: Record<string, Component> = {
  Base,
  Cards,
  List,
  Video,
  Quote,
  Gallery,
  Carrousel
};

export { Base };
export default templates;
