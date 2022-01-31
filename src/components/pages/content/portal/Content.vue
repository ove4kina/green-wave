<template lang="pug">
    include ../../../../tools/mixins.pug

    div
        overlay-component
        header-component(
            :color="'blue'"
            @openPopup="openPopup('recall')"
        )
        portal-component(
            :reports="content.reports"
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
    import Portal from '../../../sections/Portal.vue'
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

        },
        methods: {

        },
        components: {
            'header-component': Header,
            'portal-component': Portal,
            'socials-component': Socials,
            'footer-component': Footer,
            'popup-recall-component': PopupRecall,
            'overlay-component': Overlay,
        }
    };
</script>