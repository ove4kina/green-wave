<template lang="pug">
    include ../../../../tools/mixins.pug
    div
        overlay-component
        header-component(
            :color="headerColor"
            @openPopup="openPopup('recall')"
        )
        main-info-component(
            :color="mainColor"
            :title="content.catalog.name"
        )
        page-info-component(
            :catalog="content.catalog"
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

<script
>
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
        props:['content'],
        data() {
            return {

            };
        },
        created(){

        },
        destroyed(){

        },
        computed: {
            headerColor: function () {
                if(this.content.catalog.url === 'parents'){
                    return 'blue';
                } else if(this.content.catalog.url === 'about' || this.content.catalog.url === 'teachers') {
                    return 'white';
                } else {
                    return 'blue';
                }
            },
            mainColor: function () {
                if(this.content.catalog.url === 'parents'){
                    return 'yellow';
                } else if(this.content.catalog.url === 'about'){
                    return 'green';
                } else if(this.content.catalog.url === 'teachers'){
                    return 'violet';
                }
            }
        },
        mounted(){
            console.log(this.content)
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