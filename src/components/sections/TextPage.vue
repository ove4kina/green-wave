<template lang="pug">
    include ../../tools/mixins.pug
    +b.SECTION.text-page
        +e.container.container
            +e.ROUTER-LINK.link.link--return(
                :to="'/catalog/' + catalog.url"
            )
                span Назад к разделу «{{ catalog.name }}»
            +e.H1.title.title--big {{ item.name }}

            +e.content.text--wide(
                v-html="item.content"
            )

            +e.files(
                v-if="filesFormatted.length > 0"
            )
                +e.H2.title.title--standart Файлы для скачивания
                +e.DOWNLOAD-CARD-COMPONENT.file(
                    v-for="(file, index) in filesFormatted"
                    :content="file"
                    :key="index"
                )
</template>

<script>
    import DownloadCard from "../blanks/DownloadCard.vue";
    export default {
        props:['catalog','item','files'],
        data() {
            return {
                filesFormatted: [
                ],
            }
        },
        mounted() {
            this.files.map((file) => {
                this.filesFormatted.push({
                    title: file.file,
                    file: '/media/catalogs/' + this.catalog.id + '/items/' + this.item.id + '/upload-files/' + file.file,
                    filesize: file.size,
                });
            })
        },
        components: {
            'download-card-component': DownloadCard,
        }
    }
</script>