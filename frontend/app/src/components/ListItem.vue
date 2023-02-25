<script setup lang="ts">
import TheImage from "@/components/TheImage.vue";
defineProps({
  title: String,
  slug: String,
  summary: String,
  image: Array,
});
</script>

<template>
  <article>
    <router-link class="article-heading" :to="`/article/${slug}`">
      <h3>{{ title }}</h3>
    </router-link>
    <TheImage
      v-if="image && image.length"
      class="article-image"
      :image="image[0]"
      image-size="small"
    />
    <p class="article-summary">{{ summary }}</p>
    <router-link class="article-link" :to="`/article/${slug}`"
      >Läs mer...</router-link
    >
  </article>
</template>

<style scoped>
.article-heading {
  color: black;
}

.article-heading:hover {
  text-decoration: underline;
}
@media (min-width: 600px) {
  article {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: 250px auto;
  }

  .article-heading {
    grid-column: 1/3;
    grid-row: 1;
  }

  .article-image {
    grid-column: 1;
    grid-row: 2/4;
  }

  .article-summary {
    grid-column: 2;
    grid-row: 2;
  }

  .article-link {
    grid-column: 2;
    grid-row: 3;
  }
}
</style>
