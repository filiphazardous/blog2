<script setup lang="ts">
import { getItemFactory } from "@/api";
import TheError from "@/components/TheError.vue";
import { useQuery } from "@tanstack/vue-query";
import { onServerPrefetch } from "vue";
import { RouterLink } from "vue-router";
const {
  isLoading,
  isError,
  data: header,
  error,
  suspense,
} = useQuery(getItemFactory("header", ["logo"]));
onServerPrefetch(suspense);
</script>

<template>
  <span v-if="isLoading">Loading header data...</span>
  <TheError v-else-if="isError" :error="error" />
  <header v-else class="header">
    <RouterLink to="/">
      <img class="logo" :src="header.logo.url" :alt="header.logo.alt" />
    </RouterLink>

    <div class="name">
      <RouterLink to="/"
        ><span class="title">{{ header.siteName }}</span></RouterLink
      >
      <span class="subtitle">{{ header.subtitle }}</span>
    </div>
  </header>
</template>

<style scoped>
.header {
  line-height: 1.5;
  height: 120px;
  display: flex;
  flex-direction: row;
}

.logo {
  max-height: 100px;
  max-width: 100px;
}
.name {
  display: flex;
  flex-direction: column;
  flex: 2;
}

.title {
  font-size: 2em;
}

.subtitle {
  font-style: italic;
}
</style>
