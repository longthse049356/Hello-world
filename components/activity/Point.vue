<template>
    <div class="card-content">
        <div class="card-border">
            <div class="card-image" v-if="showMap">
                <img :src="mapURL" alt="">
            </div>
            <div class="card-content" style="padding-top: 1rem">
                <div class="media">
                    <div class="media-left">
                        <m-thumbnail :value="value.photos" ratio="is-48x48" width="200" height="200"></m-thumbnail>
                    </div>
                    <div class="media-content">
                        <h4 class="title is-6" style="margin-bottom: 0.25em">
                            <n-link :to="to">{{value.title}}</n-link>
                        </h4>
                        <small v-if="value.address" style="color: gray">
                            <b-icon size="is-small" pack="fas" icon="map-marker-alt"></b-icon>
                            <span>{{value.address.formatted_address}}</span>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Point",
        props: {
            value: {},
            showMap: {
                default: true,
                type: Boolean
            },
            model: {
                default: null,
                type: String
            },
            slug: {
                default: null,
                type: String
            }
        },
        computed: {
            to() {
                return (this.slug ? this.slug + '/' : '/') + this.value.slug
            },
            mapURL() {
                if (this.value.address && this.value.address.geometry) {
                    let l = this.value.address.geometry.location
                    return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${l.lng},${l.lat},9.67,0.00,0.00/580x200@2x?access_token=pk.eyJ1IjoiaG9hbmdhbmhsYW0iLCJhIjoiY2s1M2UybnI3MDdvNzN0bWNzY2ZzejY3ZiJ9.5I5sSMztCsYsWxzJ_2ttKw`
                }
                return null
            }
        }
    }
</script>

<style scoped>

</style>