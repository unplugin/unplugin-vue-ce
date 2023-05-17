<script setup lang="ts">
import { ref } from 'vue'
import GrandChild from './GrandChild.vue'
const color = ref('redblue')
const show = ref(true)
</script>

<template>
  <div>
    <p class="my-blue" @click="color = 'blue'">
      This should be blue
    </p>
    <GrandChild v-if="show" />
    <div v-else>
      test
    </div>
  </div>
</template>

<style>
.my-blue { color: v-bind(color) }
</style>
