<template lang="pug">
    include ../../../../tools/mixins.pug

    div
        overlay-component
        header-component(
            :color="'blue'"
            @openPopup="openPopup('recall')"
        )
        main-pages-component(
            :name="mutableData.camp.name"
            :title="mutableData.camp.title"
            :scheduleDates="scheduleDates"
            @openPopup="openPopup('order')"
        )
        information-component(
            :title="mutableData.camp.recommend_description"
            :skills="mutableData.icons"
            :content="mutableData.camp.content"
        )
        shifts-component(
            :food="mutableData.camp.food_description"
            :placing="mutableData.camp.placing_description"
            :schedules="schedules"
            :title="content.camp.name"
            @openPopup="openShiftPopup($event)"
        )
        program-feature-component(
            :id="mutableData.camp.id"
            :features="mutableData.tabs"
            :technicalList="mutableData.camp.technical_list"
            @openPopup="openPopup('question')"
        )
        teachers-component(
            :authors="mutableData.authors"
        )
        media-component(
            :showGroup="true"
            :content="schedulesGalleries"
        )
        order-component
        other-squads-component(
            :camps="camps"
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
    import Information from '../../../pages/content/camp/Information.vue'
    import Shifts from "../../../sections/Shifts.vue";
    import ProgramFeature from "../../../sections/ProgramFeature.vue";
    import Teachers from "../../../sections/Teachers.vue";
    import Groups from "../../../sections/Groups.vue";
    import Courses from "../../../sections/Courses.vue";
    import News from '../../../sections/News.vue'
    import MainPages from '../../../sections/MainPages.vue'
    import OtherPrograms from '../../../sections/OtherPrograms.vue'
    import OtherSquads from '../../../sections/OtherSquads.vue'
    import Order from '../../../sections/Order.vue'
    import Media from '../../../sections/Media.vue'
    import Footer from '../../../sections/Footer.vue'
    import Socials from '../../../sections/Socials.vue'
    import PopupRecall from '../../../sections/popups/PopupRecall.vue'
    import PopupOrder from "../../../sections/popups/PopupOrder.vue";
    import PopupQuestion from "../../../sections/popups/PopupQuestion.vue";

    import {popupParentLogic} from "../../../../mixins/blanks/popup/popupParentLogic";
    import {endingWord} from '../../../../mixins/frontEnd/endingWord'
    import {schedules} from "../../../../mixins/blanks/tag/schedules";
    import { format,differenceInCalendarDays } from 'date-fns'
    import axios from 'axios'

    import Overlay from "../../../blanks/Overlay.vue";
    export default {
        props:['content'],
        mixins: [endingWord, popupParentLogic, schedules],
        data() {
            return {
                mutableData: this.content,
                camps: this.content.otherCamps,
                scheduleDates: '',
                schedulesGalleries: [],
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
        methods: {
            getSchedules(){
                let tag = {},
                    flagIn = false;

                this.camps.map((camp)=>{
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
                });

                if(this.content.schedules.length !== 0){
                    this.content.schedules.map((schedule, index)=>{
                        let near, days = this.generateTagTime(schedule.date_end);
                        if(index === 0 && days > 0){
                            near = days;
                            this.scheduleDates = `Идет набор в смену с ${format(new Date(schedule.date_start), 'dd.MM.yyyy')} до ${format(new Date(schedule.date_end), 'dd.MM.yyyy')}`
                        }
                        if(days < near && days > 0){
                            near = days;
                            this.scheduleDates = `Идет набор в смену с ${format(new Date(schedule.date_start), 'dd.MM.yyyy')} до ${format(new Date(schedule.date_end), 'dd.MM.yyyy')}`
                        }
                    })
                }
            },
            init() {
                this.mutableData = this.content;
                this.camps = this.content.otherCamps;
                this.scheduleDates = '';
                this.schedulesGalleries = [];
                this.schedules = [];

                let currentDay = new Date();
                this.content.schedules.map((schedule) => {
                    let dateRegisterStart = new Date(schedule.date_register_start),
                        dateRegisterEnd = new Date(schedule.date_register_end),
                        diffRegisterStart = differenceInCalendarDays(
                            currentDay,
                            dateRegisterStart
                        ),
                        diffEndRegister = differenceInCalendarDays(
                            dateRegisterEnd,
                            currentDay
                        );

                    let alert = {
                        text: '',
                        color: ''
                    };
                    if(currentDay >= dateRegisterStart && currentDay <= dateRegisterEnd) {
                        alert = {
                            text: 'Осталось ' + diffEndRegister + ' дн' + this.endWord(diffEndRegister,['','я','ей']) + ' для записи онлайн',
                            color: 'peach'
                        }
                    } else {
                        alert = {
                            text: 'Запись начнется ' + format(dateRegisterStart, 'dd.MM.YYY'),
                            color: 'violet'
                        }
                    }

                    this.schedules.push({
                        id: schedule.id,
                        date: {
                            start: format(new Date(schedule.date_start), 'dd.MM.YYY'),
                            end: format(new Date(schedule.date_end), 'dd.MM.YYY')
                        },
                        cost: schedule.price,
                        places: {
                            left: schedule.places_in,
                            total: schedule.places,
                        },
                        alert: alert,
                        disabled: diffEndRegister <= 0
                    });
                })
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
            openShiftPopup(data) {
                this.popups.order.active = true;
                this.popups.order.date = data.date;
                this.popups.order.id = data.id;
                this.popups.order.title = this.content.camp.name;
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
                        type: 'camp',
                        id: this.popups.order.id
                    }
                })
                    .then((response) => {

                    }).catch((error) => {

                });
            }
        },
        components: {
            'program-feature-component': ProgramFeature,
            'header-component': Header,
            'teachers-component': Teachers,
            'groups-component': Groups,
            'courses-component': Courses,
            'news-component': News,
            'main-pages-component': MainPages,
            'other-programs-component': OtherPrograms,
            'other-squads-component': OtherSquads,
            'order-component': Order,
            'media-component': Media,
            'information-component': Information,
            'shifts-component': Shifts,
            'socials-component': Socials,
            'footer-component': Footer,
            'popup-recall-component': PopupRecall,
            'popup-order-component': PopupOrder,
            'popup-question-component': PopupQuestion,
            'overlay-component': Overlay,
        },
        watch:{
            $route (to, from) {
                this.init();
                this.getSchedules();
            }
        }
    };
</script>
