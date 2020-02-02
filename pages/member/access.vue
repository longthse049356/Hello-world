<template>
    <div class="columns is-gapless access-page">
        <div class="column left is-9">
            <section class="hero is-fullheight">
                <div class="hero-body" style="align-items: flex-end;">
                    <div class="container is-small">
                        <div class="title is-5">“Ngư dân đang cùng nhau may lưới đánh cá
                            để chuẩn bị ra khơi sáng hôm sau”</div>
                        <div class="author">Hình ảnh bởi Quang Vinh Nguyễn / @quang</div>
                        <div>Tại <b-icon pack="fa" icon="map-marker-alt"></b-icon> Cà mau</div>
                    </div>
                </div>
            </section>
        </div>
        <div class="column right">
            <section class="hero is-fullheight">
                <div class="hero-body">
                    <div class="container" style="max-width: 360px">
                        <n-link to="/">
                            <img class="bottom-1" src="/logo.png" alt="" style="max-width: 150px">
                        </n-link>
                        <p class="bottom-2">Tham gia cộng đồng yêu du lịch và xây dựng cho mình những chuyến đi vui vẻ & ý nghĩa nhé.</p>
                        <form v-if="login" class="trip-form bottom-1">
                            <b-field>
                                <b-input :disabled="isDisable" icon-pack="fa" icon="at" type="email" v-model="certificate.email" placeholder="Email hoặc tên đăng nhập">
                                </b-input>
                            </b-field>
                            <b-field>
                                <b-input
                                        icon-pack="fa" icon="key"
                                        type="password"
                                        v-model="certificate.password"
                                        password-reveal
                                        placeholder="Mật khẩu">
                                </b-input>
                            </b-field>
                        </form>
                        <form v-else class="trip-form bottom-1">
                            <b-field>
                                <div class="control">
                                    <input class="input" v-model="certificate.username" placeholder="Tên đăng nhập" required></input>
                                </div>
                            </b-field>
                            <b-field>
                                <div class="control">
                                    <input class="input" :disabled="isDisable" icon-pack="fa" icon="at" type="email" v-model="certificate.email" placeholder="Email">
                                    </input>
                                </div>
                            </b-field>
                            <b-field>
                                <b-input
                                        icon-pack="fa" icon="key"
                                        type="password"
                                        v-model="certificate.password1"
                                        placeholder="Nhập mật khẩu">
                                </b-input>
                            </b-field>
                            <b-field>
                                <b-input
                                        icon-pack="fa" icon="key"
                                        type="password"
                                        v-model="certificate.password2"
                                        placeholder="Nhập lại mật khẩu">
                                </b-input>
                            </b-field>
                            <b-field grouped>
                                <b-field expanded>
                                    <b-input v-model="certificate.first_name" placeholder="Họ"></b-input>
                                </b-field>
                                <b-field expanded>
                                    <b-input v-model="certificate.last_name" placeholder="Tên"></b-input>
                                </b-field>
                            </b-field>
                        </form>
                        <div class="level">
                            <div class="level-left">
                                <b-checkbox>Lưu đăng nhập</b-checkbox>
                            </div>
                            <div class="level-right">
                                <n-link to="/">Quên mật khẩu</n-link>
                            </div>
                        </div>
                        <div class="bottom-2">
                            <button class="button trip-button is-primary is-fullwidth is-rounded" @click="handleLogin()">
                                {{login ? 'Đăng nhập' : 'Đăng ký'}}
                            </button>
                        </div>
                        <h4 class="has-text-centered bottom-1">Đăng nhập qua tài khoản</h4>
                        <div class="buttons has-text-centered">
                            <div class="button is-large is-rounded is-square is-facebook">
                                <b-icon size="is-small" pack="fab" icon="facebook"></b-icon>
                            </div>
                            <div class="button is-large is-rounded is-square is-google">
                                <b-icon size="is-small" class="is-primary" pack="fab" icon="google"></b-icon>
                            </div>
                        </div>
                        <div class="has-text-centered bottom-2">
                            <span v-if="login">Chưa có tài khoản, </span>
                            <n-link @click.native="login = !login" to="#">
                                <strong class="has-text-primary">{{login ? 'Đăng ký mới' : 'Đăng nhập'}}</strong>
                            </n-link>
                        </div>
                        <div class="columns">
                            <div class="column is-6">
                                <div class="buttons">
                                    <div class="button is-fullwidth button-small button-store">
                                        <i class="fab fa-apple"></i>
                                        <small>Tải ứng dụng</small>
                                        <strong>App Store</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-6">
                                <div class="buttons">
                                    <div class="button is-fullwidth button-small button-store">
                                        <i class="fab fa-google-play"></i>
                                        <small>Tải ứng dụng</small>
                                        <strong>Google Play</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content has-text-centered">
                            <p><strong>TRIP.VN</strong> @ 2019 - Mạng xã hội và những chuyến đi</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AccessPage",
        layout: 'landing',
        data() {
            let email = this.$ck.get('invited.email') || ''
            return {
                certificate: {
                    username: '',
                    password: null,
                    email: email,
                    first_name: null,
                    last_name: null,
                    password1: null,
                    password2: null
                },
                isDisable: false,
                login: true
            }
        },
        methods: {
            async handleLogin() {
                let data = Object.assign({}, this.certificate)
                if (this.login) {
                    delete data.password1
                    delete data.password2
                    delete data.first_name
                    delete data.last_name
                    await this.$auth.login(data).catch(e => {
                        console.log(e);
                    })
                    await this.$router.replace({path: '/'})
                } else {
                    delete data.password
                    await this.$api.rest_auth.registration(data).catch(e => {
                        console.log(e);
                    })
                }
            }
        },
        async mounted() {
        }
    }
</script>

<style lang="scss">
    .access-page {
        margin-bottom: 0!important;

        .left {
            .title {
                color: #FFFFFF;
                margin-bottom: 0.5rem;
                max-width: 50%;
            }

            .author {
                color: #FFFFFF;
            }

            position: relative;
            background: url("/login_bg.jpg");
            background-size: cover;
            color: #FFFFFF;
        }

        .right {
            background: #FFF;
        }
    }

    @media all and (max-width: 480px) {
        .access-page {
            .left {
                max-height: 230px;
                .hero.is-fullheight {
                    min-height: unset;
                }
            }
        }
    }
</style>
