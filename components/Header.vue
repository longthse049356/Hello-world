<template>
    <header>
        <b-navbar class="is-primary">
            <template slot="brand">
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    <img src="/logo.png" alt="">
                </b-navbar-item>
            </template>
            <template slot="start">
                <b-navbar-item tag="router-link" to="/activity">TREK</b-navbar-item>
                <b-navbar-item tag="router-link" to="/trip">Chuyến đi</b-navbar-item>
                <b-navbar-item>
                    <b-field>
                        <b-input placeholder="#Chuyến đi thú vị..." type="search" expanded></b-input>
                        <p class="control">
                            <b-button class="button">Tìm kiếm</b-button>
                        </p>
                    </b-field>
                </b-navbar-item>
            </template>
            <template slot="end">
                <b-navbar-item tag="div">
                    <b-button type="is-primary">
                        <b-icon pack="fa" icon="plus"></b-icon>
                    </b-button>
                </b-navbar-item>
                <b-navbar-item tag="div">
                    <b-button type="is-primary">
                        <b-icon pack="fab" icon="spotify"></b-icon>
                    </b-button>
                </b-navbar-item>
                <b-navbar-item tag="div">
                    <b-button type="is-primary">
                        <b-icon pack="fa" icon="envelope-open-text"></b-icon>
                    </b-button>
                </b-navbar-item>
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <n-link to="/member/access" class="button is-light">
                            Đăng nhập
                        </n-link>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>