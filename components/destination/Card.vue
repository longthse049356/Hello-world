<template>
    <div class="card is-fullheight" v-bind:class="{'no-border trip cover-inner': !hasBorder}">
        <div class="card-image">
            <div class="image">
                <img v-if="value.photos && value.photos.length" :src="value.photos[0].thumbnails['thumb_400_200']" alt="Placeholder image">
                <img v-else src="/blank/destination.jpeg" alt="">
            </div>
        </div>
        <div class="card-content">
            <h3 class="title is-5 mb-05">
                <n-link :to="`/${value.slug}`">{{value.title}}</n-link>
            </h3>
            <small>50 lượt ghé thăm</small>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DCard",
        props: {
            value: {},
            hasBorder: {
                default: true,
                type: Boolean
            }
        }
    }
</script>

<style scoped>

</style>
