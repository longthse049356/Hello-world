<template>
    <div v-if="value">
        <div class="columns" v-bind:class="{'is-multiline' : true}">
            <div v-if="hasCreate" :class="`column ${column}`">
                <div class="card create">
                    <div class="card-image">
                        <n-link to="/trip/create" class="image is-3by2 empty"></n-link>
                        <b-icon pack="fa" icon="plus"></b-icon>
                    </div>
                </div>
            </div>
            <div v-for="item in data.edges" :key="item.id" :class="`column ${column}`">
                <t-card :value="item" :layout="layout" :media-size="mediaSize"></t-card>
            </div>
        </div>
        <b-pagination
                :total="data.total_count"
                :current.sync="data.page"
                icon-pack="fa"
                :per-page="tempQ.param ? tempQ.param.limit: tempQ.limit"
                @change="handleChange"
                icon-prev="caret-left"
                icon-next="caret-right"
                aria-next-label="Trang tiếp theo"
                aria-previous-label="Trang trước đó"
                aria-page-label="Trang"
                aria-current-label="Trang hiện tại">
        </b-pagination>
    </div>
</template>

<script>
    export default {
        name: "TList",
        props: {
            label: {
                default: 'recommendation_trips',
                type: String
            },
            value: {},
            column: {
                default: 'is-3'
            },
            hasCreate: {
                default: false,
                type: Boolean
            },
            layout: {
                type: String,
                default: 'default'
            },
            q: {
                default: () => {
                    return {
                        page: 1,
                        limit: 9,
                        search: ''
                    }
                }
            },
            mediaSize: {
                default: 'is-3by2',
                type: String
            }
        },
        data() {
            return {
                tempQ: this.q,
                data: this.value,
                loading: false
            }
        },
        methods: {
            async fetch() {
                this.loading = true
                let res = await this.$graph[this.label](this.tempQ)
                this.data = res['data'][this.label]
                this.loading = false
            },
            async handleChange(page) {
                if (this.tempQ.param) {
                    this.tempQ.param.page = page
                } else {
                    this.tempQ.page = page
                }
                await this.fetch()
            }
        }
    }
</script>

<style scoped>

</style>
