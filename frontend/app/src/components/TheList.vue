<script setup lang="ts">
import ListItem from '@/components/ListItem.vue';
</script>

<template>
  <h1>The List!</h1>
  <ListItem v-for="item in list" :title="item.title" :summary="item.summary" :image="item.image"/>
</template>

<script lang="ts">
export default {
  data() {
    return {
      list: [
        {
          title: 'Test 1',
          summary: 'A little bit of text here',
          image: {
            url: '/src/assets/kitten-pd.jpg',
            alt: 'A hand painted picture of a sleeping kitten',
            caption: 'Sleeping kitten!',
          },
        },
        {
          title: 'Test 2',
          summary: 'Some more text here',
          image: {
            url: '/src/assets/kitten-pd.jpg',
            alt: 'A hand painted picture of a sleeping kitten',
            caption: 'Another sleeping kitten!',
          },
        },
      ],
    };
  },
}
</script>
