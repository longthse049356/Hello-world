<template>
    <div class="trip-explore">
        <NuxtChild></NuxtChild>
    </div>
</template>

<script>
    export default {
        name: "PageTrip",
        async asyncData(context) {
            await context.store.dispatch('menu/setMenu', [
                {title: "Khám phá", to: `/trip/explore`, click: true, icon: 'compass'},
                {title: "Của tôi", to: `/trip`, click: true, icon: 'user'},
                {title: "Tìm kiếm", to: `/trip/search`, click: true, icon: 'search'}
            ])
            return {}
        },
        mounted() {
            this.toTop()
            this.stickyFoot()
        }
    }
</script>

<style lang="scss">
    .trip-explore {
        .hero.is-fullheight {
            min-height: 80vh;
        }
    }

    .trip-search {
        padding: 1rem 0;

        .field:not(:last-child) {
            margin-bottom: 0;
        }

        .input {
            border: 1px solid #dbdbdb;
        }
    }

    .hero-foot.sticky {
        .trip-search {
            border: 0;
            padding: 0;
        }
    }
</style>