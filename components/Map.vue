<template>
    <GmapMap :center="{lat:21.028511, lng:105.804817}" :zoom="15" style="width: 100%; height: 100%;">
        <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
        />
    </GmapMap>
</template>
<script>
    export default {
        data() {
            return {
                markers: [
                    {
                        position: {lat:10, lng:10}
                    }
                ],
                center: {lat:10, lng:10}
            }
        },
        mounted() {
            // At this point, the child GmapMap has been mounted, but
            // its map has not been initialized.
            // Therefore we need to write mapRef.$mapPromise.then(() => ...)
        }
    }
</script>