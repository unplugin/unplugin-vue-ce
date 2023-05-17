
<template>
    <p class="my-red"
            v-text="'should  be green and style in the sub shadow root'"
    ></p>
</template>
<!-- This scoped style is more specific than the .my-red from the root -->
<style scoped>
.my-red {
    color: green;
}
</style>
