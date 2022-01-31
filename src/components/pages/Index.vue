<template lang="pug">
    content-component.content(
        :content="content"
        :class="{'hide-page': animationPage.hide, 'hide-page-right': animationPage.right ,'transitioned': animationPage.transitioned}"
    )
</template>

<script>
    import Content from './content/index/Content.vue'
    import {pageTransition} from "../../mixins/animation/pageTransition";
    export default {
        mixins: [pageTransition],
        data() {
            return {};
        },
        title() {
            return this.content.meta.title;
        },
        meta() {
            return this.content.meta.description
        },
        asyncData({store}) {
            let url = 'index';
            return store.dispatch('FETCH_PAGE', {url})
        },
        computed: {
            content() {
                return this.$store.state.pages.index
            }
        },
        components: {
            'content-component': Content
        }
    };
</script>