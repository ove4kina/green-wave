<template lang="pug">
    include ../../../../tools/mixins.pug

    div
        overlay-component
        header-component(
            :color="'blue'"
            @openPopup="openPopup('recall')"
        )
        main-pages-component(
            :name="mutableData.program.name"
            :title="mutableData.program.title"
            :scheduleDates="scheduleDates"
            @openPopup="openPopup('order')"
        )
        information-component(
            :title="mutableData.program.recommend_description"
            :skills="mutableData.icons"
            :content="mutableData.program.content"
        )
        teachers-component(
            :authors="mutableData.authors"
        )
        groups-component(
            :schedules="schedules"
            @openPopup="openProgramPopup($event)"
        )
        courses-component(
            :id="mutableData.program.id"
            :features="mutableData.tabs"
            :technicalList="mutableData.program.technical_list"
            @openPopup="openPopup('question')"
        )
        media-component(
            :showGroup="true"
            :content="schedulesGalleries"
        )
        order-component
        other-programs-component(
            :programs="programs"
        )
        news-component(
            :articles="mutableData.articles"
        )
        socials-component
        popup-order-component(
            :active="popups.order.active"
            :date="popups.order.date"
            :title="popups.order.title"
            @send="sendOrder"
            @closePopup="closePopup('order')"
        )
        popup-recall-component(
            :active="popups.recall.active"
            @closePopup="closePopup('recall')"
        )
        popup-question-component(
            :active="popups.question.active"
            @closePopup="closePopup('question')"
        )
        footer-component(
            @openPopup="openPopup('recall')"
        )
</template>

<script>
    import Header from '../../../sections/Header.vue'
    import Information from '../../../pages/content/program/Information.vue'
    import Teachers from "../../../sections/Teachers.vue";
    import Groups from "../../../sections/Groups.vue";
    import Courses from "../../../sections/Courses.vue";
    import News from '../../../sections/News.vue'
    import MainPages from '../../../sections/MainPages.vue'
    import OtherPrograms from '../../../sections/OtherPrograms.vue'
    import Order from '../../../sections/Order.vue'
    import Media from '../../../sections/Media.vue'
    import Socials from '../../../sections/Socials.vue'
    import Footer from '../../../sections/Footer.vue'
    import PopupOrder from "../../../sections/popups/PopupOrder.vue";
    import PopupRecall from '../../../sections/popups/PopupRecall.vue'
    import PopupQuestion from "../../../sections/popups/PopupQuestion.vue";

    import {popupParentLogic} from "../../../../mixins/blanks/popup/popupParentLogic";
    import {schedules} from "../../../../mixins/blanks/tag/schedules";
    import { format,differenceInCalendarDays } from 'date-fns'
    import axios from 'axios'
    import Overlay from "../../../blanks/Overlay.vue";
    export default {
        mixins: [popupParentLogic,schedules],
        props:['content'],
        data() {
            console.log(this.content)
            return {
                mutableData: this.content,
                schedulesGalleries: [],
                programs: this.content.otherProgram,
                scheduleDates: '',
                schedules: []
            };
        },
        created(){

        },
        destroyed(){

        },
        mounted(){
            this.init();
            this.getSchedules();
        },
        computed: {

        },
        methods: {
            getSchedules(){
                let tag = {},
                    flagIn = false;

                this.programs.map((tab)=>{
                    tab.programs.map((program)=>{
                        if(program.schedules.length !== 0){
                            tag = this.calculateProperties(program);
                            if(tag) {
                                if(program.tags.length > 0) {
                                    if(tag.name === program.tags[0].name) {
                                        flagIn = true;
                                    }
                                }
                                if(!flagIn) {
                                    program.tags.unshift(tag);
                                }
                            }
                        }
                    })
                });

                if(this.content.schedules.length !== 0){
                    this.content.schedules.map((schedule, index)=>{
                        let near, days = this.generateTagTime(schedule.date_end);
                        if(index === 0 && days > 0){
                            near = days;
                            this.scheduleDates = `Идет набор в смену с ${format(new Date(schedule.date_start) - 86400000, 'dd.MM.yyyy')} до ${format(new Date(schedule.date_end) - 86400000, 'dd.MM.yyyy')}`
                        }
                        if(days < near && days > 0){
                            near = days;
                            this.scheduleDates = `Идет набор в смену с ${format(new Date(schedule.date_start) - 86400000, 'dd.MM.yyyy')} до ${format(new Date(schedule.date_end) - 86400000, 'dd.MM.yyyy')}`
                        }
                    })
                }
            },
            init() {
                this.schedules = [];
                this.mutableData = this.content;

                let currentDay = new Date();
                this.content.schedules.map((schedule) => {
                    let dateRegisterEnd = new Date(schedule.date_register_end),
                        diffEndRegister = differenceInCalendarDays(
                            dateRegisterEnd,
                            currentDay
                        );
                    this.schedules.push({
                        id: schedule.id,
                        name: schedule.name,
                        comment: schedule.comment,
                        date: {
                            start: format(new Date(schedule.date_start), 'dd.MM.YYY'),
                            end: format(new Date(schedule.date_end), 'dd.MM.YYY')
                        },
                        cost: schedule.price,
                        places: {
                            left: schedule.places_in,
                            total: schedule.places,
                        },
                        disabled: diffEndRegister <= 0
                    });
                });

                this.content.schedulesGalleries.map((gallery) => {
                    let dateStart = new Date(gallery.dateStart),
                        dateEnd = new Date(gallery.dateEnd),
                        photos = [];

                    gallery.photos.map((photo) => {
                        photos.push({
                            src: '/media/gallery/' + photo.id + '/' + photo.src
                        })
                    });

                    this.schedulesGalleries.push({
                        date: format(new Date(dateStart), 'dd.MM.YYY') + ' - ' + format(new Date(dateEnd), 'dd.MM.YYY'),
                        photos: photos
                    });
                })
            },

            openProgramPopup(data) {
                this.popups.order.active = true;
                this.popups.order.date = data.date;
                this.popups.order.id = data.id;
                this.popups.order.title = this.content.program.name;
            },
            sendOrder(data) {
                axios({
                    method: 'post',
                    url: 'http://green-wave-api.burno.io/api/form/order',
                    data: {
                        participants: data.participants,
                        name: data.name,
                        phone: data.phone,
                        email: data.email,
                        type: 'program',
                        id: this.popups.order.id
                    }
                })
                    .then((response) => {

                    }).catch((error) => {

                });
            }
        },
        components: {
            'header-component': Header,
            'teachers-component': Teachers,
            'groups-component': Groups,
            'courses-component': Courses,
            'news-component': News,
            'main-pages-component': MainPages,
            'other-programs-component': OtherPrograms,
            'order-component': Order,
            'media-component': Media,
            'information-component': Information,
            'socials-component': Socials,
            'footer-component': Footer,
            'popup-recall-component': PopupRecall,
            'popup-order-component': PopupOrder,
            'popup-question-component': PopupQuestion,
            'overlay-component': Overlay,
        },
        watch:{
            $route (to, from){
                this.init();
            }
        }
    };
</script>
