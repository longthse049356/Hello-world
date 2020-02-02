<template>
    <section class="section" v-bind:class="{'has-background-white': creating}">
        <div class="container" v-bind:class="{'medium': !creating, 'small': creating}">
            <div class="card" style="margin-bottom: 1.5rem">
                <div v-bind:class="{'card-image': !creating, 'card-content': creating}">
                    <upload v-if="creating" :is-multiple="false" @done="addMedia"></upload>
                    <div v-else class="image is-4by1">
                        <img v-if="group.banner" class="object-fit" :src="group.banner.path" alt="">
                    </div>
                </div>
                <div class="card-content" v-bind:class="{'inside': !creating}">
                    <div class="columns is-multiline">
                        <div class="column">
                            <h1 class="title is-4" style="margin-bottom: 0">
                                <editable
                                        :show-icon="creating"
                                        icon="heading"
                                        class="is-black"
                                        :is-updating="creating" v-model="group.title"
                                        placeholder="Tên nhóm"/>
                            </h1>
                            <div>
                                <editable
                                        :show-icon="creating"
                                        icon="at"
                                        :is-updating="creating" v-model="group.slug"
                                        placeholder="Space nhóm: vivu63"/>
                            </div>
                            <editable
                                    :show-icon="creating"
                                    icon="align-right"
                                    placeholder="Mô tả" type="textarea"
                                    :is-updating="creating"
                                    v-model="group.description"/>
                            <div v-if="creating" @click="push()" class="button is-primary is-medium is-fullwidth">
                                {{updating ? 'Cập nhập' : 'Tạo'}}
                            </div>
                        </div>
                        <div v-if="!creating" class="column is-4 v-center">
                            <QuickMember :group="group"></QuickMember>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!creating" class="columns">
                <div class="column">
                    <NuxtChild v-if="allowView" :group="group"></NuxtChild>
                    <Action v-else ex-class="is-fullwidth" :group="group" @done="group.is_join = $event"></Action>
                </div>
                <div class="column timeline-column-right">
                    <div class="card">
                        <div class="card-content card-wrap-padding">
                            <div class="item bottom-05">
                                <b-icon size="is-small" icon="map-pin" pack="far"></b-icon>
                                <span class="left-2">Nhóm tại <a href="#" title=""><b>Hà Nội</b></a> </span>
                            </div>
                            <div class="item bottom-05">
                                <b-icon size="is-small" icon="user" pack="far"></b-icon>
                                <span class="left-2">Thành viên <a href="#" title="">
                                    <b>{{group.total_member}}</b></a>
                                </span>
                            </div>
                            <div class="item">
                                <b-icon size="is-small" icon="bullseye-pointer" pack="far"></b-icon>
                                <span class="left-2">Chuyến đi <a href="#" title=""><b>23</b></a> </span>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <GroupInvite style="margin-bottom: 1rem;"></GroupInvite>
                            <div class="button is-fullwidth is-text">Yêu cầu tham gia (10)</div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content card-wrap-padding">
                            <div class="header">
                                <div class="title is-5">Ảnh</div>
                            </div>
                        </div>
                        <div class="columns is-multiline is-variable is-1">
                            <div class="column is-4" v-for="i in 8" :key="i">
                                <div class="image is-1by1">
                                    <img :src="`https://picsum.photos/id/1${i}/120/120`" alt="">
                                </div>
                            </div>
                            <div class="column is-4">
                                <div class="image is-1by1">
                                    <div class="mask gl-mask"><span>321</span> ảnh</div>
                                    <img src="https://picsum.photos/id/19/120/120" alt="">
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    const DEFAULT = {
        title: null,
        description: null
    }
    import QuickMember from "../../components/group/QuickMember";
    import Action from "../../components/group/Action";

    export default {
        name: "PageGroupDetail",
        async asyncData({params, $graph}) {
            let group = DEFAULT
            if (params.id && params.id !== 'create') {
                let res = await $graph['group_group']({slug: params.id});
                group = res.data['group_group']
            }
            return {
                group
            }
        },
        components: {
            "QuickMember": QuickMember,
            "Action": Action
        },
        data() {
            return {
                updating: false
            }
        },
        head() {
            return {
                title: this.group.title
            }
        },
        computed: {
            creating() {
                return this.$route.params.id === 'create' || this.updating
            },
            allowView() {
                return this.group.is_join &&  this.group.is_join.status === "JOINED"
            }
        },
        methods: {
            addMedia(files) {
                if (files.length) {
                    this.group.banner = files[0]
                }
            },
            async push() {
                if (this.group.id) {
                    let res = await this.$api.group.update(this.group.id, this.cleanData(this.group))
                    this.updating = false
                } else {
                    let res = await this.$api.group.post(this.cleanData(this.group))
                    await this.$router.replace({path: `/group/${res.data.slug}`})
                }
            }
        }
    }
</script>

<style scoped>

</style>
