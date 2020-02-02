<template>
    <div class="gallery-wrapper">
        <div id="gallery-wrapper">
            <div class="columns is-gapless">
                <div class="column v-center" id="gallery">
                    <div :class="`gallery ${layout} layout-${data.slice(0, 5).length}`"
                         v-bind:style="{'--content-width': `${this.galleryW}px`}">
                        <div v-for="(p, i) in data.slice(0, 5)" :key="i" :class="`gallery__item gallery__item--${i + 1}`">
                            <img v-if="p" class="gallery__img" :src="p.path" :alt="p.title">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Gallery",
        props: {
            value: {
                type: Array,
                default: () => {
                    return []
                }
            },
            layout: {
                type: String,
                default: 'layout-point'
            }
        },
        data() {
            return {
                elmW: 0,
                browserW: 400,
                galleryW: 700,
                data: this.value || []
            }
        },
        computed: {
            style() {
                return {
                    '--content-width': this.elmW ? `${this.elmW}px` : undefined
                }
            }
        },
        methods: {
            responsive() {
                let galleryW = document.getElementById("gallery");
                this.galleryW = galleryW ? galleryW.clientWidth : 100
            }
        },
        watch: {},
        mounted() {
            this.responsive()
            if (!this.isOpen) {
                window.addEventListener("resize", () => {
                    this.responsive()
                });
            } else {
                this.open()
            }
        }
    }
</script>

<style lang="scss">
</style>