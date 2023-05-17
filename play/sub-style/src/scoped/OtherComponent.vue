<script setup>
import YetAnotherComponent from './YetAnotherComponent.vue';
import CEorNotCE from './CEorNotCE.vue';

//import { defineCustomElement } from 'vue';
import { defineCustomElement } from 'vue';

customElements.define('nested-ce', defineCustomElement(CEorNotCE));
</script>

<template>
    <p class="my-blue">This should be blue</p>
    <YetAnotherComponent></YetAnotherComponent>
    <nested-ce></nested-ce>
</template>

<style>
.my-blue {
    color: blue;
}
</style>
