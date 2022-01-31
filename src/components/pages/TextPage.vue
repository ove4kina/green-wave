<template lang="pug">
    content-component.content(
        :content="content"
        :class="{'hide-page': animationPage.hide, 'hide-page-right': animationPage.right}"
    )
</template>

<script>
    import Content from './content/text-page/Content.vue'

    import {pageTransition} from "../../mixins/animation/pageTransition";
    export default {
        mixins: [pageTransition],
        data() {
            return {};
        },
        title() {
            return this.content.item.meta_title;
        },
        meta() {
            return this.content.item.meta_description
        },
        asyncData({store, route: {params: {url, urlItem}}}) {
            return store.dispatch('FETCH_CATALOG_ITEMS', {url, urlItem})
        },
        computed: {
            content() {
                return this.$store.state.catalogItems[this.$route.params.url + '-' + this.$route.params.urlItem]
            }
        },
        components: {
            'content-component': Content
        }
    };
</script>