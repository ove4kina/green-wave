<template lang="pug">

    include ../../tools/mixins.pug

    +b.SECTION.actual-people-main
        +e.top--big
            img(src="/public/images/actual-camp-main/top2.svg")
        +e.bottom
            img(src="/public/images/actual-camp-main/bg-bottom-mobile.svg").mobile
            img(src="/public/images/actual-camp-main/bg-bottom-tablet.svg").tablet
            img(src="/public/images/actual-camp-main/bg-bottom-desktop.svg").desktop
        +e.container.container
            +e.H1.title.title--big Программы и курсы
            +e.text.text
                p В этом разделе вы можете найти всю интересующую вас информацию о работе нашего лагеря, программах, а также получить ответы на частые вопросы.
            +e.TABS-COMPONENT.tabs(
                :list="tabsList"
                :modifier="'white'"
                :activeIndex="tabs.activeIndex"
                v-on:changeIndex="changeActiveTabIndex"
            )
            +e.programs.programs
                +e.item.people-card__(
                    v-for="program in programs[tabs.activeIndex].programs"
                )
                    +e.image
                        img(src="/public/images/other-programs/chemistry-boy.png")
                        +e.tags
                            <!--                            +e.tag.tag&#45;&#45;white Набор с 27.12.2018-->
                            +e.tag.tag--yellow(
                                v-for="tag in program.tags"
                                :class="[`tag--${ tag.color ? tag.color : 'pink-light'}`]"
                            ) {{tag.name}}
                    +e.ROUTER-LINK.name(
                        :to="'/program/' + program.url"
                    ) {{program.name}}
</template>

<script>
    import Tabs from '../blanks/Tabs.vue'
    import {tabsParentLogic} from "../../mixins/blanks/tabs/tabsParentLogic";

    export default {
        mixins: [tabsParentLogic],
        props: [
            'programs',
        ],
        data() {
            return {
            }
        },
        computed: {
            tabsList: function () {
                let array = [];
                this.programs.map((program)=> {
                    array.push(program.name);
                });
                return array;
            }
        },
        components: {
            'tabs-component': Tabs,
        }
    }
</script>