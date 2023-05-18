<script setup>
import Bar from './bar.vue'
import Baz from './baz.vue'
</script>

<template>
  <div>
    <p class="foo">
      should be red -- foo
    </p>
    <Bar />
    <Baz />
  </div>
</template>

<style scoped>
.foo {
    color: red;
}
</style>
