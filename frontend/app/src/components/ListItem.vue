<script setup lang="ts">
defineProps({
  title: String,
  slug: String,
  summary: String,
  image: Array,
});
</script>

<template>
  <article>
    <h3>{{ title }}</h3>
    <div v-if="image && image.length">
      <img class="article-image" :src="image[0].url" :alt="image[0].alt" />
      <i>{{ image[0].caption }}</i>
    </div>
    <p>{{ summary }}</p>
    <router-link :to="`/article/${slug}`">Läs mer...</router-link>
  </article>
</template>

<style scoped>
.article-image {
  max-width: 100%;
}
</style>
