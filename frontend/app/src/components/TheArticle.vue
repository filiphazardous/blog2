<script setup lang="ts">
import { getItemFactory } from "@/api";
import { useQuery } from "@tanstack/vue-query";

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

const {
  isLoading,
  isError,
  data: article,
  error,
} = useQuery(getItemFactory(props.slug, "articles", ["image"], "large"));
</script>

<template>
  <span v-if="isLoading">Loading...</span>
  <div v-else-if="isError">
    <h1>Error</h1>
    <pre>{{ JSON.stringify(error, null, "\t") }}</pre>
  </div>
  <div v-else>
    <h1>{{ article.title }}</h1>
    <p>{{ article.summary }}</p>
    <template v-if="article.image.length">
      <div v-for="img in article.image" :key="img.url">
        <img class="article-image" :src="img.url" :alt="img.alt" />
        <i>{{ img.caption }}</i>
      </div>
    </template>
    {{ article.text }}
  </div>
</template>

<style scoped>
.article-image {
  max-width: 100%;
}
</style>
