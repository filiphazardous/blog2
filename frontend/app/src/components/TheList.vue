<script setup lang="ts">
import { getListFactory } from "@/api";
import ListItem from "@/components/ListItem.vue";
import TheError from "@/components/TheError.vue";
import { useQuery } from "@tanstack/vue-query";
import { onServerPrefetch } from "vue";

const {
  isLoading,
  isError,
  data: list,
  error,
  suspense,
} = useQuery(getListFactory("articles", ["image"]));
onServerPrefetch(suspense);
</script>

<template>
  <span v-if="isLoading">Loading...</span>
  <TheError v-else-if="isError" :error="error" />
  <template v-else>
    <ListItem
      v-for="item in list"
      class="list-item"
      :key="item.slug"
      :title="item.title"
      :summary="item.summary"
      :image="item.image"
      :slug="item.slug"
    />
  </template>
</template>

<style scoped>
.list-item {
  margin-bottom: 2em;
}
</style>
