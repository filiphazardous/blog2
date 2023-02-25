<script setup lang="ts">
import ListItem from '@/components/ListItem.vue';
import {useQuery} from '@tanstack/vue-query';
import axios from 'axios';
const { isLoading, isError, data, error } = useQuery({
  queryKey: ['articles'],
  queryFn: () => axios.get(`http://localhost:${import.meta.env.VITE_STRAPI_PORT}/api/articles`,
    {
      headers: {
        Authorization: `bearer ${import.meta.env.VITE_STRAPI_API_KEY}`
      }
    }
  ).then(
    ({data}) => {
      const list = data.data.map(({ id, attributes: { title, slug, summary, text }}) => ({
        title, slug, summary, text, id
      }))
      console.log(list);
      return list;
  }),
})
const list = data;
</script>

<template>
  <h1>The List!</h1>
  <span v-if="isLoading">Loading...</span>
  <span v-else-if="isError">Error</span>
  <ListItem v-else v-for="item in list" :title="item.title" :summary="item.summary" :image="item.image"/>
</template>
