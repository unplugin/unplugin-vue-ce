<script>
import InNestedCE from "./InNestedCE.vue";

export default {
    components: {InNestedCE},
    props: {
        isInCE: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<template>
  --- is in nested CE: {{ isInCE }}
    <p
            class="my-red"
            v-text="
      isInCE
        ? 'This should be blue (scoped .my-red in nested shadow root)'
        : 'This should be blue (scoped .my-red should overwrite root .my-red)'
    "
    ></p>
    <p
            class="my-blue"
            v-text="
      isInCE
        ? 'This should NOT be blue (not inherited)'
        : 'This should also be blue (inherited)'
    "
    ></p>
   <InNestedCE></InNestedCE>
</template>
<!-- This scoped style is more specific than the .my-red from the root -->
<style scoped>
.my-red {
    color: blue;
}
</style>
