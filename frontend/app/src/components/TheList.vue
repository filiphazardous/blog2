<script setup lang="ts">
import { getListFactory } from "@/api";
import ListItem from "@/components/ListItem.vue";
import { useQuery } from "@tanstack/vue-query";

const {
  isLoading,
  isError,
  data: list,
  error,
} = useQuery(getListFactory("articles", ["image"], "thumbnail"));
</script>

<template>
  <h1>The List!</h1>
  <span v-if="isLoading">Loading...</span>
  <div v-else-if="isError">
    <h1>Error</h1>
    <pre>{{ JSON.stringify(error, null, "\t") }}</pre>
  </div>
  <ListItem
    v-else
    v-for="item in list"
    :key="item.slug"
    :title="item.title"
    :summary="item.summary"
    :image="item.image"
    :slug="item.slug"
  />
</template>
