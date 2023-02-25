<script setup lang="ts">
import {getItemFactory} from '@/api';
import {useQuery} from '@tanstack/vue-query';

const {slug} = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

const {isLoading, isError, data: article, error} = useQuery(getItemFactory(slug, 'articles', ['image'], 'large'));
console.log(article);
</script>

<template>
  <span v-if="isLoading">Loading...</span>
  <div v-else-if="isError">
    <h1>Error</h1>
    <pre>{{ JSON.stringify(error, null, '\t') }}</pre>
  </div>
  <div v-else>
    <h1>{{ article.title }}</h1>
    <p>{{ article.summary }}</p>
    <div v-if="article.image.length" v-for="img in article.image">
      <img class="article-image" :src="img.url" :alt="img.alt" />
      <i>{{ img.caption }}</i>
    </div>
    {{ article.text }}
  </div>
</template>

<style scoped>
.article-image {
  max-width: 100%;
}
</style>
