<script setup lang="ts">
import TheArticle from "@/components/TheArticle.vue";
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();
const slug = ref('');
onMounted(async () => {
  console.log('slug:', route.params.slug);
  slug.value = route.params.slug as string;
})

</script>

<template>
  <span v-if="!slug">Que!?</span>
  <TheArticle v-else :slug="slug"/>
</template>
