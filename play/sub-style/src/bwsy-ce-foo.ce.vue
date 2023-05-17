<template>
  <div>
    <p class="foo">should be red -- foo</p>
    <bwsy-bar></bwsy-bar>
  </div>
</template>
<script setup>
import BwsyBar from './bwsy-bar.vue';
</script>

<style scoped>
.foo {
  color: red;
}
</style>
