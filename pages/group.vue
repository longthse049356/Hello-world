<template>
    <NuxtChild v-if="$route.params.id"></NuxtChild>
    <div v-else class="section hero is-small group">
        <div class="hero-body">
            <div class="container medium">
                <div class="columns">
                    <div class="column">
                        <div class="card card-model">
                            <div class="card-content">
                                <div class="header bottom-1">
                                    <div class="title is-5">Nhóm đáng chú ý</div>
                                </div>
                                <div class="columns is-variable is-2">
                                    <div class="column is-3" v-for="g in group.edges" :key="g.id">
                                        <g-card :value="g" img-path="400_400" image-size="is-1by1"></g-card>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card card-model">
                            <div class="card-content">
                                <div class="header bottom-1">
                                    <div class="title is-5">Nhóm của bạn bè</div>
                                </div>
                                <div class="columns is-multiline is-variable is-2">
                                    <div class="column is-6" v-for="g in friend.edges" :key="g.id">
                                        <g-card layout="media" :value="g" image-size="is-64x64"></g-card>
                                    </div>
                                </div>
                                <div class="button is-fullwidth is-light button-more is-small">Xem thêm</div>
                            </div>
                        </div>
                        <div class="card card-model">
                            <div class="card-content">
                                <div class="header bottom-1">
                                    <div class="title is-5">Gợi ý nhóm</div>
                                </div>
                                <div class="columns is-multiline is-variable is-2">
                                    <div class="column is-6" v-for="g in suggestion.edges" :key="g.id">
                                        <g-card layout="media" :value="g" image-size="is-64x64"></g-card>
                                    </div>
                                </div>
                                <div class="button is-fullwidth is-light button-more is-small">Xem thêm</div>
                            </div>
                        </div>
                    </div>
                    <div class="column is-hidden-less-desktop is-4">
                        <div class="card card-model">
                            <div class="card-content">
                                <div class="header bottom-1">
                                    <div class="title is-5">Nhóm của tôi</div>
                                </div>
                                <div class="columns is-multiline">

                                </div>
                                <div class="button is-fullwidth is-light button-more is-small">Xem thêm</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PageGroup",
        async asyncData(context) {
            let mine = null
            let friend = null
            let suggestion = null
            let group = null
            if (typeof context.params.id === 'undefined') {
                let res = await context.$graph['group_groups']({param: {page: 1, limit: 4, search: ""}});
                group = res.data['group_groups']
                res = await context.$graph['group_groups']({param: {page: 1, limit: 6, search: ""}});
                mine = res.data['group_groups']
                res = await context.$graph['group_groups']({param: {page: 1, limit: 6, search: ""}});
                friend = res.data['group_groups']
                res = await context.$graph['group_groups']({param: {page: 1, limit: 6, search: ""}});
                suggestion = res.data['group_groups']
            }
            await context.store.dispatch('menu/setMenu', [])
            return {
                group,
                mine,
                friend,
                suggestion
            }
        },
        head() {
            return {
                title: "Hội nhóm"
            }
        },
        mounted() {
            this.toTop()
        }
    }
</script>

<style lang="scss">

</style>