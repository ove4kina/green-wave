<template lang="pug">
    content-component.content(
        :content="content"
        :class="{'hide-page': animationPage.hide, 'hide-page-right': animationPage.right}"
    )
</template>

<script>

    import Content from './content/program/Content.vue'

    import {pageTransition} from "../../mixins/animation/pageTransition";
    export default {
        mixins: [pageTransition],
        data() {
            return {};
        },
        title() {
            return this.content.program.meta_title;
        },
        meta() {
            return this.content.program.meta_description
        },
        components: {
            'content-component': Content
        },
        asyncData({store, route: {params: {url}}}) {
            return store.dispatch('FETCH_PROGRAM', {url})
        },
        computed: {
            content() {
                return this.$store.state.programs[this.$route.params.url]
            }
        },
    };
</script>