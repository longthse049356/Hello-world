<template>
    <div class="avatars" v-if="group.members && group.members.length">
        <div class="elm">
            <div class="image is-48x48">
                <img src="https://api.adorable.io/avatars/91/abott@adorable.png"
                     alt="" class="is-rounded">
            </div>
            <div class="image is-48x48">
                <img src="https://api.adorable.io/avatars/91/abott@adorable.png"
                     alt="" class="is-rounded">
            </div>
        </div>
        <div class="elm">
            <b v-if="convertName(group.members[0])">{{convertName(group.members[0], 'last_name')}}</b>
            <span v-if="group.members[1]">, </span>
            <b v-if="group.members[1]">{{convertName(group.members[1], 'last_name')}}</b>
            <span>và hơn <b>{{group["total_member"] - 2}} người</b></span>
            <span> khác đang tham gia</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "QuickMember",
        props: {
            group: {}
        }
    }
</script>

<style scoped>

</style>