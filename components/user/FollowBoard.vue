<template>
    <div v-if="currentUser">
        <b-field>
            <b-input placeholder="Quan tâm bạn bè"></b-input>
        </b-field>
        <b-field label="Gợi ý"></b-field>
        <u-card v-for="(u, i) in users" :key="i" :value="u" layout="media" image-size="is-32x32"></u-card>
    </div>
    <div v-else>
        <div class="columns is-multiline is-mobile is-gapless">
            <div class="column is-4" v-for="(u, i) in users" :key="u.id">
                <avatar :value="u.profile ? u.profile.media : u.avatar"></avatar>
            </div>
            <div class="column is-12">
                <div class="button is-fullwidth is-danger">Tham gia cùng chúng tôi</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FollowBoard",
        data() {
            return {
                users: []
            }
        },
        methods: {
            fetch() {
                let q = {param: {limit: 5, page: 1, search: ""}}
                if (this.currentUser === null) {
                    q.param.limit = 9
                }
                this.$graph['user_users'](q).then(res => {
                    this.users = res.data['user_users']['edges']
                })
            }
        },
        created() {
            this.fetch()
        }
    }
</script>

<style scoped>

</style>