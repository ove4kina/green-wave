<template lang="pug">

    content-component.content(
        :content="content"
        :class="{'hide-page': animationPage.hide, 'hide-page-right': animationPage.right}"
    )
</template>

<script>

    import Content from './content/article/Content.vue'
    import {pageTransition} from "../../mixins/animation/pageTransition";
    export default {
        mixins: [pageTransition],
        data() {
            return {};
        },
        title() {
            return this.content.article.meta_title;
        },
        meta() {
            return this.content.article.meta_description
        },
        asyncData({store, route: {params: {url}}}) {
            return store.dispatch('FETCH_ARTICLE', {url})
        },
        computed: {
            content() {
                return this.$store.state.articles[this.$route.params.url]
            }
        },
        components: {
            'content-component': Content
        }
    };
</script>