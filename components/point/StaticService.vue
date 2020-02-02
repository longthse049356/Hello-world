<template>
    <div>
        <div class="columns is-multiline">
            <div class="column is-3" v-for="i in data" :key="i">
                <div class="media v-center" v-if="getInstance(i)">
                    <div class="media-left">
                        <b-icon size="is-small" class="has-text-grey" :pack="getInstance(i).fa_pack" :icon="getInstance(i).icon"></b-icon>
                    </div>
                    <div class="media-content">
                        <span>{{getInstance(i).title}}</span>
                    </div>
                </div>
            </div>
        </div>
        <b-field v-if="isUpdating">
            <b-taginput v-model="temp" :data="samplesFiltered"
                        autocomplete
                        :allow-new="false"
                        field="field"
                        icon="tag"
                        icon-pack="fas"
                        placeholder="Thêm dịch vụ"
                        @typing="getFiltered">
            </b-taginput>
        </b-field>
    </div>
</template>

<script>
    const EXTRA = [
        {
            field: 'breakfast',
            title: 'Bữa sáng miễn phí',
            icon: 'utensils',
            fa_pack: 'fa'
        },
        {
            field: 'coffee',
            title: 'Coffee',
            icon: 'coffee',
            fa_pack: 'fa'
        },
        {
            field: 'bar',
            title: 'Quầy bar',
            icon: 'glass-cheers',
            fa_pack: 'fa'
        },
        {
            field: 'wifi',
            title: 'Wifi miễn phí',
            icon: 'wifi',
            fa_pack: 'fa'
        },
        {
            field: 'spa',
            title: 'Dịch vụ spa',
            icon: 'spa',
            fa_pack: 'fa'
        },
        {
            field: 'airport',
            title: 'Đưa đón miễn phí',
            icon: 'taxi',
            fa_pack: 'fa'
        },
        {
            field: 'swimming',
            title: 'Bể bơi',
            icon: 'swimming-pool',
            fa_pack: 'fa'
        },
        {
            field: 'clean',
            title: 'Dọn phòng',
            icon: 'broom',
            fa_pack: 'fa'
        },
        {
            field: 'meeting',
            title: 'Phòng họp',
            icon: 'presentation',
            fa_pack: 'fa'
        },
        {
            field: 'drying',
            title: 'Giặt là',
            icon: 'tshirt',
            fa_pack: 'fa'
        },
        {
            field: 'casino',
            title: 'Sòng bài',
            icon: 'club',
            fa_pack: 'fa'
        },
        {
            field: 'fitness',
            title: 'Fitness',
            icon: 'dumbbell',
            fa_pack: 'fa'
        },
        {
            field: 'baby',
            title: 'Dịch vụ trông trẻ',
            icon: 'baby-carriage',
            fa_pack: 'fa'
        },
        {
            field: 'paw',
            title: 'Chăm sóc thú cưng',
            icon: 'paw',
            fa_pack: 'fa'
        },
        {
            field: 'rentcar',
            title: 'Thuê xe',
            icon: 'car-alt',
            fa_pack: 'fa'
        },
        {
            field: 'taxi',
            title: 'Đưa đón miễn phí',
            icon: 'taxi',
            fa_pack: 'fa'
        },
        {
            field: 'pet',
            title: 'Chăm sóc thú nuôi',
            icon: 'paw',
            fa_pack: 'fa'
        }
    ]
    export default {
        name: "StaticService",
        props: {
            value: {
                default: () => {
                    return []
                },
                type: Array
            },
            isUpdating: {
                default: false,
                type: Boolean
            }
        },
        data() {
            let temp = []
            let formattedData = []
            let flat = EXTRA.map(x => x.field)
            this.value.forEach(x => {
                if (typeof x === 'object') {
                    temp.push(x)
                    formattedData.push(x.field)
                } else {
                    formattedData.push(x)
                    temp.push(
                        EXTRA[flat.indexOf(x)]
                    )
                }
            })
            return {
                samples: EXTRA,
                flat: flat,
                data: formattedData,
                samplesFiltered: EXTRA,
                temp: temp
            }
        },
        watch: {
            data() {
                this.$emit('input', this.data)
            },
            temp() {
                this.data = this.temp.map(x => x.field)
            }
        },
        methods: {
            getInstance(field) {
                return EXTRA[this.flat.indexOf(field)]
            },
            getFiltered(text) {
                this.samplesFiltered = EXTRA.filter((option) => {
                    return option.title
                        .toString()
                        .toLowerCase()
                        .indexOf(text.toLowerCase()) >= 0
                })
            }
        }
    }
</script>

<style scoped>

</style>