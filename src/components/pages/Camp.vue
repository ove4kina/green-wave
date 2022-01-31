<template lang="pug">
    content-component.content(
        :content="content"
        :class="{'hide-page': animationPage.hide, 'hide-page-right': animationPage.right}"
    )
</template>

<script>
    import Content from './content/camp/Content.vue'

    import {pageTransition} from "../../mixins/animation/pageTransition";
    export default {
        mixins: [pageTransition],
        data() {
            return {};
        },
        title() {
            return this.content.camp.meta_title;
        },
        meta() {
            return this.content.camp.meta_description
        },
        components: {
            'content-component': Content
        },
        asyncData({store, route: {params: {url}}}) {
            return store.dispatch('FETCH_CAMP', {url})
        },
        computed: {
            content() {
                return this.$store.state.camps[this.$route.params.url]
            }
        },
    };
</script>