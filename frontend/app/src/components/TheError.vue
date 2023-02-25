<template>
  <pre>{{ JSON.stringify(props.error, null, "\t") }}</pre>
</template>

<script setup lang="ts">
const props = defineProps({ error: Object });
</script>
