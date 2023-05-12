<template>
  <input v-model="value">
  <p>  {{ value }} </p>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['update:modelValue'])
const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value)
  },
})
</script>
