<template lang="pug">
    include ../../../../tools/mixins.pug

    div
        overlay-component
        header-component(
            :color="'white'"
            @openPopup="openPopup('recall')"
        )
        all-programs-main-component(
            :programs="programs"
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
    import AllProgramsMain from '../../../sections/AllProgramsMain.vue';
    import ArticlePage from "../../../sections/ArticlePage.vue";
    import Media from "../../../sections/Media.vue";
    import Socials from '../../../sections/Socials.vue';
    import Footer from '../../../sections/Footer.vue';
    import PopupRecall from '../../../sections/popups/PopupRecall.vue'
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
                programs: this.content.programs
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

                this.programs.map((tab)=>{
                    tab.programs.map((program)=>{
                        if(program.schedules.length !== 0) {
                            tag = this.calculateProperties(program);
                            if(tag) {
                                if(program.tags.length > 0) {
                                    if(tag.name === program.tags[0].name) {
                                        flagIn = true;
                                    }
                                }
                                if(!flagIn) {
                                    program.tags.unshift(this.calculateProperties(program));
                                }
                            }
                        }
                    })
                })
            }
        },
        components: {
            'header-component': Header,
            'all-programs-main-component': AllProgramsMain,
            'article-page-component': ArticlePage,
            'media-component': Media,
            'socials-component': Socials,
            'footer-component': Footer,
            'popup-recall-component': PopupRecall,
            'overlay-component': Overlay,
        }
    };
</script>