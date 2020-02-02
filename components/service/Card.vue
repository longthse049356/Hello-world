<template>
    <div class="card" v-if="data">
        <div class="card-image">
            <m-thumbnail :value="data.photos" ratio="is-2by1" width="400" height="200"></m-thumbnail>
            <div class="card-content">
                <h4 class="title is-6">{{data.service.title}}</h4>
                <div class="buttons">
                    <div class="button is-small">
                        <b-icon size="is-small" pack="fa" icon="money-bill"></b-icon>
                        <div class="divide"></div>
                        <span>{{data.price || 0}}đ</span>
                    </div>
                    <div class="button is-small">
                        <b-icon size="is-small" pack="fa" icon="users"></b-icon>
                        <div class="divide"></div>
                        <span>{{data.max_quantity || 1}} người</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SCard",
        props: {
            value: {
                default: null,
                type: Object
            }
        },
        data() {
            return {
                data: this.value || null
            }
        }
    }
</script>

<style scoped>

</style>