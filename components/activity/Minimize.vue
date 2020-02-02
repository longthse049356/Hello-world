<template>
    <div class="card activity" v-bind:class="{'simple': minimize}" style="max-width: 550px">
        <div class="card-header">
            <div class="card-header-title">
                <div class="media ">
                    <div class="media-left">
                        <figure :class="`image ${minimize ? 'is-32x32' : 'is-48x48'}`">
                            <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                    </div>
                    <div class="media-content">
                        <div><b>Lâm Hoàng</b> đã đăng nội dung trong abc</div>
                        <n-link to="/activity/123/"><small>15 giờ trước</small></n-link>
                        <div v-if="minimize">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                    </div>
                </div>
            </div>
            <div class="card-header-icon">
                <div class="button is-small is-text">
                    <b-icon pack="fa" icon="ellipsis-v"></b-icon>
                </div>
            </div>
        </div>
        <div class="card-image" v-if="!minimize">
            <figure class="image is-2by1">
                <img src="https://bulma.io/images/placeholders/640x320.png"
                     alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content" v-if="!minimize">
            <div class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            <div class="level is-mobile">
                <div class="level-left">
                    <div class="buttons">
                        <div class="button is-small walk">
                            <b-icon pack="fa" icon="shoe-prints"></b-icon>
                            <span>1k</span>
                        </div>
                    </div>
                </div>
                <div class="level-right"></div>
            </div>
            <b-field label-position="on-border" label="Bình luận">
                <b-input class="is-fullwidth" placeholder="Thật tuyệt..."></b-input>
            </b-field>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ACard",
        props: {
            minimize: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss">
    .activity.card {
        box-shadow: unset;

        .card-content {
            padding: 0.5rem 0;
        }
        .card-header-icon,
        .card-header-title {
            font-weight: normal;
            padding: 0 0 0.5rem;
        }
        .card-header {
            box-shadow: unset;
        }

        .walk {
            span:last-child {
                margin-left: 5px;
                padding-left: 5px;
                border-left: 1px solid #DDDDDD;
            }
        }
    }
</style>
