<template>
    <div class="card">
        <div class="card-image">
            <div class="image is-2by1">
                <img v-if="!hasCreate" src="https://picsum.photos/id/828/400/200" alt="">
            </div>
            <div class="inside">
                <div class="level">
                    <div class="level-left">
                        <n-link :to="`/${destination.slug}/${type}`">{{title}}</n-link>
                    </div>
                    <div class="level-right" v-if="hasCreate">
                        <n-link class="button is-text is-small" :to="`/${destination.slug}/${type}/create`" style="color: #FFFFFF">
                            <b-icon pack="fa" icon="plus"></b-icon>
                        </n-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-content" v-if="data">
            <div class="media" style="margin-bottom: 1.5rem" v-for="item in data.edges" :key="item.id"
                 @click="activePoint = item">
                <div class="media-left">
                    <m-thumbnail :value="item.photos" ratio="is-64x64"></m-thumbnail>
                </div>
                <div class="media-content">
                    <h4><b><n-link :to="`/${destination.slug}/${type}/${item.slug}`">{{item.title}}</n-link></b></h4>
                    <small>
                        <b-icon size="is-small" pack="fa"
                                icon="map-marker-alt"></b-icon>
                        <span>{{item.address.formatted_address}}</span>
                    </small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Thumbnail from "../media/Thumbnail";
    export default {
        name: "PList",
        components: {Thumbnail},
        props: {
            value: {},
            column: {
                default: 'is-3'
            },
            hasCreate: {
                default: false,
                type: Boolean
            },
            type: {
                default: 'accommodation'
            },
            destination: {
                default: null
            }
        },
        data() {
            return {
                data: this.value
            }
        },
        computed: {
            title() {
                switch (this.type) {
                    case 'accommodation':
                        return 'Nghỉ ngơi'
                    case 'restaurant':
                        return 'Nhà hàng'
                    case 'visit-point':
                        return 'Tham quan'
                    case 'food':
                        return 'ẩm thực'
                }
            }
        }
    }
</script>

<style scoped>

</style>
