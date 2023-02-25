<template>
  <article>
    <h3>{{ title }}</h3>
    <div v-if="image && image.length">
      <img class="article-image" :src="image[0].url" :alt="image[0].alt"/>
      <i>{{ image[0].caption }}</i>
    </div>
    <p>{{ summary }}</p>
  </article>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    title: 'String',
    summary: 'String',
    image: 'Array'
  }
}
</script>

<style scoped>
.article-image {
  max-width: 100%;
}
</style>
