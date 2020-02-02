<template>
    <n-link :to="slug" class="notify" v-bind:class="{'card': !simple}">
        <div v-bind:class="{'card-content': !simple}">
            <div class="media ">
                <div class="media-left">
                    <Avatar :is-rounded="true" class="is-48x48" :value="actor.photo"></Avatar>
                </div>
                <div class="media-content">
                    <div class="card-title">
                        <span class="actor">{{actor.title}}</span>
                        <span>{{activity2String(activity, true)}}</span>
                        <b v-if="target.title">{{target.title}}</b>
                    </div>
                    <span class="time text-small">
                        <small>
                            <b-icon size="is-small" icon="globe-asia" pack="far"></b-icon>
                            <span>{{timeSince(value.created)}} trước</span>
                        </small>
                    </span>
                </div>
            </div>
        </div>
    </n-link>
</template>
<script>
    export default {
        name: "Notify",
        props: {
            value: {},
            simple: {
                default: false,
                type: Boolean
            }
        },
        data() {
            return {
                activity: this.value
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
                    if (a['model_name'] === 'user') {
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
                    if (t['model_name'] === 'user') {
                        data = {
                            title: this.convertName(t.data),
                            slug: `/member/${t.data.username}`,
                            photos: t.data.avatar ? [t.data.avatar] : null
                        }
                    } else if (t['model_name'] === 'destination') {
                        data = {
                            title: t.data.title,
                            slug: `/${t.data.slug}`,
                            photos: t.data.photos
                        }
                    } else if (t['model_name'] === 'group') {
                        data = {
                            title: t.data.title,
                            slug: `/group/${t.data.slug}`,
                            photos: t.data.photos
                        }
                    } else if (t['model_name'] === 'action') {
                        data = {
                            title: t.data.title,
                            slug: `/activity/${t.data.id}`,
                            photos: []
                        }
                    } else if (t['model_name'] === 'trip') {
                        data = {
                            title: t.data.title,
                            slug: `/trip/${t.data.slug}`,
                            photos: t.data.photos
                        }
                    }
                }
                return data
            },
            location() {
                return this.value.location ? this.value.location.data : null
            },
            kind() {
                return this.value.action_object ? this.value.action_object.model_name : ''
            },
            slug() {
                if (
                    ['FOLLOWED', 'VOTED', 'COMMENTED'].includes(this.activity.verb) ||
                    (this.activity['action_object'] && ['step', 'comment'].includes(this.activity['action_object']['model_name']))
                ) {
                    return this.target.slug ? this.target.slug : `/activity/${this.activity.id}`
                }
                return `/activity/${this.activity.id}`
            }
        },
        methods: {}
    }
</script>
<style lang="scss">
    .card.notify {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        cursor: pointer;
    }
</style>
