<template lang="pug">
    include ../../tools/mixins.pug
    +b.SECTION.article-page
        +e.container.container
            +e.ROUTER-LINK.link.link--return(
                to="/blog"
            )
                span Ко всем новостям
            +e.image
                img(
                    :src="'/media/articles/' + id + '/' + avatar"
                )
            +e.UL.tags-list
                +e.tag.tag--gray Опубликовано {{publishedFormatted}}
                +e.tag.tag--yellow(
                    v-for="tag in tags"
                ) {{ tag.name }}


            +e.H1.title.title--standart {{title}}
            +e.text.text--wide(
                v-html="text"
            )
</template>

<script>
    import { format } from 'date-fns'
    export default {
        props:['text', 'title', 'tags', 'published', 'avatar','id'],
        computed: {
            publishedFormatted: function() {
                return format(new Date(this.published), 'dd.MM.YYY');
            }
        }
    }
</script>