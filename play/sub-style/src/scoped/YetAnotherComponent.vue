<script setup>
import CEorNotCE from './CEorNotCE.vue'
</script>

<template>
  <p class="my-green">
    This should be green
  </p>
  <CEorNotCE :is-in-c-e="false" />
</template>

<style scoped>
.my-green {
    color: green;
}
</style>
