<template>
    <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
        <b-button type="is-text" slot="trigger">
            <b-icon size="is-small" pack="fa" icon="envelope-open-text"></b-icon>
        </b-button>
        <b-dropdown-item aria-role="menu-item" :focusable="false" custom>
            <h4 class="title">Thông báo</h4>
            <div class="media v-center" v-for="i in 5" :key="i">
                <div class="media-left">
                    <figure class="image is-32x32">
                        <img src="https://bulma.io/images/placeholders/128x128.png" alt=""/>
                    </figure>
                </div>
                <div class="media-content">
                    <div class="level">
                        <div class="level-left">
                            <div><b>Lâm Hoàng</b></div>
                        </div>
                        <div class="level-right">
                            <a href="/activity/123/" class=""><small>15 giờ trước</small></a>
                        </div>
                    </div>
                    <p>Ăn thịt chó không bạn :D</p>
                </div>
            </div>
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
    export default {
        name: "Minimize"
    }
</script>

<style scoped>

</style>