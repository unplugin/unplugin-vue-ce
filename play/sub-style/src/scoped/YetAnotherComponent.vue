<script setup>
import CEorNotCE from './CEorNotCE.vue';
</script>

<template>
    <p class="my-green">This should be green</p>
    <CEorNotCE :isInCE="false"></CEorNotCE>
</template>

<style scoped>
.my-green {
    color: green;
}
</style>
