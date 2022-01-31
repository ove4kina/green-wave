<template lang="pug">
    include ../../tools/mixins.pug
    +b.SECTION.groups(
        id="schedules"
    )
        +e.container.container
            +e.H2.title.title--standart Ближайшие смены
            //+e.INPUT-DATEPICKER-COMPONENT.datepicker
            +e.text.text(
                v-if="schedules.length === 0"
            )
                p Пока что нет запланированных мероприятий. Вернитесь к списку #[router-link(to="/camps").no-border всех смен], чтобы ознакомиться с текущими наборами в группы.
            +e.UL.list(
                v-else
            )
                +e.GROUP-SHIFTS-COMPONENT.item(
                    v-for="(schedule, index) in schedules"
                    :content="schedule"
                    :disabled="schedule.disabled"
                    :key="index"
                    @openOrderPopup="openOrderPopup(schedule.id,schedule.date.start,schedule.date.end)"
                )

            +e.features
                +e.feature.feature__
                    +e.H4.title Питание
                    +e.P.text {{ food }}
                    +e.A.link.link--medium.--blue(href="#")
                        span Узнать больше
                +e.feature.feature__
                    +e.H4.title Размещение
                    +e.P.text {{ placing }}
                    +e.A.link.link--medium.--blue(href="#")
                        span Узнать больше

</template>

<script>
    import InputDatepicker from '../blanks/InputDatepicker.vue'
    import GroupShiftsCard from "../blanks/GroupShiftsCard.vue";

    export default {
        props: ['food','placing','schedules', 'title'],
        data() {
            return {
            }
        },
        methods: {
            openOrderPopup(id, startDate, endDate){
                this.$emit('openPopup', {id: id, date: `${startDate} - ${endDate}`});
            },
        },
        components:{
            'input-datepicker-component': InputDatepicker,
            'group-shifts-component': GroupShiftsCard
        }
    }
</script>