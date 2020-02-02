<template>
    <b-dropdown position="is-bottom-left" v-if="canAction" aria-role="list" v-model="status">
        <button :class="`button is-primary is-shadow ${exClass}`" slot="trigger" v-bind:class="{'is-primary': text === 'Tham gia'}">
            <span>{{text}}</span>
            <b-icon size="is-small" pack="fas" icon="chevron-down"></b-icon>
        </button>
        <b-dropdown-item aria-role="listitem" v-for="o in options" :key="o.value" :value="o.value">{{o.title}}
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
    export default {
        name: "Join",
        props: {
            group: {
                default: () => {
                    return {}
                },
                type: Object
            },
            exClass: {
                type: String,
                default: 'is-rounded'
            }
        },
        data() {
            return {
                options: [
                    {
                        title: 'Quan tâm',
                        value: 'FOLLOW'
                    },
                    {
                        title: 'Gửi yêu cầu',
                        value: 'REQUEST'
                    },
                    {
                        title: 'Không quan tâm',
                        value: 'IGNORE'
                    }
                ],
                data: this.group ? this.group['is_join'] : null,
                status: this.group && this.group['is_join'] ? this.group['is_join'].status : null
            }
        },
        methods: {
            async handleClick() {
                let res = await this.$api.group.join(this.group.id, {
                    status: this.status
                })
                if (res.data) {
                    this.status = res.data.status
                }
                this.$emit('update', res.data)
            }
        },
        computed: {
            canAction() {
                return this.group === null || this.group && (this.group.is_join === null || ['JOINED', 'INVITE'].includes(this.group.is_join.status) || this.isGroupManager(this.group))
            },
            text() {
                if (this.status === 'FOLLOW') {
                    return "Bỏ quan tâm"
                }
                if (this.status === 'REQUEST') {
                    return "Đang chờ duyệt"
                }
                if (this.status === 'JOINED') {
                    return "Đã tham gia"
                } else {
                    return 'Tham gia'
                }
            }
        },
        watch: {
            status() {
                this.handleClick()
            }
        }
    }
</script>

<style scoped>

</style>