<template>
    <section>
        <div class="timeline_wrapper profile_wrapper">
            <div class="profile_wrapper-cover"></div>
            <div class="profile_wrapper-detail">
                <div class="container medium">
                    <div class="p_w-d-section mb-2">
                        <div class="media profile-area">
                            <div class="media-left profile_avatar">
                                <Avatar class="is-128x128" :value="profile.media" @input="profile.media = $event" :is-updating="enableUpdate"></Avatar>
                            </div>
                            <div class="media-content" v-if="enableUpdate">
                                <b-field grouped>
                                    <b-field expanded>
                                        <b-input icon-pack="far" icon="signature" placeholder="Họ"
                                                 v-model="user.first_name"></b-input>
                                    </b-field>
                                    <b-field expanded>
                                        <b-input icon-pack="far" icon="signature" placeholder="Tên"
                                                 v-model="user.last_name"></b-input>
                                    </b-field>
                                </b-field>
                                <b-field>
                                    <b-input rows="2" type="textarea" icon-pack="far" icon="align-right"
                                             placeholder="Mô tả" v-model="user.about"></b-input>
                                </b-field>
                                <b-field grouped>
                                    <b-field expanded>
                                        <d-search icon="map-marker-alt" module="destination_destinations" v-model="profile.destination"
                                                  :multiple="false" placeholder="Quê hương của bạn"/>
                                    </b-field>
                                </b-field>
                            </div>
                            <div class="media-content" v-else>
                                <div class="title is-4 username">{{convertName(user)}}</div>
                                <span>@{{user.username}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="profile_navbar">
                        <div class="level">
                            <div class="level-left">
                                <nav class="bd-tabs">
                                    <div class="tabs">
                                        <ul>
                                            <li v-bind:class="{'is-active': typeof $route.params.flag == 'undefined'}">
                                                <n-link :to="`/member/${user.username}`" title="">Dòng thời gian
                                                </n-link>
                                            </li>
                                            <li v-bind:class="{'is-active': $route.params.flag === 'trip'}">
                                                <n-link :to="`/member/${user.username}/trip`">Chuyến đi</n-link>
                                            </li>
                                            <li v-bind:class="{'is-active': $route.params.flag === 'media'}">
                                                <n-link :to="`/member/${user.username}/media`">Ảnh</n-link>
                                            </li>
                                            <li v-bind:class="{'is-active': $route.params.flag === 'check-in'}">
                                                <n-link :to="`/member/${user.username}/check-in`">Đã dừng chân</n-link>
                                            </li>
                                            <li v-bind:class="{'is-active': $route.params.flag === 'follower'}">
                                                <n-link :to="`/member/${user.username}/follower`">Người theo dõi
                                                </n-link>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                            <div class="level-right">
                                <div class="buttons" v-if="!enableUpdate">
                                    <follow space="authentication" model="user" :object-id="user.id" :is_followed="user.is_followed"/>
                                    <b-dropdown aria-role="list">
                                        <button class="button" type="button" slot="trigger">
                                            <b-icon size="is-small" pack="fa" icon="ellipsis-v"></b-icon>
                                        </button>
                                        <b-dropdown-item aria-role="listitem">
                                            <div class="media" @click="enableUpdate = !enableUpdate">
                                                <b-icon size="is-small" pack="fas" class="media-left"
                                                        icon="pen"></b-icon>
                                                <div class="media-content">Cập nhập</div>
                                            </div>
                                        </b-dropdown-item>
                                        <b-dropdown-item aria-role="listitem" @click="$auth.logout()">
                                            <div class="media">
                                                <b-icon size="is-small" pack="fas" class="media-left"
                                                        icon="sign-out-alt"></b-icon>
                                                <div class="media-content">Thoát</div>
                                            </div>
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </div>
                                <div class="button is-success" @click="push" v-else>Cập nhập</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NuxtChild :user="user"></NuxtChild>
        </div>
    </section>
</template>

<script>
    export default {
        name: "MemberPage",
        async asyncData({$graph, params}) {
            let res = await $graph['user_search']({param: {username: params.username}})
            return {
                user: res['data']['user_search'],
                profile: res['data']['user_search']['profile'] ? res['data']['user_search']['profile'] : {}
            }
        },
        data() {
            return {
                enableUpdate: false
            }
        },
        head() {
            return {
                title: this.convertName(this.user)
            }
        },
        methods: {
            async push() {
                let profile = this.cleanData(this.profile)
                let data = this.cleanData(this.user)
                data.profile = profile
                let res = await this.$api.user.update(this.user.username, data)
                this.enableUpdate = false
            }
        },
        mounted() {
            this.toTop()
            this.stickyFoot()
        },
    }
</script>

<style scoped>

</style>