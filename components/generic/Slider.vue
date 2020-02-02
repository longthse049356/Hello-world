<template>
    <div class="slider-wrapper" id="slider-wrapper">
        <div class="main-slider">
            <div :class="size ? `container ${size}` : ``">
                <div class="slider is-mobile" id="slider" v-bind:style="style">
                    <slot/>
                </div>
            </div>
            <div class="previous" @click="previous">
                <div class="button">
                    <b-icon pack="fa" icon="chevron-left"></b-icon>
                </div>
            </div>
            <div class="next" @click="next">
                <div class="button">
                    <b-icon pack="fa" @click="previous" icon="chevron-right"></b-icon>
                </div>
            </div>
        </div>
        <div v-if="indicator" class="container small hashing">
            <div class="columns is-mobile">
                <div class="column">
                    <div class="button"></div>
                </div>
                <div class="column">
                    <div class="button"></div>
                </div>
                <div class="column">
                    <div class="button"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Slider",
        props: {
            size: {
                default: 'medium',
                type: String
            },
            item: {
                default: 1,
                type: Number
            },
            indicator: {
                default: false,
                type: Boolean
            },
            total: {
                default: 0,
                type: Number
            },
            start: {
                default: -1,
                type: Number
            },
        },
        data() {
            return {
                w: 0,
                base: 0,
                current: this.start
            }
        },
        methods: {
            next() {
                this.current--
            },
            previous() {
                this.current++
            }
        },
        mounted() {
            let myDiv = document.getElementById('slider');
            this.base = myDiv.offsetWidth / this.item + this.item * 2
            this.w = this.base * this.current
        },
        watch: {
            current() {
                this.w = this.base * this.current
            }
        },
        computed: {
            style() {
                return {
                    transform: `translate3d(${this.w}px, 0px, 0px)`
                }
            }
        }
    }
</script>

<style lang="scss">
    .slider-wrapper {
        &.over-hidden {
            overflow: hidden;
            padding: 1rem 0;
        }

        .main-slider {
            position: relative;
        }

        .previous,
        .next {
            opacity: 0;
            position: absolute;
            top: 0;
            bottom: 0;
            cursor: pointer;
            display: flex;
            align-items: center;

            .button {
                border-radius: 50px;
                background: #f5f5f5;
            }
        }

        &:hover {
            .previous,
            .next {
                opacity: 1;
            }
        }

        .previous {
            left: 1.5rem;
        }

        .next {
            right: 1.5rem;
        }

        .slider {
            transition: transform .2s ease-in-out;
            transform: translate3d(0, 0, 0);
        }
    }

    .container.medium {
        margin-bottom: 0.5rem;
    }

    .hashing {
        max-width: 300px !important;

        .column {
            height: 0;
        }

        .button {
            width: 100%;
            height: 0.25em;
            border: 0;
            padding: 0;
            background-color: #bcbcbc;
        }
    }
</style>