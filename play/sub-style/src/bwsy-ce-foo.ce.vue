<template>
  <div>
    <p class="foo">
      should be red -- foo
    </p>
    <BwsyBar />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import BwsyBar from './bwsy-bar.vue'
import './test.css'
// onMounted(() => {
//   debugger
// })
</script>

<script>

</script>

<style scoped>
.foo {
  color: red;
}
</style>
