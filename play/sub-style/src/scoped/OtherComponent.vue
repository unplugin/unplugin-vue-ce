<script setup>
import { defineCustomElement } from 'vue'
import YetAnotherComponent from './YetAnotherComponent.vue'
import CEorNotCE from './CEorNotCE.vue'

// import { defineCustomElement } from 'vue';

customElements.define('nested-ce', defineCustomElement(CEorNotCE))
</script>

<template>
  <p class="my-blue">
    This should be blue
  </p>
  <YetAnotherComponent />
  <nested-ce />
</template>

<style>
.my-blue {
    color: blue;
}
</style>
