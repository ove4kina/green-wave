<template lang="pug">
    include ../../../../tools/mixins.pug

    div
        overlay-component
        header-component(
            :color="'blue'"
            @openPopup="openPopup('recall')"
        )
        main-info-component(
            :color="'yellow'"
            :title="'Информация для родителей'"
        )
        page-info-component
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
    import MainInfo from "../../../sections/MainInfo.vue";
    import PageInfo from "../../../sections/PageInfo.vue";
    import Socials from '../../../sections/Socials.vue'
    import Footer from '../../../sections/Footer.vue'
    import PopupRecall from '../../../sections/popups/PopupRecall.vue'
    import {popupParentLogic} from "../../../../mixins/blanks/popup/popupParentLogic";
    import Overlay from "../../../blanks/Overlay.vue";
    export default {
        mixins: [popupParentLogic],
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
            'main-info-component': MainInfo,
            'page-info-component': PageInfo,
            'socials-component': Socials,
            'footer-component': Footer,
            'popup-recall-component': PopupRecall,
            'overlay-component': Overlay,
        }
    };
</script>