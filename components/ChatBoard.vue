<template>
    <div class="conversation">
        <div class="header">
            <div class="media">
                <div class="media-left">
                    <div class="image is-48x48">
                        <img class="is-rounded" :src="'https://i.pravatar.cc/300?img=' + 1" alt="">
                    </div>
                </div>
                <div class="media-content">
                    <h4 class="title is-5">
                        <editable class="has-border" style="width: 100%" type="textarea" v-model="tempGroup.name"
                                  :is-updating="creating"
                                  placeholder="Nhập tiêu đề cuộc trò chuyện"/>
                    </h4>
                </div>
            </div>
            <b-field v-if="creating" style="margin-top: 1rem" label="Thêm mọi người" label-position="on-border">
                <r-search class="has-border" icon="users" field="username" placeholder="Đi cùng với" :multiple="true"
                          v-model="tempGroup.users" module="user"/>
            </b-field>
        </div>
        <div class="content">
            <div class="" style="display: flex; flex-direction: column; height: 100%;">
                <div class="messages">
                    <div class="media" v-for="m in response.edges" :key="m.id">
                        <div class="media-left">
                            <n-link :to="`/member/${m.user.username}`">
                                <Avatar class="is-32x32" :is-rounded="true"
                                        :value="m.user.profile ? m.user.profile.media : null"/>
                            </n-link>
                        </div>
                        <div class="media-content">
                            <b-notification v-bind:class="{'is-primary': isMine(m)}" :closable="false">{{m.content}}
                            </b-notification>
                            <small class="time">{{timeSince(m.created)}} trước</small>
                        </div>
                    </div>
                </div>
                <div class="send">
                    <b-field expanded>
                        <b-input expanded v-model="form.content" icon-pack="fas" icon="keyboard"></b-input>
                        <div class="control">
                            <div v-if="!creating" @click="send" class="button is-primary">
                                <span>Gửi</span>
                                <b-icon size="is-small" pack="fas" icon="paper-plane"></b-icon>
                            </div>
                            <div v-else class="button is-primary" @click="start">
                                <span>Bắt đầu</span>
                                <b-icon size="is-small" pack="fas" icon="paper-plane"></b-icon>
                            </div>
                        </div>
                    </b-field>

                </div>
            </div>
        </div>
        <span class="close" @click="$emit('close')">
            <b-icon class="close-icon" pack="fa" icon="times"></b-icon>
        </span>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "ChatBoard",
        props: {
            group: {
                default: null,
                type: Object
            }
        },
        data() {
            return {
                conversation: null,
                response: {
                    edges: []
                },
                tempGroup: this.group,
                form: {
                    group: this.group.id,
                    content: this.group && typeof this.group.id === "undefined" ? 'Xin chào' : null
                },
                creating: this.group && typeof this.group.id === "undefined"
            }
        },
        methods: {
            async fetch() {
                if (this.tempGroup && this.tempGroup.id) {
                    let response = await this.$graph['group_messages']({
                        param: {
                            limit: 20,
                            page: 1,
                            search: "",
                            group: this.tempGroup.id
                        }
                    })
                    this.response = response['data']['group_messages']
                    this.response.edges = this.response.edges.reverse()
                }
            },
            async init() {

            },
            async send() {
                if ([null, ''].includes(this.form.content) || this.form.group === 0) {
                    return
                }
                await this.$api.message.post(this.form)
                this.form.content = ''
            },
            isMine(m) {
                return this.currentUser && this.currentUser.id === m.user.id
            },
            async start() {
                let data = this.formatData(this.tempGroup)
                let res = await this.$api.chat_group.post(data)
                if (process.env.SOCKET_URI) {
                    await this.$store.dispatch('notify/socketConnect')
                }
                this.send()
                this.tempGroup = res.data
            }
        },
        computed: {
            ...mapState('notify', ['message'])
        },
        watch: {
            group() {
                this.tempGroup = this.group
                this.response.edges = []
                this.form.group = this.group.id
            },
            tempGroup() {
                this.creating = this.tempGroup && typeof this.tempGroup.id === "undefined"
                this.form.group = this.tempGroup ? this.tempGroup.id : null
                this.fetch()
            },
            message() {
                if (this.message && this.message.group === this.group.id) {
                    this.response.edges.push(this.message)
                }
            }
        },
        created() {
            this.fetch()
        }
    }
</script>

<style lang="scss">
    .messages {
        flex: 1;
        overflow: auto;

        .notification {
            padding: 0.75rem 0.75rem;
            font-size: 13px;
            margin-bottom: 0;
            border-radius: 5px;
        }

        .time {
            font-size: 10px;
            color: #818181;
        }

        .media + .media {
            border-top: 0;
            margin-top: 1rem;
            padding-top: 0;
        }
    }

    .send {
        padding-top: 1rem;
        flex: 0;
    }
</style>