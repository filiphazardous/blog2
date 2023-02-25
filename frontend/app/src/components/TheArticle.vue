<script setup lang="ts">
import { getItemFactory } from "@/api";
import TheError from "@/components/TheError.vue";
import { useQuery } from "@tanstack/vue-query";
import { onServerPrefetch } from "vue";
import VueMarkdown from "vue-markdown-render";

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
  suspense,
} = useQuery(getItemFactory("articles", ["image"], { slug: props.slug }));
onServerPrefetch(suspense);
</script>

<template>
  <span v-if="isLoading">Loading...</span>
  <TheError v-else-if="isError" :error="error" />
  <div v-else>
    <h1>{{ article.title }}</h1>
    <p>{{ article.summary }}</p>
    <template v-if="article.image.length">
      <div v-for="img in article.image" :key="img.url">
        <img class="article-image" :src="img.url" :alt="img.alt" />
        <i>{{ img.caption }}</i>
      </div>
    </template>
    <vue-markdown :source="article.text" />
  </div>
</template>

<style scoped>
.article-image {
  max-width: 100%;
}
</style>
