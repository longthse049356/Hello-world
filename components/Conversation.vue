<template>
    <div style="display: flex">
        <transition name="fade" mode="out-in">
            <ChatBoard v-if="active" :group="active" @close="active=null"></ChatBoard>
        </transition>
        <div class="menu">
            <ul class="menu-list">
                <li v-for="(g, i) in response.edges" :key="g.id" class="is-clickable">
                    <b-tooltip :label="g.name" position="is-left">
                        <div v-if="g.present_users && g.present_users.length" @click="active = g">
                            <avatar v-for="u in g.present_users" :key="u.id" :is-rounded="true"
                                    :value="u.profile ? u.profile.media : null"></avatar>
                        </div>
                        <div v-else class="image" @click="active = g">
                            <img class="is-rounded" src="/avatar.jpg" alt="">
                        </div>
                    </b-tooltip>
                </li>
                <li class="is-clickable" @click="active = {}">
                    <div class="image has-icon">
                        <b-icon pack="far" icon="comment-alt-plus" size="is-medium"></b-icon>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import ChatBoard from "./ChatBoard";

    export default {
        components: {
            ChatBoard
        },
        name: "Conversation",
        data() {
            return {
                active: null,
                response: {
                    edges: []
                }
            }
        },
        methods: {
            async fetch() {
                let response = await this.$graph['group_chats']({param: {limit: 10, page: 1, search: ""}})
                this.response = response['data']['group_chats']
            }
        },
        created() {
            this.fetch()
        }
    }
</script>

<style scoped>

</style>