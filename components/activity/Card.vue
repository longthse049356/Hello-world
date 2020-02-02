<template>
    <div class="card activity" v-bind:class="{'simple': minimize}">
        <!--Header        -->
        <div class="card-header post-item-user">
            <div class="card-header-title">
                <div class="media ">
                    <div class="media-left">
                        <Avatar :is-rounded="true" class="is-32x32" :value="actor.photo"></Avatar>
                    </div>
                    <div class="media-content">
                        <div class="card-title">
                            <span class="actor">
                                <n-link :to="actor.slug">{{actor.title}}</n-link>
                            </span>
                            <span v-if="minimize">
                                {{activity2String(activity, false)}}
                            </span>
                            <span v-else>
                                <b-icon v-if="target.slug" pack="fa" icon="caret-right" size="is-small"></b-icon>
                                <b v-if="target.slug">
                                    <n-link :to="target.slug">{{target.title}}</n-link>
                                </b>
                            </span>
                        </div>
                        <n-link class="time text-small" :to="`/activity/${activity.id}`">
                            <small>
                                <b-icon size="is-small" icon="globe-asia" pack="far"></b-icon>
                                <span>{{timeSince(value.created)}} trước</span>
                            </small>
                        </n-link>
                    </div>
                </div>
            </div>
            <div class="card-header-icon" v-if="!viewOnly">
                <b-dropdown aria-role="list" position="is-bottom-left">
                    <button class="button is-small is-text" slot="trigger">
                        <b-icon pack="fa" icon="ellipsis-v"></b-icon>
                    </button>
                    <b-dropdown-item aria-role="listitem">Xóa</b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">Báo cáo</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
        <!--Body        -->
        <div class="card-body">
            <div v-if="!minimize && value.action_object">
                <Group v-if="kind === 'group'" :value="action_object" :minimize="minimize" :slug="slug"/>
                <Point v-else-if="['point', 'destination'].includes(kind)" :value="action_object" :minimize="minimize"
                       :slug="slug"/>
                <Post v-else-if="kind === 'post'" :value="action_object" :minimize="minimize" :slug="slug"/>
                <Trip v-else-if="kind === 'trip'" :value="action_object" :minimize="minimize" :slug="slug"/>
                <User v-else-if="kind === 'user'" :value="action_object" :minimize="minimize" :slug="slug"/>
                <div class="card-content" v-else-if="kind === 'step'">
                    <div class="card-border">
                        <div class="card-content">
                            <Step :value="action_object" :minimize="minimize" :slug="slug"/>
                        </div>
                    </div>
                </div>
                <Undefined v-else :value="action_object" :minimize="minimize" :slug="slug"/>
            </div>
            <div class="card-content" v-else-if="action_object">
                <div class="card-inside">
                    <div class="media">
                        <div class="media-content">
                            <p>{{action_object.title}}</p>
                        </div>
                        <div class="media-right">
                            <div class="image is-96x96">
                                <img v-if="action_object.photos && action_object.photos.length"
                                     :src="action_object.photos[0].thumbnails['thumb_200_200']" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PointActivity style="padding-top: 0;" v-if="!minimize && value.location" :show-map="false"
                           :value="location" :minimize="minimize" :slug="slug"/>
            <div class="card-content action" v-if="action_object">
                <div class="level is-mobile">
                    <div class="level-left">
                        <div class="buttons">
                            <div class="button is-rounded is-small walk" v-if="action_object.post_kind === 'ask'">
                                <b-icon pack="far" size="is-small" icon="comment-alt-dots"></b-icon>
                                <span>Trả lời John</span>
                            </div>
                            <div class="button is-rounded is-small walk"
                                 @click="vote"
                                 v-bind:class="{'is-success': activity.is_voted, 'is-loading': loading.vote}">
                                <b-icon pack="fa" size="is-small" icon="shoe-prints"></b-icon>
                                <span>{{activity.vote_count}}</span>
                            </div>
                            <div class="button is-rounded is-small walk" v-bind:class="{'is-loading': loading.comment}">
                                <b-icon pack="fa" size="is-small" icon="comment"></b-icon>
                                <span>{{activity.comment_count}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="level-right"></div>
                </div>
            </div>
        </div>
        <!--Footer        -->
        <div v-if="!minimize" class="card-footer">
            <div class="wrap">
                <div class="comments" v-if="cRes.edges.length">
                    <div class="media" v-for="c in cRes.edges" :key="c.id">
                        <div class="media-left">
                            <Avatar :value="c.user.profile ? c.user.profile.media: c.user.avatar" :is-rounded="true"
                                    class="is-32x32"></Avatar>
                        </div>
                        <div class="media-content">
                            <div class="card-title is-rounded">
                                <strong>
                                    <n-link :to="`/member/${c.user.username}`">{{convertName(c.user)}}</n-link>
                                </strong>
                                <span>{{c.content}}</span>
                            </div>
                        </div>
                        <small>{{timeSince(c.created)}}</small>
                    </div>
                </div>
                <div class="comments-input" v-if="currentUser">
                    <div class="media">
                        <div class="media-left">
                            <Avatar :value="currentUser.profile ? currentUser.profile.media : null" class="is-32x32"
                                    :is-rounded="true"></Avatar>
                        </div>
                        <div class="media-content">
                            <b-input class="input-control is-fullwidth" placeholder="Viết bình luận..."
                                     v-model="comment" @keypress.enter.native="pushComment"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Step from "../trip/Step";
    import Group from "./Group";
    import Point from "./Point";
    import Post from "./Post";
    import Trip from "./Trip";
    import User from "./User";
    import Undefined from "./Undefined";

    export default {
        name: "ACard",
        components: {
            PointActivity: Point,
            Step,
            Group,
            Point,
            Post,
            Trip,
            User,
            Undefined
        },
        props: {
            value: {},
            minimize: {
                type: Boolean,
                default: false
            },
            viewOnly: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                activity: this.value,
                cRes: {
                    edges: this.value.comments ? this.value.comments.reverse() : []
                },
                comment: null,
                loading: {
                    vote: false,
                    comment: false
                }
            }
        },
        computed: {
            actor() {
                let data = {
                    title: null,
                    photo: null,
                    slug: null
                }
                let a = this.value.actor
                if (a) {
                    if (a.model_name === 'user') {
                        data = {
                            title: this.convertName(a.data),
                            slug: `/member/${a.data.username}`,
                            photo: a.data.profile ? a.data.profile.media : null
                        }
                    }
                }
                return data
            },
            target() {
                let data = {
                    title: null,
                    slug: null
                }
                let t = this.value.target
                if (t) {
                    if (t.model_name === 'user') {
                        data = {
                            title: this.convertName(t.data),
                            slug: `/member/${t.data.username}`,
                            photos: t.data.avatar ? [t.data.avatar] : null
                        }
                    } else if (t.model_name === 'destination') {
                        data = {
                            title: t.data.title,
                            slug: `/${t.data.slug}`,
                            photos: t.data.photos
                        }
                    } else if (t.model_name === 'group') {
                        data = {
                            title: t.data.title,
                            slug: `/group/${t.data.slug}`,
                            photos: t.data.photos
                        }
                    } else if (t['model_name'] === 'trip') {
                        data = {
                            title: t.data.title,
                            slug: `/trip/${t.data.slug}`,
                            photos: t.data.photos
                        }
                    } else if (t['model_name'] === 'action') {
                        data = {
                            title: t.data.title,
                            slug: `/activity/${t.data.id}`,
                            photos: []
                        }
                    }
                }
                return data
            },
            action_object() {
                return this.value.action_object ? this.value.action_object.data : null
            },
            location() {
                return this.value.location ? this.value.location.data : null
            },
            title() {
                return `${this.value.verb} nội dung trong ${this.target ? this.target.title : ''}`
            },
            slug() {
                switch (this.value.action_object.model_name) {
                    case 'point':
                        return this.action_object.destination ? `/${this.action_object.destination.slug}/${this.action_object.point_kind}` : '/'
                    case 'trip':
                        return '/trip'
                    case 'group':
                        return '/group'
                    default:
                        return ''
                }
            },
            kind() {
                return this.value.action_object ? this.value.action_object.model_name : ''
            }
        },
        methods: {
            async pushComment() {
                this.loading.comment = true
                let res = await this.$api.comment.post({
                    content: this.comment,
                    action: this.value.id,
                    user: this.currentUser.id
                })
                this.comment = null
                res.data.user = this.currentUser
                this.cRes.edges.push(res.data)
                this.loading.comment = false
            },
            async vote() {
                this.loading.vote = true
                let res = await this.$api.activity.vote(this.value.id)
                this.activity.is_voted = res.data.result
                if (res.data.result) {
                    this.activity.vote_count++
                } else {
                    this.activity.vote_count--
                }
                this.loading.vote = false
            }
        }
    }
</script>
<style lang="scss">
    .card-body {
        .card-content {
            padding-top: 0;

            .card-content {
                padding-top: 1rem;
            }
        }
    }
</style>