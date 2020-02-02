<template>
    <div>
        <section class="hero is-primary north">
            <div class="hero-body">
                <div class="container small" style="text-align: center">
                    <Discovery></Discovery>
                    <div class="tag is-primary">Khám phá điểm đến</div>
                </div>
            </div>
        </section>
        <section class="hero center">
            <div class="hero-body">
                <div class="container medium">
                    <h2 class="title has-text-centered">Nổi bật nhất</h2>
                    <div class="buttons" style="justify-content: center;">
                        <div class="button is-white">
                            <b-icon size="is-small" pack="fa" icon="hashtag"></b-icon>
                            <span>Biển</span>
                        </div>
                        <div class="button is-white">
                            <b-icon size="is-small" pack="fa" icon="hashtag"></b-icon>
                            <span>Vịnh</span>
                        </div>
                        <div class="button is-white">
                            <b-icon size="is-small" pack="fa" icon="hashtag"></b-icon>
                            <span>Đảo</span>
                        </div>
                        <div class="button is-white">
                            <b-icon size="is-small" pack="fa" icon="hashtag"></b-icon>
                            <span>Phố núi</span>
                        </div>
                        <div class="button is-white">
                            <b-icon size="is-small" pack="fa" icon="hashtag"></b-icon>
                            <span>Cao nguyên</span>
                        </div>
                    </div>
                    <popular :data="response" :max="8" layout="overlay" img-size="/300/300" title-position="inside"></popular>
                </div>
            </div>
        </section>
        <section class="hero center is-light">
            <div class="hero-body">
                <div class="container medium">
                    <div class="columns">
                        <div class="column" v-for="p in people" :key="p.id">
                            <figure class="image avatar">
                                <img :src="p.avatar"
                                     class="is-rounded"
                                     alt="Placeholder image">
                                <div class="tag is-warning">+ {{Math.floor((Math.random() * 10) + 1)}}</div>
                            </figure>
                        </div>
                    </div>
                    <div style="text-align: center">
                        <div class="tag is-warning">Kết nối với những người bạn thú vị!</div>
                    </div>
                </div>
            </div>
        </section>
        <section class="hero center">
            <div class="hero-body">
                <div class="container medium">
                    <h2 class="title has-text-centered">Chuyến đi thú vị</h2>
                    <popular :max="3" :multiline="true" max-image-size="is-2by1" img-size="/640/320" column="4">
                        <template v-slot:footer="props">
                            <div class="is-absolute top-right">
                                <favorite color="#FFF"></favorite>
                            </div>
                            <div class="card-footer">
                                <div class="card-footer-item">
                                    <div class="media">
                                        <div class="media-left">
                                            <figure class="image is-32x32">
                                                <img src="https://bulma.io/images/placeholders/480x480.png" alt="">
                                            </figure>
                                        </div>
                                        <div class="media-content">
                                            <h4><b>Hà Giang</b></h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer-item">
                                    <div class="media">
                                        <div class="media-left">
                                            <figure class="image is-32x32">
                                                <img src="https://bulma.io/images/placeholders/480x480.png" alt="">
                                            </figure>
                                        </div>
                                        <div class="media-content">
                                            <h4><b>Hà Nội</b></h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </popular>
                </div>
            </div>
        </section>
        <section class="hero south is-light">
            <div class="hero-body">
                <div class="container medium">
                    <div class="columns">
                        <div class="column v-center">
                            <div>
                                <h1 class="title is-1">
                                    Thổ địa
                                </h1>
                                <h2 class="subtitle">
                                    Người bạn đồng hành tin cậy
                                </h2>
                            </div>
                        </div>
                        <div class="column">
                            <img src="../static/local.png"/></div>
                    </div>
                </div>
            </div>
        </section>
        <section class="hero south">
            <div class="hero-body">
                <div class="container medium">
                    <div class="columns">
                        <div class="column">
                            <img src="../static/coin.png"/></div>
                        <div class="column v-center" style="text-align: right">
                            <div style="width: 100%;">
                                <h1 class="title is-1">Token</h1>
                                <h2 class="subtitle">Vừa đi chơi vừa có quà</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <NuxtChild :data="response"/>
    </div>
</template>

<script>
    export default {
        async asyncData(context) {
            await context.store.dispatch('menu/setMenu', ["A"])
            let res = await context.$graph['destination_destinations']({limit: 6, page: 1, search: ""})
            return {
                response: res.data['destination_destinations']
            }
        },
        data() {
            return {
                people: [
                    {
                        "id": "1",
                        "createdAt": "2019-10-31T09:52:15.408Z",
                        "name": "Dr. Kariane Cummerata",
                        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/hsinyo23/128.jpg"
                    },
                    {
                        "id": "2",
                        "createdAt": "2019-10-30T14:24:40.693Z",
                        "name": "Alison Pfannerstill",
                        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/instalox/128.jpg"
                    },
                    {
                        "id": "3",
                        "createdAt": "2019-10-31T05:17:29.458Z",
                        "name": "Brannon Beer",
                        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/kylefoundry/128.jpg"
                    },
                    {
                        "id": "4",
                        "createdAt": "2019-10-31T03:00:37.293Z",
                        "name": "Jayne Predovic",
                        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/kennyadr/128.jpg"
                    },
                    {
                        "id": "5",
                        "createdAt": "2019-10-31T00:09:22.920Z",
                        "name": "Laisha Mitchell",
                        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/mhudobivnik/128.jpg"
                    },
                    {
                        "id": "6",
                        "createdAt": "2019-10-31T04:27:46.866Z",
                        "name": "Boyd Ryan",
                        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/jm_denis/128.jpg"
                    },
                    {
                        "id": "7",
                        "createdAt": "2019-10-30T18:36:45.292Z",
                        "name": "Rex Waelchi III",
                        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/artem_kostenko/128.jpg"
                    },
                    {
                        "id": "8",
                        "createdAt": "2019-10-30T12:56:40.628Z",
                        "name": "Josefa Leuschke",
                        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/swaplord/128.jpg"
                    }
                ]
            }
        },
        name: "PageHome",
        components: {},
        mounted() {
        },
        computed: {
            isHome() {
                return !!this.$route.params.destination
            }
        }
    }
</script>

<style lang="scss">
    .hero.north {
        background-image: url(https://bruford.co.uk/wp-content/uploads/2017/11/banner-travel-insurance-2000x400.jpg);
        background-size: cover;
        background-repeat: no-repeat;
    }

    .image.avatar {
        padding: 5px;
        background: #FFF;
        box-shadow: 0 1px 7px #0000004d;
        border-radius: 50%;
        position: relative;

        .tag {
            position: absolute;
            top: 10px;
            right: -10px;
            font-size: 10px;
            border-radius: 10px;
            box-shadow: 0 1px 7px #0000004d;
        }
    }
</style>
