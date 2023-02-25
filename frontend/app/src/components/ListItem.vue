<template>
  <article>
    <h3>{{ title }}</h3>
    <div v-if="image">
      <img class="article-image" :src="image.url" :alt="image.alt"/>
      <i>{{ image.caption }}</i>
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
    image: 'Object'
  }
}
</script>

<style scoped>
.article-image {
  max-width: 100%;
}
</style>
