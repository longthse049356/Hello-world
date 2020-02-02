<template>
    <div class="discovery">
        <b-field class="minimize destination-button">
            <b-button :class="exClass" @click="isActive = true">
                <div class="icon"><i class="fas fa-map-marker-alt"></i></div>
                <span class="discovery-text">{{value.title ? value.title : 'Bạn muốn đi đâu'}} <i class="fas fa-chevron-down fa-sm ml-1"></i></span>
            </b-button>
        </b-field>
        <b-modal :active.sync="isActive" :width="440" scroll="keep">
            <div class="card">
                <div class="card-content">
                    <b-field>
                        <b-input @input="fetch" placeholder="Đi đâu bạn ơi?" size="is-large" expanded></b-input>
                    </b-field>
                    <div class="content">
                        <div v-if="isLoading">
                            <div class="skeleton-sm" v-for="i in 6" :key="i"></div>
                        </div>
                        <div v-else>
                            <h4>Phổ biến</h4>
                            <n-link to="/explore" class="media is-active v-center" style="padding: 1rem 1.5rem">
                                <span class="media-left">
                                    <b-icon pack="fas" size="is-medium" icon="location-arrow"></b-icon>
                                </span>
                                <span class="media-content title is-6">Khám phá điểm đến</span>
                            </n-link>
                            <div class="media" v-for="r in results" :key="r._id">
                                <div class="media-left">
                                    <div v-if="r.photos" class="image is-48x48">
                                        <img :src="r.photos[0].thumbnails['thumb_200_200']" alt="Placeholder image">
                                    </div>
                                </div>
                                <div class="media-content">
                                    <h4>
                                        <n-link :to="`/${r.slug}` + (openD ? '/' + openD : '')">{{r.title}}</n-link>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "Discovery",
        props: {
            value: {
                default: () => {
                    return {
                        title: "Chọn điểm đến"
                    }
                }
            },
            exClass: {
                default: 'is-rounded is-large'
            }
        },
        data() {
            return {
                isActive: false,
                results: [],
                isLoading: false
            }
        },
        methods: {
            fetch(text) {
                this.isLoading = true
                this.$graph['destination_destinations']({param: {limit: 5, page: 1, search: text}}).then(res => {
                    setTimeout(() => {
                        this.results = res.data['destination_destinations'].edges
                        this.isLoading = false
                    }, 2000)
                })
            }
        },
        computed: mapState('menu', ['openD']),
        watch: {
            openD() {
                console.log(this.openD);
                this.isActive = !!this.openD
            },
            isActive() {
                this.$store.dispatch('menu/openD', this.isActive ? this.openD : null)
            },
            $route() {
                this.isActive = false
            }
        },
        created() {
            this.fetch("")
        }
    }
</script>

<style lang="scss">
    .discovery {
        .minimize {
            max-width: 320px;
            margin: 0 auto
        }

        .card {
            border-radius: 10px;
            min-height: 80vh;
            padding: 0.5rem;
            h3 a {
                padding: 0;
            }
        }

        .card .media {
            margin-left: -1.5rem;
            margin-right: -1.5rem;
            padding: 0 1.5rem;
            align-items: center;
            h4 {
                margin-bottom: 0;
            }

            &:not(:last-child) {
                margin-bottom: 0;
            }

            &:not(:first-child) {
                padding-top: 0;
                margin-bottom: 0;
                border-top: 0;
            }

            &:hover,
            &.is-active {
                background: #F9F9F9;
            }
        }
    }

    .north .discovery .minimize{
        margin: 0.5rem auto;
    }
</style>