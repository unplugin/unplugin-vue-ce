<template>
  <input v-model="value">
  <p>  {{ value }} </p>
  <SubInput v-model="subV" />
  <ce-sub-input v-model="subCEV" />
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from 'vue'
import SubInput from './SubInput.vue'
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
const subV = ref('sub Input')
const subCEV = ref('sub CE Input')
</script>
