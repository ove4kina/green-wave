<template lang="pug">
    include ../../../../tools/mixins.pug

    div
        overlay-component
        header-component(
            :color="'blue'"
            @openPopup="openPopup('recall')"
        )
        report-component(
            :report="content.report"
            :gallery="content.gallery"
        )
        records-component(
            :cards="closestCampsAndPrograms"
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
    import Report from '../../../sections/Report.vue'
    import Records from '../../../sections/Records.vue'
    import Socials from '../../../sections/Socials.vue'
    import Footer from '../../../sections/Footer.vue'
    import PopupRecall from '../../../sections/popups/PopupRecall.vue'

    import {popupParentLogic} from "../../../../mixins/blanks/popup/popupParentLogic";
    import {closestCampAndPrograms} from "../../../../mixins/blanks/closestCampAndPrograms";

    import Overlay from "../../../blanks/Overlay.vue";

    export default {
        mixins: [popupParentLogic,closestCampAndPrograms],
        props:['content'],
        data() {
            return {
                closestCampsAndPrograms: this.getClosestCampsAndPrograms(this.content.camps,this.content.programs)
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
            'report-component': Report,
            'records-component': Records,
            'socials-component': Socials,
            'footer-component': Footer,
            'popup-recall-component': PopupRecall,
            'overlay-component': Overlay,
        }
    };
</script>