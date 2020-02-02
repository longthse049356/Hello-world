<template>
    <b-upload drag-drop @input="handleInput" :multiple="isMultiple">
        <section class="section v-center has-text-centered" style="width: 100%;height: 100%">
            <b-icon icon="upload" size="is-large" pack="fa" style="margin: 0 auto"></b-icon>
        </section>
    </b-upload>
</template>

<script>
    export default {
        name: "Upload",
        props: {
            isMultiple: {
                default: true,
                type: Boolean
            }
        },
        methods: {
            async handleInput(files) {
                let out = []
                if (!this.isMultiple) {
                    let res = await this.handleUpload(files)
                    out.push(res.data)
                } else {
                    for (let i = 0; i < files.length; i++) {
                        if (files[i]) {
                            let res = await this.handleUpload(files[i])
                            out.push(res.data)
                        }

                    }
                }
                this.$emit("done", out)
            },
            async handleUpload(file) {
                let formData = new FormData()
                formData.append('path', file)
                formData.append('title', file.name)
                return await this.$rest.post('/media/medias/', formData)
            }
        }
    }
</script>

<style scoped>

</style>