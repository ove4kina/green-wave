<template lang="pug">
    include ../../tools/mixins.pug

    +b.input--datepicker(
        v-on:click.stop="true===true"
    )
        +e.INPUT.value(
            placeholder="Выберите даты"
            v-on:focus="showDatepicker"
            :value="datepicker.value"
            ref="input"
        )
        +e.DATE-PICKER.datepicker(
            :class="{'active': datepicker.active}"
            :lang="datepicker.lang"
            range
            inline
            @change="changeValue"
            v-if="datepicker.mount"
        )
</template>

<script>
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import {onEscHandler} from "../../mixins/frontEnd/onEscHandler";

    export default {
        mixins:[onEscHandler],
        components: { DatePicker },
        data() {
            return {
                datepicker: {
                    active: false,
                    value: null,
                    mount: false,
                    lang: {
                        formatLocale: {
                            months: ['Январь', 'Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
                            monthsShort: ['Янв','Фев','Март','Апр','Май','Июнь','Июль','Авг','Сен','Окт','Нояб','Дек'],
                            weekdays: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
                            weekdaysShort: ['Вос','Пон','Вт','Ср','Чет','Пят','Суб'],
                            weekdaysMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
                            firstDayOfWeek: 1,
                        }
                    }
                }
            }
        },
        mounted(){
            this.datepicker.mount = true
        },
        methods: {
            eventOnEsc(e){
                this.onEscHandler(e,this.closeDatepicker);
            },
            showDatepicker(){
                this.datepicker.active = true;
                document.addEventListener('click',this.closeDatepicker);
                document.addEventListener('keydown',this.eventOnEsc)
            },
            closeDatepicker(){
                this.datepicker.active = false;
                this.$refs.input.blur();
                document.removeEventListener('click',this.closeDatepicker);
                document.removeEventListener('keydown',this.eventOnEsc)
            },
            changeValue(value){
                this.$emit('change', {start: this.formatDate(value[0]), end: this.formatDate(value[1])});
                this.datepicker.value = `${this.formatDate(value[0])} - ${this.formatDate(value[1])}`;
                this.closeDatepicker();
            },
            formatDate(date){
                let day = date.getDate() < 10 ? '0' + date.getDate()  :  date.getDate(),
                    month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) :  (date.getMonth() + 1),
                    year = date.getFullYear();
                return `${day}.${month}.${year}`;
            }
        }
    }
</script>