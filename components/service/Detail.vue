<template>
    <div class="card">
        <div class="card-content">
            <div v-if="!updating" class="gallery" v-bind:style="{'--content-width': `620px`, '--columns' : 4}">
                <div v-for="i in data.photos" :key="i.id" :class="`gallery__item gallery__item--${i}`">
                    <img class="gallery__img" :src="i.path" :alt="i.title">
                </div>
            </div>
            <div v-if="updating">
                <Browser :max="4" v-model="data.photos" :col="5"></Browser>
                <b-field>
                    <d-search module="destination_services" v-model="data.service" :multiple="false"></d-search>
                </b-field>
                <b-field>
                    <div class="columns">
                        <div class="column">
                            <b-input icon-pack="fa" icon="money-bill" v-model="data.price"></b-input>
                        </div>
                        <div class="column">
                            <b-input icon-pack="fa" icon="users" v-model="data.max_quantity"></b-input>
                        </div>
                    </div>
                </b-field>
                <b-field>
                    <div class="button is-primary" @click="handleSave()">Lưu</div>
                </b-field>
            </div>
        </div>
    </div>
</template>

<script>
    import Browser from "../media/Browser";

    export default {
        name: "Detail",
        components: {
            Browser
        },
        props: {
            value: {},
            updating: {
                default: false,
                type: Boolean
            }
        },
        data() {
            return {
                data: this.value,
                dropFiles: []
            }
        },
        methods: {
            async handleSave() {
                let data = {}
                Object.keys(this.data).forEach(i => {
                    if (Array.isArray(this.data[i])) {
                        data[i] = this.data[i].map(x => x.id)
                    } else if (typeof this.data[i] === 'object' && this.data[i].id) {
                        data[i] = this.data[i].id
                    } else {
                        data[i] = this.data[i]
                    }
                })
                console.log(data);
                if (data.id) {
                    await this.$rest.put(`/destination/point-services/${data.id}/`, data)
                } else {
                    await this.$rest.post('/destination/point-services/', data)
                }
                this.$emit('done')
            }
        }
    }
</script>

<style scoped>

</style>