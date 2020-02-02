<template>
    <b-select icon-pack="fas" icon="award" v-if="isUpdating" v-model="data" placeholder="Chọn chứng nhận">
        <option v-for="option in samples" :value="option.label" :key="option.label">
            {{ option.title }}
        </option>
    </b-select>
    <span v-else-if="data">
        <b-icon size="is-small" pack="fa" icon="award"></b-icon>
        <span>{{getInstance(data).title}}</span>
    </span>
</template>

<script>
    const SAMPLES = [
        {
            label: 'star1',
            title: 'Khách sạn 1 sao'
        },
        {
            label: 'star2',
            title: 'Khách sạn 2 sao'
        },
        {
            label: 'star3',
            title: 'Khách sạn 3 sao'
        },
        {
            label: 'star4',
            title: 'Khách sạn 4 sao'
        },
        {
            label: 'star5',
            title: 'Khách sạn 5 sao'
        }
    ]

    const FLAT = SAMPLES.map(x => x.label)
    export default {
        name: "LevelTitle",
        props: {
            value: {
                type: String,
                default: null
            },
            isUpdating: {
                default: false,
                type: Boolean
            }
        },
        data() {
            return {
                data: this.value,
                samples: SAMPLES
            }
        },
        watch: {
            data() {
                this.$emit('input', this.data)
            }
        },
        methods: {
            getInstance(label) {
                return SAMPLES[FLAT.indexOf(label)]
            }
        }
    }
</script>

<style scoped>

</style>