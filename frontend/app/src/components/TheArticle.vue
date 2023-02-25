<script setup lang="ts">
import { getItemFactory } from "@/api";
import TheError from "@/components/TheError.vue";
import TheImage from "@/components/TheImage.vue";
import { makeHead } from "@/utils/makeHead";
import { useQuery } from "@tanstack/vue-query";
import { computed, onServerPrefetch } from "vue";
import VueMarkdown from "vue-markdown-render";
import { useHead } from "@vueuse/head";

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
const { data: header, suspense: headerSuspense } = useQuery(
  getItemFactory("header", ["logo"])
);

onServerPrefetch(suspense);
onServerPrefetch(headerSuspense);

const title = computed<string>(() => article.value?.title ?? "empty");
const summary = computed<string>(() => article.value?.summary ?? "empty");
const imageUrl = computed<string>(
  () => article.value?.image?.[0]?.formats?.medium.url ?? "empty"
);
const siteName = computed<string>(() => header.value?.siteName ?? "empty");

useHead(
  makeHead({
    title,
    description: summary,
    imageUrl,
    siteName,
  })
);
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
