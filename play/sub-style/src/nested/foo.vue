<script setup>
import Bar from './bar.vue';
import Baz from './baz.vue';
</script>

<template>
    <div>
        <p class="foo">should be red -- foo</p>
        <bar></bar>
        <baz></baz>
    </div>
</template>

<style scoped>
.foo {
    color: red;
}
</style>
