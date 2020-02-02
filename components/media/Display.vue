<template>
    <img v-if="value" :src="width && height ? value['thumbnails'][`thumb_${width}_${height}`]: value.path" :alt="value.title">
</template>

<script>
    export default {
        name: "Display",
        props: {
            value: {
                default: null,
                type: Object
            },
            width: {
                type: String,
                default: null
            },
            height: {
                type: String,
                default: null
            }
        }
    }
</script>

<style scoped>

</style>