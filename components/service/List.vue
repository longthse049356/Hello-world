<template>
    <div>
        <div class="columns is-half-mobile is-multiline">
            <div class="column is-3" v-for="i in data" :key="i.id">
                <s-card :updating="updating" @click.native="active = i" :value="i"></s-card>
            </div>
            <div class="column is-3" v-if="updating">
                <div class="card create" @click="active = form">
                    <div class="card-image">
                        <div class="image empty is-2by1"></div>
                        <b-icon pack="fa" icon="plus"></b-icon>
                    </div>
                </div>
            </div>
            <b-modal :active.sync="isActive" :width="640">
                <Detail v-model="active" :updating="updatingClone" @done="updatingClone = false"></Detail>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import Detail from "./Detail";

    export default {
        name: "SList",
        components: {
            Detail
        },
        props: {
            point: {
                default: 0,
                type: Number
            },
            value: {
                default: () => {
                    return []
                },
                type: Array
            },
            updating: {
                default: false,
                type: Boolean
            }
        },
        data() {
            return {
                data: this.value || [],
                isActive: false,
                active: null,
                form: {},
                updatingClone: this.updating
            }
        },
        watch: {
            active() {
                this.isActive = !!this.active
            },
            isActive() {
                if (!this.isActive) {
                    this.active = null
                }
            },
            updating() {
                this.updatingClone = this.updating
            }
        },
        created() {
            this.form = {
                photos: [],
                service: null,
                point: this.point,
                extra: {},
                max_quantity: 0
            }
        }
    }
</script>

<style scoped>

</style>