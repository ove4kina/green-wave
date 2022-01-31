<template lang="pug">
    include ../../tools/mixins.pug

    +b.SECTION.disciplines
        +e.container.container
            +e.H2.title.title--standart.--center Дисциплины, которые мы развиваем и преподаем
            +e.list(
                v-if="deviceSize.mobile"
            )
                +e.line
                    +e.item
                        img(
                            src="/public/images/disciplines/1.svg"
                        )
                        p Математика
                    +e.item
                        img(
                            src="/public/images/disciplines/2.svg"
                        )
                        p Физика
                    +e.item
                        img(
                            src="/public/images/disciplines/3.svg"
                        )
                        p Биология
                    +e.item
                        img(
                            src="/public/images/disciplines/4.svg"
                        )
                        p Химия
                    +e.item
                        img(
                            src="/public/images/disciplines/5.svg"
                        )
                        p Экология
                +e.line
                    +e.item
                        img(
                            src="/public/images/disciplines/6.svg"
                        )
                        p Спорт
                    +e.item
                        img(
                            src="/public/images/disciplines/7.svg"
                        )
                        p Журналистика
                    +e.item
                        img(
                            src="/public/images/disciplines/8.svg"
                        )
                        p Искусство
                    +e.item
                        img(
                            src="/public/images/disciplines/9.svg"
                        )
                        p Коммуникации
            +e.list(
                v-if="!deviceSize.mobile"
            )
                +e.item
                    img(
                        src="/public/images/disciplines/1.svg"
                    )
                    p Математика
                +e.item
                    img(
                        src="/public/images/disciplines/2.svg"
                    )
                    p Физика
                +e.item
                    img(
                        src="/public/images/disciplines/3.svg"
                    )
                    p Биология
                +e.item
                    img(
                        src="/public/images/disciplines/4.svg"
                    )
                    p Химия
                +e.item
                    img(
                        src="/public/images/disciplines/5.svg"
                    )
                    p Экология
                +e.item
                    img(
                        src="/public/images/disciplines/6.svg"
                    )
                    p Спорт
                +e.item
                    img(
                        src="/public/images/disciplines/7.svg"
                    )
                    p Журналистика
                +e.item
                    img(
                        src="/public/images/disciplines/8.svg"
                    )
                    p Искусство
                +e.item
                    img(
                        src="/public/images/disciplines/9.svg"
                    )
                    p Коммуникации

</template>

<script>
    import {deviceSize} from "../../mixins/frontEnd/deviceSize";

    export default {
        mixins: [deviceSize],
        data() {
            return {

            };
        },
        created(){

        },
        destroyed(){

        },
        mounted(){

        },
        methods: {

        },
        components: {

        }
    };
</script>