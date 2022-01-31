<template lang="pug">
    include ../../tools/mixins.pug
    +b.SECTION.courses
        +e.container.container
            +e.wrapper
                +e.H2.title.title--small Курсы и программы

                template(
                    v-if="features.length > 0"
                )
                    +e.TABS-COMPONENT.tabs(
                        :list="tabsList"
                        :modifier="tabs.modifier"
                        :activeIndex="tabs.activeIndex"
                        v-on:changeIndex="changeActiveTabIndex"
                    )
                    +e.description.text(
                        v-html="features[tabs.activeIndex].content"
                    )
            +e.more-about
                +e.image--wave-top-mobile(src="/public/images/courses/wave-top-mobile.svg")
                +e.image--wave-bottom-mobile(src="/public/images/courses/wave-bottom-mobile.svg")
                +e.image--wave-top-tablet(src="/public/images/courses/wave-top-tablet.svg")
                +e.image--wave-bottom-tablet(src="/public/images/courses/wave-bottom-tablet.svg")

                +e.image-group
                    +e.image--dots-mobile(src="/public/images/teachers/dots-mobile.svg")
                    +e.image--dots-tablet(src="/public/images/teachers/dots-tablet.svg")
                    +e.image--dots-desktop(src="/public/images/teachers/dots-desktop.svg")
                    +e.image--circle(src="/public/images/courses/circle.svg")

                +e.about-text
                    +e.H4.about-title Узнать подробнее
                    p Особенностью данной программы является то, что теоретические и практические знания и навыки ребята получают не отдельно, а интегрировано в ходе каждого занятия.
                    +e.A(
                        :href="'/media/program-tech-list/' + id + '/' + technicalList"
                    ).button.button--medium.--text-white.--bg-blue.--icon.--download
                        span Скачать технический лист
                    +e.BUTTON.button.button--medium.--text-black.--bg-white.--icon.--pencil(
                        v-on:click="openPopup"
                    )
                        span Задать вопрос


</template>

<script>
    import Tabs from '../blanks/Tabs.vue'
    import {tabsParentLogic} from "../../mixins/blanks/tabs/tabsParentLogic";

    export default {
        mixins: [tabsParentLogic],
        props: ['features','technicalList','id'],
        data() {
            return {
                tabs: {
                    list: [
                        '8 класс',
                        '9 класс'
                    ],
                    modifier: 'gray',
                }
            }
        },
        computed: {
            tabsList: function () {
                let array = [];
                this.features.map((feature)=>{
                    array.push(feature.name)
                });
                return array;
            }
        },
        methods: {
            openPopup() {
                this.$emit('openPopup');
            }
        },
        components: {
            'tabs-component': Tabs,
        }
    }
</script>