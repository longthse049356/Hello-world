<template>
    <div :style="`color: ${color}`">
        <b-icon pack="far" icon="bookmark"></b-icon>
    </div>
</template>

<script>
    export default {
        name: "Favorite",
        props: {
            color: {
                type: String,
                default: '#000'
            }
        }
    }
</script>

<style scoped>

</style>
