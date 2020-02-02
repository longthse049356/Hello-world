<template>
    <div id="trip" v-bind:class="{minimize: isMinimize}">
        <header class="sticky">
            <b-navbar>
                <template slot="brand">
                    <b-navbar-item tag="div" style="padding: 0 0.75rem">
                        <div class="logo">
                            <b-icon pack="far" icon="bars" @click.native="isMinimize = !isMinimize"></b-icon>
                            <n-link to="/"><img src="/logo.png" alt=""></n-link>
                        </div>
                    </b-navbar-item>
                </template>
                <template slot="start">
                    <b-navbar-item v-if="!paths.includes($route.path)">
                        <discovery :value="$store.state.menu.destination" ex-class="is-text"></discovery>
                    </b-navbar-item>
                    <b-navbar-item
                            style="width: 350px;position: fixed;right: calc(50% - 175px); background: none !important">
                        <b-field style="width: 100%" class="search-bar">
                            <b-input placeholder="Tìm kiếm..." type="search" expanded icon-pack="fa"
                                     icon="search"></b-input>
                        </b-field>
                    </b-navbar-item>
                </template>
                <template slot="end">
                    <b-navbar-item tag="div">
                        <b-dropdown class="activities" position="is-bottom-left" aria-role="menu" trap-focus
                                    :can-close="['outside']">
                            <b-button type="is-text" slot="trigger">
                                <b-icon size="is-small" pack="fa" icon="rss"></b-icon>
                            </b-button>
                            <b-dropdown-item aria-role="menu-item" custom>
                                <Notification title="Thông báo"></Notification>
                            </b-dropdown-item>
                        </b-dropdown>
                    </b-navbar-item>
                    <b-navbar-item tag="div" v-if="currentUser">
                        <n-link :to="`/member/${currentUser.username}`">
                            <span class="media">
                                <span class="media-left">
                                    <Avatar class="is-24x24" :is-rounded="true"
                                            :value="currentUser.profile ? currentUser.profile.media : null"></Avatar>
                                </span>
                                <b class="media-content">{{convertName(currentUser)}}</b>
                            </span>
                        </n-link>
                    </b-navbar-item>
                    <b-navbar-item v-else tag="router-link" to="/member/access">Đăng nhập</b-navbar-item>
                    <b-navbar-item tag="div" style="border-left: 1px solid #F5F5F5">
                        <b-button type="is-text" @click="showChat = !showChat">
                            <b-icon size="is-small rotate" pack="fa"
                                    :icon="!showChat ? 'envelope-open-text' : 'times'"></b-icon>
                        </b-button>
                    </b-navbar-item>
                </template>
            </b-navbar>
        </header>
        <div class="main">
            <div id="bar-center" class="bar-center">
                <nuxt class="wrapper"/>
                <footer class="footer">
                    <div class="content has-text-centered">
                        <p><strong>TRIP.VN</strong> @ 2019 - Chạm là đi</p>
                    </div>
                </footer>
            </div>
            <div class="bar-left">
                <b-menu>
                    <b-menu-list>
                        <b-menu-item class="has-active-arrow" icon-pack="far" label="Trang chính" icon="home-lg-alt"
                                     tag="router-link" to="/">
                        </b-menu-item>
                        <b-menu-item class="has-active-arrow" icon-pack="far" label="Trekking" icon="shoe-prints"
                                     tag="router-link"
                                     to="/activity">
                        </b-menu-item>
                        <b-menu-item class="has-active-arrow" icon-pack="far" label="Chuyến đi" icon="hiking"
                                     tag="router-link" to="/trip">
                        </b-menu-item>
                        <b-menu-item class="has-active-arrow" icon-pack="far" label="Hội nhóm" icon="users"
                                     tag="router-link" to="/group">
                        </b-menu-item>
                    </b-menu-list>
                </b-menu>
                <aside class="menu" v-if="menuItems.length">
                    <p v-if="!isMinimize" class="menu-label">Chuyến đi</p>
                    <ul class="menu-list">
                        <li v-for="(item, i) in menuItems" :key="i" v-bind:class="{'has-active-arrow': item.click}">
                            <n-link :to="(item.click ? item.to : '')" @click.native="handleClick(item)">
                                <b-icon size="is-small" pack="far" :icon="item.icon"></b-icon>
                                <span>{{item.title}}</span>
                            </n-link>
                        </li>
                    </ul>
                </aside>
                <b-menu>
                    <b-menu-list :label="isMinimize ? '': 'Quản lý'">
                        <b-menu-item icon-pack="far" label="Đã lưu" icon="bookmark" tag="router-link" to="/"
                                     @click="developmentNotify">
                        </b-menu-item>
                        <b-menu-item icon-pack="fab" label="Xu" icon="bitcoin" tag="router-link" to="/"
                                     @click="developmentNotify">
                        </b-menu-item>
                    </b-menu-list>
                </b-menu>
                <aside class="menu">
                    <div class="menu-list">
                        <div class="elm">
                            <div
                                    v-bind:class="{'button is-primary trip-button is-fullwidth' : !isMinimize}"
                                    @click="handleCreate">
                                <b-icon pack="fa" icon="plus" size="is-small"></b-icon>
                                <span v-if="!isMinimize">Tạo</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
            <transition name="fade" mode="out-in">
                <div class="bar-right" v-if="showChat && $store.getters['auth/loggedIn']">
                    <Conversation></Conversation>
                </div>
            </transition>
        </div>
        <b-modal :active.sync="showChoose" :width="540" scroll="keep">
            <div class="card card-modal">
                <div class="card-content">
                    <div class="columns">
                        <div class="column">
                            <n-link to="/create" class="card nowrap">
                                <div class="card-image bottom-1">
                                    <img src="../static/create/destination.png" alt="">
                                </div>
                                <div class="card-text">
                                    <h4 class="has-text-centered">Tạo điếm đến</h4>
                                </div>
                            </n-link>
                        </div>
                        <div class="column">
                            <n-link to="/trip/create" class="card nowrap">
                                <div class="card-image bottom-1">
                                    <img src="../static/create/trip.png" alt="">
                                </div>
                                <div class="card-text">
                                    <h4 class="has-text-centered">Tạo chuyến đi</h4>
                                </div>
                            </n-link>
                        </div>
                        <div class="column">
                            <n-link to="/group/create" class="card nowrap">
                                <div class="card-image bottom-1">
                                    <img src="../static/create/group.png" alt="">
                                </div>
                                <div class="card-text">
                                    <h4 class="has-text-centered">Tạo nhóm</h4>
                                </div>
                            </n-link>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
        <div class="alert-notify" v-bind:style="alertStyle">
            <b-notification type="is-info" v-for="n in notifies" :key="n.id" aria-close-label="Close notification">
                <Notify :simple="true" :value="n"></Notify>
            </b-notification>
        </div>
    </div>
</template>
<script>
    import Conversation from "../components/Conversation";
    import Notify from "../components/activity/Notify";

    export default {
        components: {
            Conversation, Notify
        },
        data() {
            return {
                isMinimize: false,
                isActive: false,
                showChat: false,
                showChoose: false,
                paths: [
                    '/',
                    '/trip',
                    '/trip/search',
                    '/trip/explore',
                    '/group'
                ]
            }
        },
        methods: {
            handleClick(item) {
                if (!item.click) {
                    this.$store.dispatch('menu/openD', item.to)
                }
            },
            handleCreate() {
                const name = this.$route.name
                const params = this.$route.params
                let path = null
                if (name === 'destination-flag-point') {
                    if (params.flag) {
                        path = `/${params.destination}/${params.flag}/create`
                    } else if (params.destination) {
                        path = `/create`
                    }
                } else if (name === 'trip-id') {
                    path = `/trip/create`
                } else if (name === 'group-id') {
                    path = `/group/create`
                }
                if (path) {
                    this.$router.replace({path: path})
                } else {
                    this.showChoose = true
                }
            }
        },
        computed: {
            menuItems() {
                return this.$store.state.menu.items
            },
            notifies() {
                return this.$store.state.notify.notifies
            },
            alertStyle() {
                let right = '1rem'
                if (this.showChat) {
                    right = '5rem'
                }
                return {
                    right: right
                }
            }
        },
        mounted() {
            window.addEventListener("resize", () => {
                if (document.body.clientWidth < 700) {
                    this.isMinimize = true
                    this.showChat = false
                }
            });
            if (process.env.SOCKET_URI) {
                this.$store.dispatch('notify/socketConnect')
            }
        },
        watch: {
            $route() {
                this.showChoose = false
            }
        }
    }
</script>
<style lang="scss">
    $width: 55px;
    li.bugger {
        list-style: none;
        padding: 0.75rem 1rem 0.75rem 1.25rem;
    }

    .minimize {
        .bar-left {
            width: $width;
            transition: width 0.5s;
        }

        .footer {
            margin-left: $width;
        }

        .bar-center {
            margin-left: $width;
        }

        .bar-left {
            .menu-list a span:last-child {
                border-left: 0;
                display: none;
            }
        }
    }

    .search-bar {
        .input {
            border: 1px solid #EEEEEE;
            box-shadow: unset;
            background: #f5f5f5;
        }
    }

    .wrapper-test {
        background: #f5f7fa;
    }

    .alert-notify {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        max-width: 300px;
    }
</style>