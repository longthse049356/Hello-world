<template>
    <div :class="`${layout} is-border`" v-if="value">
        <div v-bind:class="{'card-image': layout === 'card', 'media-left': layout === 'media'}">
            <Avatar :value="avatar" class="is-24x24" :is-rounded="true"></Avatar>
        </div>
        <n-link :to="`/member/${value.username}`" :class="`${layout}-content`">
            <div class="content"><b>{{convertName(value)}}</b></div>
        </n-link>
        <div v-if="action === 'invite'" v-bind:class="{'card-footer': layout === 'card', 'media-right': layout === 'media'}">
            <div v-bind:class="{'card-footer-item': layout === 'card'}">
                <b-button class="is-small">Mời tham gia</b-button>
            </div>
        </div>
        <div v-if="action === 'follow'" v-bind:class="{'card-footer': layout === 'card', 'media-right': layout === 'media'}">
            <div v-bind:class="{'card-footer-item': layout === 'card'}">
                <follow class="is-small" model="user" space="authentication" :object-id="value.id" :is_followed="value.is_followed" :minimize="true"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UCard",
        props: {
            value: {
                default: null,
                type: Object
            },
            layout: {
                default: 'card',
                type: String
            },
            imageSize: {
                default: 'is-4by3',
                type: String
            },
            action: {
                type: String,
                default: 'follow'
            }
        },
        data() {
            return {}
        },
        computed: {
            avatar() {
                if (this.value.profile && this.value.profile.media) {
                    return this.value.profile.media
                }
                return this.value.avatar
            }
        }
    }
</script>

<style scoped>

</style>
