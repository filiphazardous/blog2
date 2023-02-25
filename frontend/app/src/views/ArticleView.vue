<script setup lang="ts">
import TheArticle from "@/components/TheArticle.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const slug = computed(() => route.params.slug);
</script>

<template>
  <span v-if="!slug">Que!?</span>
  <TheArticle v-else :slug="slug" />
</template>
