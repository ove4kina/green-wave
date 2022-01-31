<template lang="pug">
    content-component.content(
        :class="{'hide-page': animationPage.hide, 'hide-page-right': animationPage.right}"
    )
</template>

<script>
    import Content from './content/parents-info/Content.vue'
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
            let url = 'parents';
            return store.dispatch('FETCH_PAGE', {url})
        },
        computed: {
            content() {
                return this.$store.state.pages.parents
            }
        },
        components: {
            'content-component': Content
        }
    };
</script>