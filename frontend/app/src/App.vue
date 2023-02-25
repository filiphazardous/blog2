<script setup lang="ts">
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <TheHeader />
  <RouterView />
  <TheFooter />
</template>
