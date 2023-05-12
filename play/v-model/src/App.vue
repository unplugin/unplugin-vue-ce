<script setup lang="ts">
import { ref } from 'vue'
const testValue = ref('foo')
</script>

<template>
  <ce-input v-model="testValue" />
</template>
