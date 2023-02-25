<script setup lang="ts">
import { getItemFactory } from "@/api";
import TheError from "@/components/TheError.vue";
import TheImage from "@/components/TheImage.vue";
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
    <TheImage
      v-if="article.image.length"
      :image="article.image[0]"
      image-size="large"
    />
    <vue-markdown class="article-text" :source="article.text" />
    <RouterLink to="/">Tillbaka till huvudsidan</RouterLink>
  </div>
</template>

<style>
.article-text p {
  display: block;
  padding-bottom: 1em;
}
</style>
