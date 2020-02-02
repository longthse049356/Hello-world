<template>
    <div>
        <client-only>
            <GmapMap ref="mapRef"
                     :center="{ lat: Number.parseFloat(centerTemp.lat), lng: Number.parseFloat(centerTemp.lng) }"
                     :zoom="zoomTemp"
                     map-type-id="terrain"
                     :style="`width: ${width}; height: ${height}`">
                <GmapMarker
                        :key="index"
                        v-for="(m, index) in markersTemp"
                        :position="{ lat: m.lat, lng: m.lng }"
                        :clickable="true"
                        :draggable="m.draggable"
                        @dragend="onDrag($event, index)"
                        @click="handleClick(m)"/>
            </GmapMap>
        </client-only>
    </div>
</template>

<script>
    import debounce from 'lodash/debounce'

    const _ = require('lodash')

    export default {
        name: 'GoogleMap',
        props: {
            markers: {
                type: Array,
                default: () => {
                    return []
                }
            },
            center: {
                type: Object,
                default: () => {
                    return {
                        lat: 0,
                        lng: 0,
                        draggable: true
                    }
                }
            },
            zoom: {
                type: Number,
                default: 2
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '300px'
            },
            draggable: {
                type: Boolean,
                default: false
            },
            address: {
                type: Array,
                default: () => {
                    return []
                }
            },
            cursor: {
                default: 0,
                type: Number
            }
        },
        data() {
            return {
                activeItem: null,
                isOpen: false,
                centerTemp: this.center,
                markersTemp: this.markers,
                zoomTemp: this.zoom,
                results: []
            }
        },
        methods: {
            handleClick(data) {
                if (data.id) {
                    this.activeItem = data
                    this.isOpen = true
                }
            },
            onDrag(event, index) {
                this.$emit('update-position', {
                    index: index,
                    position: {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                        draggable: true
                    }
                })
                this.getNameByCode({
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                    draggable: true
                }, index)
            },
            getCodeByName: debounce(function (index) {
                let _this = this
                this.$refs.mapRef.$mapPromise.then(() => {
                    let geocoder = new google.maps.Geocoder()
                    geocoder.geocode({'address': _this.address[index]}, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            var latitude = results[0].geometry.location.lat()
                            var longitude = results[0].geometry.location.lng()
                            _this.$emit('update-position', {
                                index: index,
                                position: {
                                    lat: latitude,
                                    lng: longitude,
                                    draggable: true
                                }
                            })
                            _this.centerTemp = {
                                lat: latitude,
                                lng: longitude,
                                draggable: true
                            }
                            _this.preAddress(index, results, false)
                        }
                    })
                })
            }, 1000),
            getNameByCode(locations, index) {
                let _this = this
                this.$refs.mapRef.$mapPromise.then(() => {
                    var geocoder = new google.maps.Geocoder()
                    geocoder.geocode({'location': locations}, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            _this.$emit('update-name', {
                                index: index,
                                name: results[0].formatted_address
                            })
                            _this.preAddress(index, results, true)
                        }
                    })
                })
            },
            async preAddress(index, results, flag) {
                let x = results.map(r => {
                    return {
                        address_components: r.address_components,
                        formatted_address: r.formatted_address,
                        geometry: {
                            location: {
                                lat: r.geometry.location.lat(),
                                lng: r.geometry.location.lng()
                            },
                            viewport: {
                                northeast: {},
                                southwest: {}
                            }
                        },
                        place_id: r.place_id,
                        types: r.types
                    }
                })
                let addresses = []
                for (let i = 0; i < x.length; i++) {
                    let res = await this.$api.address.post(x[i])
                    addresses.push(res.data)
                }
                this.$emit("update-address", {
                    flag,
                    index,
                    addresses
                })
            },
        },
        watch: {
            center() {
                this.centerTemp = this.center
            },
            markers() {
                this.markersTemp = this.markers
            },
            zoom() {
                this.zoomTemp = this.zoom
            },
            address() {
                this.getCodeByName(this.cursor)
            }
        }
    }
</script>

<style scoped>

</style>