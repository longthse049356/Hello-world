<template>
    <b-input v-if="isUpdating" class="editable" :icon="icon" :type="type" v-model="data"
             @input="$emit('input', data)"
             :rows="rows"
             icon-pack="fas"
             :placeholder="placeholder"/>
    <span v-else-if="data">
        <b-icon v-if="showIcon && icon" size="is-small" pack="fas" :icon="icon"></b-icon>
        <span>{{data}}</span>
    </span>

</template>

<script>
    export default {
        name: "Editable",
        props: {
            isUpdating: Boolean,
            placeholder: {
                default: 'Nhập nội dung'
            },
            value: {},
            type: {
                type: String,
                default: 'input'
            },
            rows: {
                type: Number,
                default: 3
            },
            icon: {
                default: null
            },
            showIcon: {
                default: true,
                type: Boolean
            }
        },
        data() {
            return {
                data: this.value || null
            }
        },
        watch: {
            value() {
                this.data = this.value
            }
        }
    }
</script>

<style lang="scss">
    .editable {
        .textarea,
        .input {
            border: 0;
            box-shadow: unset;
            background: unset;
            padding: 0;
        }
    }

    .title {
        .editable {
            .input {
                font-size: 2rem;
                height: 2em;
                font-weight: bold;
            }

            .icon {
                font-size: 1.75rem;
            }
        }
    }

    .subtitle {
        .input,
        .textarea {
            font-size: 1.25rem;
            font-weight: 400;
            line-height: 1.25;
        }

        .icon {
            font-size: 1.25rem;
        }
    }

    b {
        .input {
            font-weight: bold;
        }
    }

    .is-white {
        .textarea,
        .input {
            color: #FFFFFF;

            &::placeholder {
                color: #DDDDDD;
            }
        }
    }

    .has-icons-left {
        .textarea {
            padding-left: 2.25em;
        }
    }
</style>
