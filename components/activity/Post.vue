<template>
    <div class="wrap">
        <div v-if="value.photos && value.photos.length">
            <div v-if="value.photos.length" :class="galleryClass">
                <div v-for="(img, i) in value.photos" :class="`gallery__item gallery__item--${i + 1}`">
                    <img class="gallery__img" :src="img.thumbnails['thumb_400_400']" :alt="img.title">
                </div>
            </div>
        </div>
        <div class="card-content">
            <div :class="`post-item-text ${style}`">
                <div class="question-icon" v-if="value.post_kind === 'ask'">
                    <span class="icon">
                        <i class="fas fa-quote-right fa-lg"></i>
                    </span>
                </div>
                <div class="content text-article" v-bind:class="{'expanded': expanded}">
                    <p :class="hStyle">{{value.title}}</p>
                    <p v-if="value.content_blog">{{value.content_blog}}</p>
                </div>
                <div v-if="(value.content_blog && value.content_blog.length > 160) || (value.title && value.title > 160)" class="more" @click="expanded = !expanded">
                    <div class="button is-text is-fullwidth">{{expanded ? 'Thu gọn': 'Xem thêm'}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Post",
        props: {
            value: {}
        },
        data() {
            return {
                expanded: false
            }
        },
        computed: {
            style() {
                switch (this.value.post_kind) {
                    case "post":
                        return ""
                    case "ask":
                        return "post-item-text-question box"
                    case "blog":
                        return "box"
                    default:
                        return null
                }
            },
            hStyle() {
                switch (this.value.post_kind) {
                    case "ask":
                        return "title is-5"
                    case "blog":
                        return "title is-5"
                    default:
                        return null
                }
            },
            galleryClass() {
                let lu = this.value.photos.length
                if (['full', 'minimize'].includes(this.layout)) {
                    lu = 'full'
                }
                return `gallery layout-${lu}`
            },
        }
    }
</script>

<style lang="scss">
    .post-item-text.box {
        .content {
            max-height: 200px;
            overflow: hidden;

            &.expanded {
                max-height: unset;
            }
        }
    }
</style>