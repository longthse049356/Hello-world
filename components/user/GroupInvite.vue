<template>
    <div>
        <b-field>
            <b-input placeholder="Mời tham gia"></b-input>
        </b-field>
        <b-field label="Gợi ý"></b-field>
        <u-card v-for="(u, i) in users" :key="i" :value="u" layout="media" image-size="is-32x32"></u-card>
    </div>
</template>

<script>
    export default {
        name: "GroupInvite",
        data() {
            return {
                users: []
            }
        },
        methods: {
            fetch() {
                this.$graph['user_users']({param: {limit:5,page:1,search:""}}).then(res => {
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