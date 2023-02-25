<script setup lang="ts">
import { getItemFactory } from "@/api";
import TheList from "@/components/TheList.vue";
import { makeHead } from "@/utils/makeHead";
import { useQuery } from "@tanstack/vue-query";
import { useHead } from "@vueuse/head";
import { computed, onServerPrefetch } from "vue";
const { data: header, suspense } = useQuery(getItemFactory("header", ["logo"]));
onServerPrefetch(suspense);

const siteName = computed<string>(() => header.value?.siteName ?? "empty");
const subtitle = computed<string>(() => header.value?.subtitle ?? "empty");
const logoUrl = computed<string>(() => header.value?.logo.url ?? "empty");

useHead(
  makeHead({ title: siteName, description: subtitle, imageUrl: logoUrl })
);
</script>

<template>
  <main>
    <TheList />
  </main>
</template>
