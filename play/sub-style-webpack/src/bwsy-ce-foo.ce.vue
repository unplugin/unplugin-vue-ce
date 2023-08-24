<template>
  <div>
    <p class="foo bg-blue">
      should be red -- foo
    </p>
    <BwsyBar />
  </div>
</template>

<script setup>
import BwsyBar from './bwsy-bar.vue'
// import '@virtual:uno'
</script>

<style scoped>
.foo {
  color: red;
}
@unocss preflights;
@unocss default;
@unocss;
</style>
