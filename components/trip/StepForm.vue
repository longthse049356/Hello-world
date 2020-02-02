<template>
    <div class="step-form">
        <b-field grouped>
            <b-field expanded>
                <b-datetimepicker
                        class="is-fullwidth"
                        v-model="form.start_date"
                        :min-datetime="dateRanges[0]"
                        :max-datetime="dateRanges[1]"
                        icon-pack="fa"
                        rounded
                        placeholder="Thời gian đi"
                        icon="calendar"
                        :timepicker="{ hourFormat: '24' }">
                </b-datetimepicker>
            </b-field>
            <b-field expanded>
                <b-datetimepicker
                        class="is-fullwidth"
                        v-model="form.end_date"
                        :min-datetime="dateRanges[0]"
                        :max-datetime="dateRanges[1]"
                        icon-pack="fa"
                        rounded
                        placeholder="Thời gian đến"
                        icon="calendar"
                        :timepicker="{ hourFormat: '24' }">
                </b-datetimepicker>
            </b-field>
        </b-field>
        <div class="media">
            <div class="media-left">
                <div class="button is-rounded">{{time ? time : '___:___'}}
                </div>
            </div>
            <div class="media-content">
                <div class="media">
                    <div class="media-left">
                        <m-thumbnail ratio="is-96x96" :value="form.point ? form.point.photos : []"/>
                    </div>
                    <div class="media-content">
                        <d-search icon="globe-asia" v-model="form.point" module="destination_points"
                                  :multiple="false"></d-search>
                        <d-search v-model="form.vehicle" module="destination_vehicles" :multiple="false"
                                  placeholder="Phương tiện"/>
                    </div>
                </div>
            </div>
        </div>
        <AddressMap :value="point_ranges" @input="point_ranges = $event" :updating="true" :zoom-map="15"/>
        <b-field>
            <b-input icon-pack="fa" v-model="form.title" icon="pen" placeholder="Tiêu đề"></b-input>
        </b-field>
        <b-field>
            <b-input type="textarea" rows="2" icon-pack="fa" v-model="form.description" icon="clipboard"
                     placeholder="Ghi chú"></b-input>
        </b-field>
        <div class="button is-success is-fullwidth" @click="handleSave">
            <b-icon pack="fa" icon="plus"></b-icon>
            <span>{{form.id ? 'Cập nhập lịch trình' : 'Thêm vào lịch trình'}}</span>
        </div>
    </div>
</template>

<script>
    const DEFAULT = {
        start_date: null,
        end_date: null,
        title: null,
        point: null,
        end_address: null,
        vehicle: null,
        description: null
    }

    export default {
        name: "StepForm",
        props: {
            dateRanges: {
                type: Array,
                default: () => {
                    return []
                }
            },
            trip: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            value: {}
        },
        data() {
            let form = this.value ? this.value : DEFAULT
            return {
                form,
                point_ranges: []
            }
        },
        computed: {
            time() {
                return this.formatTime(this.form.start_date)
            }
        },
        methods: {
            convertPR() {
                if (this.value.start_address && this.value.end_address) {
                    this.point_ranges = [this.value.start_address, this.value.end_address]
                } else if (this.trip.id) {
                    this.point_ranges = [this.trip.end_point.address, this.trip.end_point.address]
                }
            },
            async handleSave() {
                let data = {
                    title: this.form.title,
                    description: this.form.description,
                    point: this.form.point ? this.form.point.id : null,
                    vehicle: this.form.vehicle ? this.form.vehicle.id : null,
                    start_date: this.momentTime(this.form.start_date).format('YYYY-MM-DD HH:mm'),
                    end_date: this.momentTime(this.form.end_date).format('YYYY-MM-DD HH:mm'),
                    start_address: this.point_ranges.length === 1 ? this.point_ranges[0].id : null,
                    end_address: this.point_ranges.length === 2 ? this.point_ranges[1].id : null,
                    trip: this.trip.id
                }
                if (this.form.id) {
                    await this.$rest.put(`/trip/steps/${this.form.id}/`, data)
                } else {
                    await this.$rest.post('/trip/steps/', this.cleanData(data))
                }
                this.$emit("close")
            }
        },
        created() {
            this.convertPR()
        },
        watch: {
            value() {
                this.form = this.value
                this.convertPR()
            }
        }
    }
</script>

<style lang="scss">
    .step-form {
        padding: 10px;
        border: 1px dashed #EEEEEE;
        margin-bottom: 1rem;

        .input[readonly], .textarea[readonly] {
            box-shadow: 1px 1px 2px rgba(10, 10, 10, 0.1);
        }
    }
</style>