<script setup>
import OtherComponent from './OtherComponent.vue'
</script>

<template>
  <p class="my-red">
    This should be red
  </p>
  <div>
    <OtherComponent />
  </div>
</template>

<style>
.my-red {
    color: red;
}
</style>
