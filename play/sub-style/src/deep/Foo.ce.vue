<script setup lang="ts">
import Child from './Child.vue'
</script>

<template>
  <p class="my-red">
    This should be red
  </p>

  <Child />
</template>

<style scoped>
.my-red { color: red; }
</style>
