<template>
    <div class="trip-explore wrapper-test">
        <section class="hero is-small has-background-white">
            <div class="hero-body" style="padding: 1rem">
                <b-carousel-list :data="[1,2,3,4]" :items-to-show="2"
                        icon-pack="fa"
                        icon-prev="chevron-left"
                        icon-next="chevron-right"
                        :has-opacity="true">
                    <template slot="item" slot-scope="props">
                        <Ticket style="margin: 0 0.5rem;"></Ticket>
                    </template>
                </b-carousel-list>
            </div>
        </section>
        <section class="hero is-small has-background-white">
            <div class="hero-body">
                <div class="container medium">
                    <h4 class="title is-5">Đối tác lữ hành</h4>
                </div>
            </div>
        </section>
        <section class="hero is-small">
            <div class="hero-body">
                <div class="container medium">
                    <h4 style="margin-bottom: 2rem" class="title is-4 has-text-centered">
                        <b-icon pack="fab" icon="hotjar" size="is-small"></b-icon>
                        <span>Chuyến đi nổi bật</span>
                    </h4>
                    <t-list :q="q" style="margin-bottom: 1.5rem" v-model="trip" column="is-6" layout="coming" media-size="is-2by1"></t-list>
                    <div class="has-text-centered buttons">
                        <n-link to="/trip/search" class="button is-large">
                            <b-icon pack="fa" icon="plus" size="is-small"></b-icon>
                            <span>Tất cả</span>
                        </n-link>
                        <n-link to="/trip/create" class="button is-large is-success">
                            <b-icon pack="fa" icon="plus" size="is-small"></b-icon>
                            <span>Tạo chuyến đi</span>
                        </n-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Ticket from "../../components/trip/Ticket";

    export default {
        name: "PageTripExplore",
        components: {
            Ticket
        },
        async asyncData(context) {
            let q = {limit: 4, page: 1, search: ""}
            let res = await context.$graph['recommendation_trips']({param: q})
            let res2 = await context.$graph['recommendation_trips']({param: {limit: 3, page: 1, search: ""}})
            return {
                trip: res.data['recommendation_trips'],
                featured: res2.data['recommendation_trips'],
                q: {param: q}
            }
        },
        data() {
            return {
            }
        },
        head() {
            return {
                title: "Khám phá chuyến đi"
            }
        },
        mounted() {
            this.toTop()
            this.stickyFoot()
        }
    }
</script>

<style lang="scss"></style>