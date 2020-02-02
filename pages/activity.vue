<template>
    <section class="section wrapper-test">
        <div class="container medium mt-2">
            <div class="columns">
                <div class="column">
                    <a-list v-if="typeof $route.params.id === 'undefined'"></a-list>
                    <NuxtChild v-else></NuxtChild>
                </div>
                <div class="column timeline-column-right">
                    <div class="card">
                        <div class="card-content">
                            <FollowBoard></FollowBoard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import FollowBoard from "../components/user/FollowBoard";

    export default {
        name: "PageActivity",
        async asyncData(context) {
            await context.store.dispatch('menu/setMenu', [])
        },
        components: {
            FollowBoard
        },
        mounted() {
            this.toTop()
        },
        head() {
            return {
                title: "Bảng tin"
            }
        }
    }
</script>
