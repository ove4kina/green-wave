<template lang="pug">
    include ../../../../tools/mixins.pug

    div
        overlay-component
        header-component(
            :color="'blue'"
            @openPopup="openPopup('recall')"
        )
        article-page-component(
            :id="content.article.id"
            :avatar="content.article.avatar"
            :text="content.article.content"
            :title="content.article.name"
            :tags="content.article.tags"
            :published="content.article.published_at"
        )
        socials-component
        popup-recall-component(
            :active="popups.recall.active"
            @closePopup="closePopup('recall')"
        )
        footer-component(
            @openPopup="openPopup('recall')"
        )
</template>

<script>

    import Header from '../../../sections/Header.vue'
    import ArticlePage from "../../../sections/ArticlePage.vue";
    import Socials from '../../../sections/Socials.vue'
    import Footer from '../../../sections/Footer.vue'
    import PopupRecall from '../../../sections/popups/PopupRecall.vue'
    import {popupParentLogic} from "../../../../mixins/blanks/popup/popupParentLogic";
    import Overlay from "../../../blanks/Overlay.vue";
    export default {

        mixins: [popupParentLogic],
        props:['content'],
        data() {
            console.log(this.content);
            return {

            };
        },
        created(){

        },
        destroyed(){

        },
        mounted(){
        },
        methods: {

        },
        components: {
            'header-component': Header,
            'article-page-component': ArticlePage,
            'socials-component': Socials,
            'footer-component': Footer,
            'popup-recall-component': PopupRecall,
            'overlay-component': Overlay,
        }
    };
</script>