<template lang="pug">
    include ../../tools/mixins.pug

    +b.SECTION.other-programs
        +e.top
            img(src="/public/images/other-programs/bg-top-mobile.svg").mobile
            img(src="/public/images/other-programs/bg-top-tablet.svg").tablet
            img(src="/public/images/other-programs/bg-top-desktop.svg").desktop
        +e.bottom
            img(src="/public/images/other-programs/bg-bottom-mobile.svg").mobile
            img(src="/public/images/other-programs/bg-bottom-tablet.svg").tablet
            img(src="/public/images/other-programs/bg-bottom-desktop.svg").desktop
        +e.container.container
            +e.H2.title.title--standart Другие программы
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
                            +e.tag.tag(
                                v-for="tag in program.tags"
                                :class="[`tag--${ tag.color ? tag.color : 'pink-light'}`]"
                            ) {{ tag.name }}
                    +e.ROUTER-LINK(:to="'/program/' + program.url").name {{ program.name }}

</template>

<script>
    import Tabs from '../blanks/Tabs.vue'
    import {tabsParentLogic} from "../../mixins/blanks/tabs/tabsParentLogic";

    export default {
        props: ['programs'],
        mixins: [tabsParentLogic],
        data(){
            return {
                tabs: {
                    list: [
                        'Точные науки',
                        'Культура и искусство',
                        'Спорт и логика',
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
        methods: {
        },
        components: {
            'tabs-component': Tabs,
        }
    }

</script>