<script setup lang="ts">
import { computed } from "vue";
import type { ImageSize } from "../../@types";

interface ImageProps {
  image: {
    url: string;
    caption: string;
    alternativeText: string;
    formats: {
      thumbnail: { url: string };
      small: { url: string };
      medium: { url: string };
      large: { url: string };
    };
  };
  imageSize?: ImageSize;
}

const props = defineProps<ImageProps>();

const imageUrl = computed(() => {
  const imageSize: ImageSize = (props.imageSize as ImageSize) || "original";
  console.log(props.image);
  if (imageSize === "original") {
    return props.image.url;
  }
  return props.image.formats[imageSize].url;
});
</script>

<template>
  <div class="image-wrapper">
    <img class="image" :src="imageUrl" :alt="props.image.alternativeText" />
    <span
      v-if="props.imageSize !== 'thumbnail' && props.imageSize !== 'small'"
      class="image-caption"
      >{{ props.image.caption }}</span
    >
  </div>
</template>

<style scoped>
.image-wrapper {
  display: flex;
  flex-direction: column;
}
.image {
  max-width: 100%;
}
.image-caption {
  padding: 1em;
  width: 100%;
  text-align: center;
  font-style: italic;
}
</style>
