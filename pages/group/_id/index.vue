<template>
    <a-list space="group" content-type="group" :object-id="group ? group.id : 0"></a-list>
</template>

<script>
    export default {
        name: "PageGroupDetail",
        props: {
            group: {}
        },
        async asyncData(ctx) {}
    }
</script>

<style scoped>

</style>
