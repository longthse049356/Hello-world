<template>
    <div class="card posting">
        <div class="card-content">
            <b-field>
                <div class="level">
                    <div class="level-left">
                        <b-field>
                            <b-radio-button v-for="k in Object.keys(kinds)" :key="k" size="is-small"
                                            v-model="form.post_kind" :native-value="k">
                                <b-icon pack="fa" :icon="kinds[k].icon"></b-icon>
                                <span>{{k}}</span>
                            </b-radio-button>
                        </b-field>
                    </div>
                    <div class="level-right">
                        <b-button type="is-text" size="is-small" @click="posting = false">
                            <b-icon pack="fa" icon="times"></b-icon>
                        </b-button>
                    </div>
                </div>
            </b-field>
            <div>
                <div v-if="hasMedia" class="columns is-variable is-2 is-multiline">
                    <div class="column is-3" v-for="media in form.medias" :key="media.id">
                        <div class="image is-1by1">
                            <img class="object-fit" :src="media.path" :alt="media.title">
                        </div>
                    </div>
                    <div class="column" v-bind:class="{'is-3': form.medias.length}">
                        <upload @done="addMedia"></upload>
                    </div>
                </div>
                <b-field>
                    <b-input icon-pack="fa" v-model="form.title" :icon="kinds[form.post_kind].icon"
                             :type="form.post_kind === 'post' ? 'textarea' : 'text'"
                             rows="2"
                             @input="isActive = true" :placeholder="kinds[form.post_kind].placeholder"></b-input>
                </b-field>
                <b-field v-if="enableDes">
                    <b-input v-model="form.content_blog" icon-pack="fa" icon="paragraph" type="textarea"
                             rows="2"
                             placeholder="Nội dung chi tiết"></b-input>
                </b-field>
                <b-field v-if="hasPlace">
                    <r-search icon="map-marker-alt" field="formatted_address" placeholder="Tại địa điểm"
                              :multiple="false"
                              v-model="form.address_id" module="autocomplete"></r-search>
                </b-field>
                <b-field v-if="hasFriends">
                    <r-search icon="users" field="username" placeholder="Đi cùng với" :multiple="true"
                              v-model="form.tagged" module="user"></r-search>
                </b-field>
                <div class="level">
                    <div class="level-left">
                        <div class="buttons">
                            <b-button type="is-text" v-bind:class="{'is-success': hasPlace}" size="is-small"
                                      @click="hasPlace = !hasPlace">
                                <b-icon size="is-small" pack="fa" icon="map-marker-alt"></b-icon>
                            </b-button>
                            <b-button type="is-text" v-bind:class="{'is-success': hasMedia}" size="is-small"
                                      @click="hasMedia = !hasMedia">
                                <b-icon size="is-small" pack="fa" icon="images"></b-icon>
                            </b-button>
                            <b-button type="is-text" v-bind:class="{'is-success': hasFriends}" size="is-small"
                                      @click="hasFriends = !hasFriends">
                                <b-icon size="is-small" pack="fa" icon="user-friends"></b-icon>
                            </b-button>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="buttons">
                            <b-dropdown v-model="form.privacy" aria-role="list" size="is-small">
                                <button class="button is-small" type="button" slot="trigger">
                                    <template v-if="form.privacy === 1">
                                        <b-icon size="is-small" pack="fa" icon="globe-asia"></b-icon>
                                        <span>Công khai</span>
                                    </template>
                                    <template v-else>
                                        <b-icon size="is-small" pack="fa" icon="cogs"></b-icon>
                                        <span>Bạn bè</span>
                                    </template>
                                </button>
                                <b-dropdown-item :value="-1" aria-role="listitem">
                                    <div class="media" style="border-top: 0">
                                        <b-icon size="is-small" pack="fa" class="media-left" icon="globe-asia"></b-icon>
                                        <div class="media-content">
                                            <h3>Công khai</h3>
                                            <small>Everyone can see</small>
                                        </div>
                                    </div>
                                </b-dropdown-item>
                                <b-dropdown-item :value="1" aria-role="listitem">
                                    <div class="media" style="border-top: 0">
                                        <b-icon size="is-small" pack="fa" class="media-left" icon="globe-asia"></b-icon>
                                        <div class="media-content">
                                            <h3>Bí mật</h3>
                                            <small>Everyone can see</small>
                                        </div>
                                    </div>
                                </b-dropdown-item>
                                <b-dropdown-item :value="0" aria-role="listitem">
                                    <div class="media" style="border-top: 0">
                                        <b-icon size="is-small" pack="fa" class="media-left" icon="cogs"></b-icon>
                                        <div class="media-content">
                                            <h3>Bạn bè</h3>
                                            <small>Only friends can see</small>
                                        </div>
                                    </div>
                                </b-dropdown-item>
                            </b-dropdown>
                            <b-button size="is-small" @click="handleSubmit">Đăng</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PostForm",
        props: {
            contentType: {
                type: String,
                default: null
            },
            objectId: {
                type: String,
                default: null
            }
        },
        data() {
            return {
                form: {
                    post_kind: 'post',
                    medias: [],
                    content_blog: null,
                    content_object: {},
                    address_id: null,
                    target_content_type: this.contentType,
                    target_object: this.objectId,
                    tagged: [],
                    privacy: 0
                },
                posting: false,
                kinds: {
                    post: {
                        icon: 'rss',
                        placeholder: 'Bạn đang nghĩ gì!'
                    },
                    ask: {
                        icon: 'question',
                        placeholder: 'Bạn muốn hỏi gì?'
                    },
                    blog: {
                        icon: 'blog',
                        placeholder: 'Bạn muốn viết gì?'
                    },
                    review: {
                        icon: 'feather',
                        placeholder: 'Đánh giá của bạn!'
                    }
                },
                hasMedia: false,
                hasFriends: false,
                hasPlace: false
            }
        },
        computed: {
            enableDes() {
                return this.form.post_kind !== 'post'
            }
        },
        methods: {
            handleSubmit() {
                let data = this.formatData(this.form)
                this.$rest.post('/activity/posts/', data)
                this.$emit('done')
            },
            addMedia(medias) {
                this.form.medias = this.form.medias.concat(medias)
            }
        }
    }
</script>

<style lang="scss">
    .posting {
        .input, .textarea {
            box-shadow: 1px 1px 2px rgba(10, 10, 10, 0.1);
            border: 0;
        }
    }
</style>
