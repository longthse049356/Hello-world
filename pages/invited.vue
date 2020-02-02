<template>
    <div class="invited-page">
        <div class="invited-background-blur"></div>
        <b-modal :active.sync="isActive" :width="650" scroll="keep" :can-cancel="false">
            <div class="container">
                <div class="card">
                    <div class="card-body">
                        <div class="columns is-gapless">
                            <div class="column card-brand">
                                <div class="cb-logo"><img src="../static/invited/logo.png" title="" alt=""></div>
                            </div>
                            <div class="column is-8">
                                <div class="card-content">
                                    <div class="title is-4">Trải nghiệm Trip.vn Beta</div>
                                    <div class="description text bottom-2">
                                        <p class="bottom-1">Ngày <strong>01/01/2020</strong>, <strong>Trip.vn</strong> mời trải nghiệm
                                            với 500 người dùng đã đăng ký trước đó. Đợt dùng thử này nhóm phát triển muốn nghe đánh giá,
                                            nhận xét của khách hàng để có thể hoàn thiện sản phẩm hơn. Trân trọng cảm ơn.</p>
                                        <p>Với những khách hàng sở hữu code dùng thử, vui lòng nhập vào ô bên dưới:</p>
                                    </div>
                                    <div class="invited-input bottom-1">
                                        <section>
                                            <div class="control">
                                                <input class="input is-medium" type="text" placeholder="VD: 882GHS66" v-model="code">
                                            </div>
                                            <button class="button is-medium is-primary" @click="push()">
                                                <span>Trải nghiệm</span>
                                                <b-icon size="is-small" icon="chevron-circle-right" pack="fas"></b-icon>
                                            </button>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: "invited",
        layout: 'landing',
        data() {
            return {
                isActive: true,
                code: null
            }
        },
        methods: {
            push() {
                this.$api['verify_code'].list({code: this.code})
                    .then(res => {
                        if (res.data.result) {
                            this.$ck.set('invited.code', this.code, {
                                maxAge: 60 * 60 * 24 * 7,
                                path: '/'
                            })
                            this.$ck.set('invited.email', res.data.result, {
                                maxAge: 60 * 60 * 24 * 7,
                                path: '/'
                            })
                            this.$router.replace({path: '/member/access'})
                        } else {
                            this.$buefy.toast.open({
                                duration: 5000,
                                message: `Xin lỗi, Mã của quý khách không hợp lệ!`,
                                position: 'is-bottom',
                                type: 'is-danger'
                            })
                        }
                    })
                    .catch(e => {
                        this.$buefy.toast.open({
                            duration: 5000,
                            message: `Xin lỗi, Mã của quý khách không hợp lệ!`,
                            position: 'is-bottom',
                            type: 'is-danger'
                        })
                    })
            }
        }
    }
</script>

<style scoped>
    .invited-background-blur {
        background-image: url("../static/invited/background.jpg");
        background-position: top center;
        background-size: cover;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .invited-page .card {
        box-shadow: none;
    }

    .invited-page .card .card-brand {
        left: 0;
        text-align: center;
        top: 0;
        bottom: 0;
        background-image: url("../static/invited/brandbg.jpg");
        background-position: 50% 25%;
    }

    .invited-page .card .card-brand .cb-logo {
        padding: 40px 0;
    }

    .invited-page .card .card-brand .cb-logo img {
        width: 90px;
        height: auto;
    }

    .invited-page .card .card-content {
        margin-left: 0;
        padding: 30px;
    }

    .invited-page .card .card-content .description {
        font-weight: 400;
        font-size: 14px;
    }

    .invited-input {
        display: block;
        position: relative;
    }

    .invited-input .control input {
        font-size: 16px;
        font-weight: 600;
        height: 50px;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding-left: 20px;
        padding-right: 150px;
    }

    .invited-input button {
        position: absolute;
        padding-left: 15px;
        padding-right: 15px;
        top: 0;
        right: 0;
        bottom: 0;
        font-size: 16px;
        height: 100%;
        border-radius: 0 5px 5px 0;
    }
</style>