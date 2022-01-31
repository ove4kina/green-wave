<template lang="pug">
    include ../../tools/mixins.pug
    +b.SECTION.groups(
        :class="{'groups--padding-bottom': schedules.length === 0}"
        id="schedules"
    )
        +e.container.container
            +e.H2.title.title--standart Сборы групп
            <!--            +e.INPUT-DATEPICKER-COMPONENT.datepicker(-->
            <!--                @change="getDateRange"-->
            <!--            )-->
            +e.text.text(
                v-if="schedules.length === 0"
            )
                p Пока что нет запланированных мероприятий. Вернитесь к списку #[router-link(to="/programs").no-border всех программ] и курсов, чтобы ознакомиться с текущими наборами в группы.
            +e.UL.list(
                v-else
            )
                +e.GROUP-CARD-COMPONENT.item(
                    v-for="(group, index) in schedules"
                    :content="group"
                    :disabled="group.disabled"
                    :key="index"
                    @openOrderPopup="openOrderPopup(group.id,group.date.start,group.date.end)"
                )
</template>

<script>

    import InputDatepicker from '../blanks/InputDatepicker.vue'
    import {inputDatepickerParentLogic} from "../../mixins/blanks/input/inputDatepickerParentLogic";
    import GroupCard from "../blanks/GroupCard.vue";
    export default {
        mixins: [inputDatepickerParentLogic],
        props:['schedules'],
        data() {
            return {
                mounted: false
            }
        },
        mounted(){

        },
        methods: {
            openOrderPopup(id, startDate, endDate) {
                this.$emit('openPopup', {id: id, date: `${startDate} - ${endDate}`});
            }
        },
        components:{
            'input-datepicker-component': InputDatepicker,
            'group-card-component': GroupCard,
        }
    }
</script>