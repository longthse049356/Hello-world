<template>
    <b-taginput
            v-if="multiple"
            class="editable"
            :size="size"
            v-model="data"
            :data="results"
            autocomplete
            :allow-new="allowNew"
            :open-on-focus="openOnFocus"
            :field="field"
            :placeholder="placeholder"
            :before-adding="beforeAdding"
            @add="on_add"
            @input="$emit('input', data)"
            @typing="getSuggestion">
    </b-taginput>
    <b-autocomplete
            v-else
            icon-pack="fa"
            :icon="iconFK"
            :size="size"
            v-model="name"
            :placeholder="placeholder"
            :keep-first="true"
            :open-on-focus="openOnFocus"
            :data="results"
            :field="field"
            @typing="getSuggestion"
            @keyup.enter.native="on_add(name)"
            @select="handle_select">
    </b-autocomplete>
</template>

<script>
    export default {
        name: 'DataSearch',
        props: {
            multiple: {
                type: Boolean,
                default: true
            },
            value: {},
            module: {
                default: 'destination_destinations',
                type: String
            },
            allowNew: {
                type: Boolean,
                default: true
            },
            size: {},
            placeholder: {
                type: String,
                default: 'Anything'
            },
            icon: {
                type: String,
                default: 'tag'
            },
            field: {
                type: String,
                default: 'title'
            }
        },
        data() {
            return {
                iconFK: this.icon,
                results: [],
                isSelectOnly: false,
                data: this.value || [],
                openOnFocus: false,
                name: this.value ? this.value[this.field] : null
            }
        },
        methods: {
            handle_select(option) {
                this.selected = option
                this.$emit('input', option)
            },
            async on_add(e) {

            },
            beforeAdding(tag) {
                let check = this.data.map(x => x.id).indexOf(tag.id)
                return check === -1
            },
            getSuggestion(text) {
                let query = {param: {limit: 6, page: 1, search: text}}
                if (["destination_vehicles"].includes(this.module)) {
                    query = {limit: 6, page: 1, search: text}
                }
                this.$graph[this.module](query).then(res => {
                    this.results = res.data[this.module].edges
                })
            }
        },
        watch: {
            value() {
                if (this.value) {
                    this.name = this.value[this.field]
                    if (this.value.icon) {
                        this.iconFK = this.value.icon
                    }
                }
            }
        }
    }
</script>
