<template>
    <div class="columns is-multiline">
        <div class="column is-10" v-if="photos.length">
            <b-carousel-list v-model="slide" :data="photos" :items-to-show="5" icon-pack="fa" icon-prev="chevron-left"
                             icon-next="chevron-right">
                <template slot="item" slot-scope="props">
                    <div class="card has-delete is-clickable">
                        <div class="card-image">
                            <div class="image is-1by1">
                                <img class="object-fit" :src="props.list.path" alt="">
                            </div>
                        </div>
                        <div class="delete" @click="deSelect(props.list)"></div>
                    </div>
                </template>
            </b-carousel-list>
        </div>
        <div class="column" v-bind:class="{'is-2': photos.length}">
            <div class="has-select">
                <b-upload v-bind:class="{'is-square': photos.length}" style="padding: 0.75rem 0" v-model="files" drag-drop @input="handleInput"
                          multiple>
                    <div class="v-center has-text-centered" style="width: 100%;height: 100%">
                        <b-icon icon="upload" size="is-large" pack="fa" style="margin: 0 auto"></b-icon>
                    </div>
                </b-upload>
                <div class="button is-absolute" @click="isOpen = !isOpen">
                    <b-icon pack="fa" icon="grip-horizontal"></b-icon>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="column is-12" v-if="media && isOpen">
                <div class="columns">
                    <div class="column" v-for="p in media.edges" :key="p.id">
                        <div class="card is-clickable" @click="handleSelect(p)">
                            <div class="card-image">
                                <div class="image is-1by1">
                                    <img class="object-fit" :src="p.path" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="level">
                    <div class="level-left">
                        <b-input placeholder="Tìm kiếm" v-model="search"></b-input>
                    </div>
                    <div class="level-right">
                        <b-pagination
                                :total="media.total_count"
                                :current.sync="page"
                                :simple="true"
                                :rounded="false"
                                :per-page="max"
                                icon-pack="far"
                                icon-prev="chevron-left"
                                icon-next="chevron-right"
                                aria-next-label="Next page"
                                aria-previous-label="Previous page"
                                aria-page-label="Page"
                                aria-current-label="Current page">
                        </b-pagination>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Browser",
        props: {
            max: {
                default: 3,
                type: Number
            },
            value: {
                type: Array,
                default: () => {
                    return []
                }
            },
            col: {
                default: 3,
                type: Number
            }
        },
        data() {
            return {
                search: "",
                slide: 0,
                files: [],
                photos: this.value || [],
                media: null,
                page: 1,
                isOpen: false
            }
        },
        methods: {
            async fetch() {
                let res = await this.$graph['media_medias']({
                    param: {
                        limit: this.max,
                        page: this.page,
                        search: this.search,
                        module: 'USER',
                        username: 'lam'
                    }
                })
                this.media = res['data']['media_medias']
            },
            handleSelect(image) {
                let index = this.isSelected(image)
                if (index === -1) {
                    this.photos.unshift(image)
                } else {
                    this.photos.splice(index, 1)
                }
            },
            deSelect(image) {
                let index = this.isSelected(image)
                if (index !== -1) {
                    this.photos.splice(index, 1)
                }
            },
            isSelected(image) {
                return this.photos.map(x => x.id).indexOf(image.id)
            },
            async handleInput(files) {
                for (let i = 0; i < files.length; i++) {
                    if (files[i]) {
                        let formData = new FormData()
                        formData.append('path', files[i])
                        formData.append('title', files[i].name)
                        let res = await this.$rest.post('/media/medias/', formData)
                        this.handleSelect(res.data)
                    }
                }
                this.fetch()
            },
        },
        watch: {
            photos() {
                this.$emit('input', this.photos)
                this.slide = 0
            },
            page() {
                this.fetch()
            },
            search() {
                this.fetch()
            }
        },
        computed: {
            hasNext() {
                if (this.media) {
                    return this.media.page * this.media.limit < this.media.total_count
                }
                return false
            },
            hasPrevious() {
                return this.media ? this.media.page > 1 : false
            }
        },
        mounted() {
            this.fetch()
        }
    }
</script>

<style lang="scss">
    .has-select {
        height: 100%;
        position: relative;

        .is-absolute {
            bottom: 1.25rem;
            right: 0.5rem;
        }
    }
</style>