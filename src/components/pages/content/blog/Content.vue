<template lang="pug">
    include ../../../../tools/mixins.pug

    div
        overlay-component
        header-component(
            :color="'blue'"
            @openPopup="openPopup('recall')"
        )
        blog-component(
            :articles="content.articles"
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
    import Blog from '../../../sections/Blog.vue'
    import Socials from '../../../sections/Socials.vue'
    import Footer from '../../../sections/Footer.vue'

    import PopupRecall from '../../../sections/popups/PopupRecall.vue'
    import {popupParentLogic} from "../../../../mixins/blanks/popup/popupParentLogic";
    import Overlay from "../../../blanks/Overlay.vue";
    export default {
        mixins: [popupParentLogic],
        props:['content'],
        data() {
            return {

            };
        },
        created(){

        },
        destroyed(){

        },
        mounted(){
            console.log(this.content)
        },
        methods: {

        },
        components: {
            'header-component': Header,
            'blog-component': Blog,
            'socials-component': Socials,
            'footer-component': Footer,
            'popup-recall-component': PopupRecall,
            'overlay-component': Overlay,
        }
    };
</script>