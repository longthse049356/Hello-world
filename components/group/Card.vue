<template>
    <div v-bind:class="{'card trip': layout==='card', 'media' : layout === 'media'}">
        <div v-bind:class="{'card-image': layout==='card', 'media-left' : layout === 'media'}">
            <figure :class="`image ${imageSize} bottom-05`">
                <img v-if="value.banner" :src="getIMGSize(value.banner, imgPath)" alt="">
            </figure>
        </div>
        <div v-bind:class="{'card-content': layout==='card', 'media-content' : layout === 'media'}">
            <div class="bottom-05">
                <h4 class="is-bold">
                    <n-link :to="`/group/${value.slug ? value.slug : value.id}`">{{value.title}}</n-link>
                </h4>
            </div>
            <div class="bottom-05" v-if="showMember">
                <i class="fas fa-user-friends has-margin-right-2"></i> {{value.total_member}} thành viên
            </div>
            <div v-if="layout === 'media'" class="friends-gr text-small"><b>Hoàng Anh</b>, <b>Vũ Thiện</b>
                cũng trong nhóm
            </div>
            <div v-if="canJoin && layout === 'card'" class="button is-small is-fullwidth button-primary-border">
                <span>Tham gia</span>
                <b-icon size="is-small" icon="chevron-circle-right" pack="fas"></b-icon>
            </div>
        </div>
        <div class="media-right" v-if="canJoin && layout === 'media'">
            <div class="button is-fullwidth is-small button-primary-border">
                <b-icon size="is-mall" icon="plus" pack="fas"></b-icon>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GCard",
        props: {
            value: {},
            imgPath: {
                default: '200_200',
                type: String
            },
            layout: {
                default: 'card',
                type: String
            },
            imageSize: {
                default: 'is-1by1',
                type: String
            },
            canJoin: {
                default: true,
                type: Boolean
            },
            showMember: {
                default: true,
                type: Boolean
            },
        }
    }
</script>

<style scoped>

</style>
