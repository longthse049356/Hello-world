<template>
    <div v-if="value" class="thumbnail gallery-wrapper">
        <div :class="`image ${ratio} empty`">
            <media :class="imgClass" :value="value[index]" :width="width" :height="height"></media>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Thumbnail",
        props: {
            value: {
                default: () => {
                    return []
                },
                type: Array
            },
            width: {
                type: String,
                default: "200"
            },
            height: {
                type: String,
                default: "200"
            },
            ratio: {
                type: String,
                default: ''
            },
            updating: {
                type: Boolean,
                default: false
            },
            imgClass: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                index: 0,
                data: this.value || [],
                isActive: false
            }
        },
        watch: {
            value() {
                this.data = this.value
            }
        }
    }
</script>

<style scoped>

</style>