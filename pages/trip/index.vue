<template>
    <div>
        <section v-if="typeof $route.params.id === 'undefined'" class="hero has-background-white">
            <div class="hero-body">
                <div class="container medium">
                    <div class="level is-mobile">
                        <div class="level-left">
                            <h4 class="title is-5">Trip của bạn</h4>
                        </div>
                        <div class="level-right">
                            <n-link to="/trip/explore" class="button">Khám phá</n-link>
                        </div>
                    </div>
                    <t-list v-model="all" column="is-4" :has-create="true" :layout="'tool'" media-size="is-3by2"
                            :q="q2" label="trip_me"/>
                </div>
            </div>
        </section>
        <section class="hero is-small">
            <div class="hero-body">
                <div class="container medium">
                    <h4 class="title is-5">Xem lại chuyến đi</h4>
                    <t-list :q="q1" v-model="old" column="is-3" layout="memory" media-size="is-1by1" label="trip_me"/>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "index",
        async asyncData(context) {
            if (!context.store.state.auth.user) {
                return context.redirect('/trip/explore')
            }
            let q2 = {
                limit: 5,
                page: 1
            }
            let q1 = {
                limit: 4,
                page: 1
            }
            let old = await context.$graph['trip_me']({param: q1})
            let all = await context.$graph['trip_me']({param: q2})
            return {
                old: old.data['trip_me'],
                all: all.data['trip_me'],
                q1: {param: q1},
                q2: {param: q2}
            }
        },
        head() {
            return {
                title: "Chuyến đi"
            }
        },
        mounted() {
            this.toTop()
            this.stickyFoot()
        }
    }
</script>

<style scoped>

</style>