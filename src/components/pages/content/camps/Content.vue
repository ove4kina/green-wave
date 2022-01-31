<template lang="pug">
    include ../../../../tools/mixins.pug

    div
        overlay-component
        header-component(
            :color="'white'"
            @openPopup="openPopup('recall')"
        )
        actual-camps-main-component(
            :camps="camps"
        )
        media-component(
            :showGroup="false"
            :content="media"
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
    import Header from '../../../sections/Header.vue';
    import ActualCampsMain from '../../../sections/ActualCampsMain.vue';
    import ArticlePage from "../../../sections/ArticlePage.vue";
    import Media from "../../../sections/Media.vue";
    import Socials from '../../../sections/Socials.vue';
    import Footer from '../../../sections/Footer.vue';

    import PopupRecall from "../../../sections/popups/PopupRecall.vue";
    import {popupParentLogic} from "../../../../mixins/blanks/popup/popupParentLogic";
    import {schedules} from "../../../../mixins/blanks/tag/schedules";
    import Overlay from "../../../blanks/Overlay.vue";
    export default {
        mixins: [popupParentLogic,schedules],
        props:['content'],
        data() {
            return {
                media: [{
                    date: '',
                    photos: [
                        {
                            src: '/public/images/history/1.jpg'
                        },
                        {
                            src: '/public/images/history/2.jpg'
                        },
                        {
                            src: '/public/images/history/3.jpg'
                        },
                        {
                            src: '/public/images/history/4.jpg'
                        }
                    ]
                }],
                camps: this.content.camps
            };
        },
        created(){

        },
        destroyed(){

        },
        mounted(){
            this.getSchedules();
        },
        methods: {
            getSchedules(){
                let tag = {},
                    flagIn = false;

                this.camps.map((camp) => {
                    if(camp.schedules.length !== 0) {
                        tag = this.calculateProperties(camp);
                        if(tag) {
                            if(camp.tags.length > 0) {
                                if(tag.name === camp.tags[0].name) {
                                    flagIn = true;
                                }
                            }
                            if(!flagIn) {
                                camp.tags.unshift(tag);
                            }
                        }
                    }
                })
            }
        },
        components: {
            'header-component': Header,
            'actual-camps-main-component': ActualCampsMain,
            'article-page-component': ArticlePage,
            'socials-component': Socials,
            'media-component': Media,
            'footer-component': Footer,
            'popup-recall-component': PopupRecall,
            'overlay-component': Overlay,
        }
    };
</script>