<template>
    <div class="a-map">
        <div class="a-input" style="margin-bottom: 1rem" v-if="updating">
            <b-field v-for="(name, i) in names" :key="i" label="Tìm địa điểm" expanded>
                <b-autocomplete
                        expanded
                        rounded
                        :value="name"
                        @input="onInput($event, i)"
                        :data="dataset"
                        placeholder="Hà Nội"
                        icon-pack="fa"
                        icon="search"
                        field="formatted_address"
                        @select="option => addresses[i] = option">
                    <template slot="empty">No results found</template>
                </b-autocomplete>
            </b-field>
        </div>
        <div class="a-wrap">
            <google-map
                    :cursor="cursor"
                    width="100%" height="100%"
                    :address="names"
                    :center="markers[0]" :zoom="zoomMapClone" :markers="markers"
                    @update-position="onUpdatePosition"
                    @update-name="onUpdateName"
                    @update-address="onUpdateAdd"
            />
        </div>
    </div>
</template>

<script>
    const DEFAULT = {
        "geometry": {
            "location": {
                "lat": 21.027803,
                "lng": 105.799792
            },
            "viewport": {
                "northeast": {
                    "lat": 21.0291519802915,
                    "lng": 105.8011409802915
                },
                "southwest": {
                    "lat": 21.0264540197085,
                    "lng": 105.7984430197085
                }
            },
            "location_type": "ROOFTOP"
        },
        "formatted_address": "1160, 5 Đường Láng, Láng Thượng, Đống Đa, Hà Nội, Vietnam",
    }

    export default {
        name: "AddressMap",
        props: {
            value: {
                type: Array,
                default: () => {
                    return []
                }
            },
            zoomMap: {
                default: 5,
                type: Number
            },
            updating: {
                default: false,
                type: Boolean
            }
        },
        data() {
            const value = this.value.length ? this.value : [DEFAULT]
            return {
                cursor: 0,
                zoomMapClone: this.zoomMap,
                dataset: [],
                names: value.map(x => x ? x.formatted_address : null),
                markers: value.map(x => x && x.geometry ? Object.assign(x.geometry.location, {draggable: true}) : {
                    lat: 0,
                    lng: 0,
                    draggable: true
                }),
                addresses: value
            }
        },
        methods: {
            onUpdateName({name, index}) {

            },
            onUpdatePosition({position, index}) {

            },
            onUpdateAdd(data) {
                this.dataset = data.addresses
                if (data.addresses.length) {
                    if (data.flag) {
                        this.addresses[data.index] = data.addresses[0]
                        this.names = this.addresses.map(x => x ? x.formatted_address : null)
                    }
                    this.markers = this.addresses.map(x => x && x.geometry ? Object.assign(x.geometry.location, {draggable: true}) : {
                        lat: 0,
                        lng: 0,
                        draggable: true
                    })
                    this.$emit('input', this.addresses)
                }
            },
            onInput($event, i) {
                this.cursor = i
                this.$set(this.names, i, $event)
            }
        }
    }
</script>

<style lang="scss">
    .a-map {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 250px;

        .a-input {
            flex: 0;
        }

        .a-wrap {
            flex: 1;
            position: relative;
        }
    }
</style>