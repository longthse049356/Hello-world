<template>
    <MglMap :style="{width: width, height: height}" :accessToken="accessToken" :mapStyle.sync="mapStyle"
            :center="center" @load="onMapLoaded" :zoom="zoom">
        <MglMarker v-for="marker in markers.filter(x => x && x.geometry)" :key="marker.id" :coordinates="getLocation(marker.geometry)" color="red"
                   :draggable="true"/>
    </MglMap>
</template>

<script>
    import Mapbox from "mapbox-gl";
    import {MglMap, MglMarker} from "vue-mapbox";

    export default {
        name: 'MapBox',
        components: {
            MglMap,
            MglMarker
        },
        props: {
            markers: {
                type: Array,
                default: () => {
                    return []
                }
            },
            height: {
                type: String,
                default: '200px'
            },
            width: {
                type: String,
                default: '520px'
            }
        },
        data() {
            return {
                accessToken: 'pk.eyJ1IjoiaG9hbmdhbmhsYW0iLCJhIjoiY2s1M2UybnI3MDdvNzN0bWNzY2ZzejY3ZiJ9.5I5sSMztCsYsWxzJ_2ttKw',
                mapStyle: 'mapbox://styles/mapbox/streets-v11',
                zoom: 6
            };
        },
        methods: {
            getLocation(geo) {
                if (geo.location) {
                    return [geo.location.lng, geo.location.lat]
                }
                return [105.804817, 21.028511]
            },
            onMapLoaded(event) {
                this.map = event.map;
                this.$emit("mapCreated", this.map);
            },
        },
        computed: {
            center() {
                if (this.markers.length) {
                    return this.getLocation(this.markers[0].geometry)
                }
                return [105.804817, 21.028511]
            }
        }
    };
</script>
