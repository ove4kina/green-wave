<template lang="pug">
    content-component.content(
        :content="content"
        :class="{'hide-page': animationPage.hide, 'hide-page-right': animationPage.right}"
    )
</template>

<script>
    import Content from './content/report/Content.vue'

    import {pageTransition} from "../../mixins/animation/pageTransition";

    export default {
        mixins: [pageTransition],
        data() {
            return {};
        },
        title() {
            return this.content.report.meta_title;
        },
        meta() {
            return this.content.report.meta_description
        },
        asyncData({store, route: {params: {url}}}) {
            return store.dispatch('FETCH_REPORT', {url})
        },
        computed: {
            content() {
                return this.$store.state.reports[this.$route.params.url]
            }
        },
        components: {
            'content-component': Content
        }
    };
</script>