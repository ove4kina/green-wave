<template lang="pug">
    include ../../tools/mixins.pug

    +b.SECTION.all-people#programs
        +e.top
            img(src="/public/images/all-products/bg-top-mobile.svg").mobile
            img(src="/public/images/all-products/bg-top-tablet.svg").tablet
            img(src="/public/images/all-products/bg-top-desktop.svg").desktop
        +e.bottom
            img(src="/public/images/all-products/bg-bottom-mobile.svg").mobile
            img(src="/public/images/all-products/bg-bottom-tablet.svg").tablet
            img(src="/public/images/all-products/bg-bottom-desktop.svg").desktop
        +e.container.container
            +e.H2.title.title--standart Программы и курсы
            +e.text.text
                p Образовательный процесс в Центре организован на базе ГБДОУ ВО «Зеленая волна» в рамках профильных смен, проводимых в течение календарного года.
            +e.TABS-COMPONENT.tabs(
                :list="tabsList"
                :modifier="'white'"
                :activeIndex="tabs.activeIndex"
                v-on:changeIndex="changeActiveTabIndex"
            )
        +e.SLIDER-CARDS-COMPONENT.slider-cards(
            :list="programs[tabs.activeIndex].programs"
            :section="'program'"
            v-if="sliderInit"
        )


</template>

<script>
    import Tabs from '../blanks/Tabs.vue'
    import SliderCards from '../blanks/SliderCards.vue'
    import {tabsParentLogic} from "../../mixins/blanks/tabs/tabsParentLogic";

    export default {
        mixins: [tabsParentLogic],
        props: ['programs'],
        data() {
            return {
                sliderInit: true,
                tabs: {
                    list: [],
                },
                swiperSlides: {
                    list: [
                        {
                            image: '/public/images/other-programs/chemistry-boy.png',
                            tags: [
                                {
                                    name: 'Набор с 27.12.2018',
                                    color: 'white'
                                },
                                {
                                    name: '8 - 11 классы',
                                    color: 'yellow'
                                }
                            ],
                            name: 'Химия. Подготовка к Олимпиадам',
                        },
                        {
                            image: '/public/images/other-programs/it-girl.png',
                            tags: [
                                {
                                    name: 'Осталось 3 дня на запись',
                                    color: 'pink'
                                },
                                {
                                    name: '8 - 11 классы',
                                    color: 'yellow'
                                }
                            ],
                            name: 'Информатика и ИКТ высшего уровня',
                        },
                        {
                            image: '/public/images/other-programs/math-girl.png',
                            tags: [
                                {
                                    name: 'Идет набор',
                                    color: 'yellow-bright'
                                },
                                {
                                    name: '8 - 11 классы',
                                    color: 'yellow'
                                },
                            ],
                            name: 'Олимпиадная математика',
                        },
                        {
                            image: '/public/images/other-programs/physics-girl.png',
                            tags: [
                                {
                                    name: 'Набор приостановлен',
                                    color: 'white-pale'
                                },
                                {
                                    name: '8 - 11 классы',
                                    color: 'yellow'
                                }
                            ],
                            name: 'Физика. Подготовка к Олимпиадам',
                        },
                    ],
                }
            }
        },
        computed: {
            tabsList: function () {
                let array = [];
                this.programs.map((program)=>{
                    array.push(program.name)
                })
                return array;
            }
        },
        components: {
            'tabs-component': Tabs,
            'slider-cards-component': SliderCards,
        }
    }
</script>