<template>
    <div class="columns is-mobile ticket card is-gapless is-multiline">
        <div class="column is-10 body">
            <div class="columns is-mobile is-gapless">
                <div class="column has-mask">
                    <div class="mask"></div>
                    <img src="https://picsum.photos/id/348/200/200" alt=""/>
                </div>
                <div class="column has-content is-6 v-center">
                    <div class="content">
                        <div class="title is-7">Chuyến đi thú vị 123</div>
                        <div class="media">
                            <div class="media-left">
                                <h4 class="title is-4">Hà Nội</h4>
                            </div>
                            <div class="media-content v-center">
                                <b-icon size="is-small" pack="fa" icon="arrow-right"></b-icon>
                            </div>
                            <div class="media-right">
                                <h4 class="title is-4">Đà Nẵng</h4>
                            </div>
                        </div>
                        <small>2/2/2019</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="column tail">
            <div class="content">
                <div class="top">
                    <div class="avatars">
                        <div class="elm">
                            <div class="image is-32x32">
                                <img src="https://api.adorable.io/avatars/91/abott@adorable.png" alt=""
                                     class="is-rounded">
                            </div>
                            <div class="image is-32x32">
                                <img src="https://api.adorable.io/avatars/91/abott@adorable.png" alt=""
                                     class="is-rounded">
                            </div>
                            <div class="image is-32x32">
                                <img src="https://api.adorable.io/avatars/91/abott@adorable.png" alt=""
                                     class="is-rounded">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="center">
                    <div class="button is-small walk is-fullwidth is-text">
                        <span>1</span>
                        <span class="divide"></span>
                        <span>10</span>
                    </div>
                </div>
                <div class="bottom buttons">
                    <div class="button is-primary is-fullwidth is-small">Tham gia</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Ticket",
        props: {
            active: {
                default: false,
                type: Boolean
            }
        }
    }
</script>

<style lang="scss">
    .ticket {
        .tail, .body {
            background: #FFFFFF;
        }

        .steps {
            margin-top: 1rem !important;

            .media {
                background: #FFFFFF;
            }
        }

        .has-mask {
            position: relative;

            img {
                mask-image: url(../../static/ticket/mask_01.png);
                mask-size: cover;
                z-index: 1;
                margin-bottom: -6px;
            }

            .mask {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                content: "";
                background-size: contain;
                background-color: #FFFFFF;
                z-index: 0;
            }
        }

        .has-content {
            min-height: 200px;
        }

        .tail {
            border-left: 1px dashed #DDDDDD;

            .content {
                padding: 1rem;
                display: flex;
                flex-wrap: wrap;
                height: 100%;
                align-content: space-between;

                .top, .center, .bottom {
                    width: 100%;
                }

                .top {
                    align-self: flex-start;
                }

                .bottom {
                    align-self: flex-end;
                }
            }
        }

        .title {
            margin-bottom: 0.25em;
        }

        .column:last-child {
            text-align: right;
        }

        .content {
            text-align: right;
            width: 100%;
            padding: 1rem;
        }
    }
</style>