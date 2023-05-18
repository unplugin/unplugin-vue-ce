<script setup lang="ts">
import GreatGrandChild from './GreatGrandChild.vue'
</script>

<template>
  <p class="my-green">
    This should be green
  </p>
  <span><GreatGrandChild /></span>
</template>

<style scoped>
.my-green { color: green; }
</style>
