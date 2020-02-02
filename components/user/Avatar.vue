<template>
    <div class="image avatar">
        <upload v-if="updating" :is-multiple="false" @done="handleUpload"></upload>
        <img v-else-if="data && data.thumbnails" :src="data.thumbnails['thumb_200_200']" alt="" v-bind:class="{'is-rounded': isRounded}">
        <img v-else-if="data && data.path" :src="data.path" alt="" v-bind:class="{'is-rounded': isRounded}">
        <img v-else v-bind:class="{'is-rounded': isRounded}" src="/avatar.jpg" alt="">
        <div v-if="isUpdating" class="button action is-small" @click="updating = !updating">
            <b-icon pack="fa" icon="pen"></b-icon>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Avatar",
        props: {
            value: {},
            isUpdating: {
                default: false,
                type: Boolean
            },
            isRounded: {
                default: false,
                type: Boolean
            }
        },
        data() {
            return {
                data: this.value,
                updating: this.isUpdating
            }
        },
        methods: {
            handleUpload(files) {
                if (files.length) {
                    this.data = files[0]
                    this.$emit('input', this.data)
                    this.updating = false
                }
            }
        }
    }
</script>

<style scoped>

</style>