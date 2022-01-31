<template lang="pug">
    include ../../../../tools/mixins.pug

    div
        overlay-component
        header-component(
            :color="headerColor"
            @openPopup="openPopup('recall')"
        )
        main-component(
            :title="content.main.title"
            :description="content.main.description"
        )
        about-component(
            :subTitle="content.main.subTitle"
            :subDescription="content.main.subDescription"
        )
        disciplines-component
        records-component(
            :cards="closestCampsAndPrograms"
        )
        special-squad-component(
            :camps="camps"
        )
        history-component
        all-programs-component(
            :programs="programs"
        )
        news-component(
            :articles="content.articles"
        )
        socials-component
        popup-order-component(
            :active="popups.order.active"
            @closePopup="closePopup('order')"
        )
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
    import SpecialSquad from '../../../sections/SpecialSquad.vue'
    import AllPrograms from '../../../sections/AllPrograms.vue'
    import Records from '../../../sections/Records.vue'
    import History from '../../../sections/History.vue'
    import Disciplines from "../../../sections/Disciplines.vue";
    import News from '../../../sections/News.vue'
    import Main from '../../../sections/Main.vue'
    import Socials from '../../../sections/Socials.vue'
    import Footer from '../../../sections/Footer.vue'
    import About from '../../../sections/About.vue'
    import PopupRecall from '../../../sections/popups/PopupRecall.vue'
    import PopupOrder from '../../../sections/popups/PopupOrder.vue'

    import {popupParentLogic} from "../../../../mixins/blanks/popup/popupParentLogic";
    import {schedules} from "../../../../mixins/blanks/tag/schedules";

    import Overlay from "../../../blanks/Overlay.vue";

    import { differenceInCalendarDays } from 'date-fns'

    export default {
        props:['content'],
        mixins: [popupParentLogic,schedules],
        data() {
            return {
                headerColor: 'blue',
                camps: this.content.camps,
                programs: this.content.programs,
                closestCampsAndPrograms: this.getClosestCampsAndPrograms()
            };
        },
        mounted(){
            this.getSchedules();
            if(window.innerWidth < 640){
                this.headerColor = 'white'
            }
        },
        methods: {
            getClosestCampsAndPrograms() {
                let currentDate = new Date(),
                    result = [],
                    flagIn = false,
                    dateStart = null;
                this.content.camps.map((camp) => {
                    flagIn = false;
                    camp.schedules.map((schedule) => {
                        let diffInDays = differenceInCalendarDays(new Date(schedule.date_register_end), currentDate);
                        if(diffInDays > 0) {
                            flagIn = true;
                            dateStart = new Date(schedule.date_register_start);
                        }
                    });
                    if(flagIn) {
                        result.push({
                            id: camp.id,
                            // avatar: camp.avatar,
                            avatar: '/public/images/records/2.png',
                            url: '/camp/' + camp.url,
                            name: camp.name,
                            tags: camp.tags,
                            title: camp.title,
                            type: 'camp',
                            dateStart: dateStart
                        })
                    }
                });
                this.content.programs.map((group) => {
                    group.programs.map((program) => {
                        flagIn = false;
                        program.schedules.map((schedule) => {
                            let diffInDays = differenceInCalendarDays(new Date(schedule.date_register_end), currentDate);
                            if(diffInDays > 0) {
                                flagIn = true;
                                dateStart = new Date(schedule.date_register_start);
                            }
                        });
                        if(flagIn) {
                            result.push({
                                id: program.id,
                                // avatar: program.avatar,
                                avatar: '/public/images/records/2.png',
                                url: '/program/' + program.url,
                                name: program.name,
                                tags: program.tags,
                                title: program.title,
                                type: 'program',
                                dateStart: dateStart
                            })
                        }
                    });
                });

                result.sort((a, b) => {
                    if(a.dateStart < b.dateStart) {
                        return -1;
                    }
                    if(a.dateStart > b.dateStart) {
                        return 1;
                    }
                    return 0;
                });

                result.map((object) => {
                    object.tags.map((tag) => {
                        tag.color = 'yellow-bright';
                    })
                });

                return result;
            },
            getSchedules() {
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
                });
                this.programs.map((tab) => {
                    tab.programs.map((program) => {
                        if(program.schedules.length !== 0) {
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
                })
            }
        },
        components: {
            'header-component': Header,
            'main-component': Main,
            'about-component': About,
            'special-squad-component': SpecialSquad,
            'all-programs-component': AllPrograms,
            'records-component': Records,
            'history-component': History,
            'disciplines-component': Disciplines,
            'news-component': News,
            'socials-component': Socials,
            'footer-component': Footer,
            'popup-recall-component': PopupRecall,
            'popup-order-component': PopupOrder,
            'overlay-component': Overlay,
        }
    };
</script>
