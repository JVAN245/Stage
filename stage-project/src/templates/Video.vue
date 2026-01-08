<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ 
  content: { 
    urls: string[];
  } 
}>();

const isYouTube = (url: string) => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

const getYoutubeEmbedUrl = (url: string) => {
  let videoId = '';
  
  if (url.includes('youtube.com/watch')) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    videoId = urlParams.get('v') || '';
  }
  else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  }
  else if (url.includes('youtube.com/embed/')) {
    videoId = url.split('embed/')[1].split('?')[0];
  }
  
  return `https://www.youtube.com/embed/${videoId}`;
};

const videos = computed(() => {
  return props.content.urls.map(url => ({
    url,
    isYouTube: isYouTube(url),
    embedUrl: isYouTube(url) ? getYoutubeEmbedUrl(url) : url
  }));
});
</script>

<template>
  <div class="videos-container">
    <div 
      v-for="(video, index) in videos" 
      :key="index" 
      class="video-wrapper"
    >
      <iframe
        v-if="video.isYouTube"
        :src="video.embedUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      
      <video
        v-else
        controls
        :src="video.url"
      ></video>
    </div>
  </div>
</template>

<style scoped>
.videos-container {
  display: grid;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.videos-container:has(.video-wrapper:nth-child(1):last-child) {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .videos-container:has(.video-wrapper:nth-child(2):last-child) {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 768px) {
  .videos-container:has(.video-wrapper:nth-child(3)) {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .videos-container:has(.video-wrapper:nth-child(3)) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.video-wrapper {
  position: relative;
  width: 100%;
}

.video-wrapper video,
.video-wrapper iframe {
  width: 100%;
  border-radius: 0.5rem;
}

.video-wrapper iframe {
  aspect-ratio: 16 / 9;
  height: auto;
}
</style>