<template>
    <div>
        <a-card :value="activity"/>
    </div>
</template>

<script>
    export default {
        name: "ActivityDetail",
        async asyncData({$graph, params}) {
            let activity = null
            if (params.id) {
                let res = await $graph['feed_feed']({
                    param: {
                        id: params.id, privacy: 'PUBLIC'
                    }
                })
                activity = res.data['feed_feed']
            }
            return {
                activity
            }
        },
        mounted() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        head() {
            return {
                title: this.$route.params.id ? this.activity.title : "Trekking"
            }
        }
    }
</script>

<style scoped>

</style>
