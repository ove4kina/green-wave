<template lang="pug">
    content-component.content(
        :content="content"
        :class="{'hide-page': animationPage.hide, 'hide-page-right': animationPage.right}"
    )
</template>

<script>
    import Content from './content/page-info/Content.vue'
    import {pageTransition} from "../../mixins/animation/pageTransition";
    export default {
        mixins: [pageTransition],
        data() {
            return {};
        },
        title() {
            return this.content.catalog.meta_title;
        },
        meta() {
            return this.content.catalog.meta_description
        },
        asyncData({store, route: {params: {url}}}) {
            return store.dispatch('FETCH_CATALOG', {url})
        },
        computed: {
            content() {
                return this.$store.state.catalogs[this.$route.params.url]
            }
        },
        components: {
            'content-component': Content
        }
    };
</script>