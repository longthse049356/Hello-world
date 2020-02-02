<template>
    <div class="trip-explore wrapper-test">
        <section class="hero has-background-white" id="banner">
            <div class="hero-body" id="hero-foot">
                <div class="container medium">
                    <b-field class="trip-search" grouped>
                        <b-field>
                            <d-search icon="map-marker-alt" module="destination_destinations" :multiple="false"
                                      placeholder="Điểm đến"/>
                        </b-field>
                        <b-field>
                            <b-datepicker placeholder="Chọn ngày đi" icon-pack="fa" icon="calendar" range>
                            </b-datepicker>
                        </b-field>
                        <b-field expanded>
                            <div class="button">
                                <b-icon pack="fa" icon="user" size="is-small"></b-icon>
                                <span>2 Người lớn, 1 trẻ em</span>
                            </div>
                        </b-field>
                        <b-field>
                            <div class="button is-primary">
                                <span>Tìm chuyến đi</span>
                            </div>
                        </b-field>
                    </b-field>
                </div>
            </div>
        </section>
        <section class="hero is-small">
            <div class="hero-body">
                <div class="container medium">
                    <h4 style="margin-bottom: 2rem" class="title is-4 has-text-centered">
                        <b-icon pack="fab" icon="hotjar" size="is-small"></b-icon>
                        <span>Tất cả chuyến đi</span>
                    </h4>
                    <t-list v-model="resTrip" column="is-6" :q="q" label="trip_trips" layout="coming"></t-list>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "PageTripExplore",
        async asyncData(context) {
            let q = {param: {limit: 8, page: 1, search: ""}}
            let trips = await context.$graph['trip_trips'](q)
            return {
                resTrip: trips.data['trip_trips'],
                q
            }
        },
        head() {
            return {
                title: "Tìm kiếm chuyến đi"
            }
        },
        mounted() {
            this.toTop()
            this.stickyFoot()
        }
    }
</script>

<style lang="scss"></style>