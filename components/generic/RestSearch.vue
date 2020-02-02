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
            icon-pack="fa"
            :icon="icon"
            @input="$emit('input', data)"
            @typing="getSuggestion">
        <template slot-scope="props">
            {{ props.option[field] }}
        </template>
    </b-taginput>
    <b-autocomplete
            v-else
            icon-pack="fa"
            :icon="icon"
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
        <template slot-scope="props">
            {{ props.option[field] }}
        </template>
    </b-autocomplete>
</template>

<script>
    import debounce from 'lodash/debounce'

    export default {
        name: 'DataSearch',
        props: {
            multiple: {
                type: Boolean,
                default: true
            },
            value: {},
            module: {
                default: 'address',
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
                results: [],
                isSelectOnly: false,
                data: this.value || [],
                openOnFocus: false,
                name: null
            }
        },
        methods: {
            handle_select(option) {
                this.data = option
                this.$emit('input', option)
            },
            async on_add(e) {

            },
            beforeAdding(tag) {
                let check = this.data.map(x => x.id).indexOf(tag.id)
                return check === -1
            },
            getSuggestion: debounce(function (text) {
                this.$api[this.module].list({search: text}).then(res => {
                    this.results = res.data.results
                })
            }, 800)
        },
        watch: {
            value() {
                if (this.value) {
                    this.name = this.value[this.field]
                    console.log(this.name);
                }
            }
        }
    }
</script>
