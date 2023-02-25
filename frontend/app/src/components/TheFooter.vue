<script setup lang="ts">
import { getItemFactory } from "@/api";
import TheError from "@/components/TheError.vue";
import { useQuery } from "@tanstack/vue-query";
import { onServerPrefetch } from "vue";

const {
  isLoading,
  isError,
  data: footer,
  error,
  suspense,
} = useQuery(getItemFactory("footer", ["logo"]));
onServerPrefetch(suspense);
</script>

<template>
  <span v-if="isLoading">Loading header data...</span>
  <TheError v-else-if="isError" :error="error" />
  <footer v-else class="footer">
    <span class="contact">Kontakt: {{ footer.contact }}</span>
    <span class="copyright">{{ footer.copyright }}</span>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  font-size: 0.75em;
}
.copyright::before {
  content: "\00A9";
}
</style>
