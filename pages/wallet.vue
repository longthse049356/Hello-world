<template>
    <div></div>
</template>

<script>
    export default {
        name: "wallet",
        async asyncData(context) {
            await context.store.dispatch('menu/setMenu', [])
        }
    }
</script>

<style scoped>

</style>