<template>
    <div class="card no-border trip">
        <div class="card-image">
            <div class="image">
                <img :key="data['photos'][index].id" :src="data['photos'][index]['thumbnails']['thumb_380_250']"
                     alt=""/>
            </div>
        </div>
        <div class="card-content">
            <h4 class="title is-6">
                <n-link :to="`/${destination}/${type}/${data.slug}`">{{data.title}}</n-link>
            </h4>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PCard",
        props: {
            value: {},
            type: {
                default: 'accommodation',
                type: String
            },
            destination: {
                default: null
            }
        },
        data() {
            return {
                data: this.value,
                index: 0
            }
        }
    }
</script>

<style scoped>

</style>
