<template lang="pug">
    include ../../tools/mixins.pug
    +b.SECTION.program-feature
        +e.container.container
            +e.H2.title.title--small Особенности программы

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
            +e.A.button.button--medium.--text-white.--bg-blue.--icon.--download(
                v-if="technicalList !== null"
                :href="'/media/camp-tech-list/' + id + '/' + technicalList"
            )
                span Скачать технический лист
            +e.BUTTON.button.button--medium.--text-black.--bg-yellow.--icon.--pencil(
                v-on:click="openPopup"
            )
                span Задать вопрос


</template>

<script>
    import Tabs from '../blanks/Tabs.vue'
    import {tabsParentLogic} from "../../mixins/blanks/tabs/tabsParentLogic";

    export default {
        props: ['features','technicalList','id'],
        mixins: [tabsParentLogic],
        data() {
            return {
                tabs: {
                    modifier: 'gray',
                }
            }
        },
        methods: {
            openPopup() {
                this.$emit('openPopup');
            }
        },
        components: {
            'tabs-component': Tabs,
        },
        computed: {
            tabsList: function () {
                let array = [];
                this.features.map((feature)=>{
                    array.push(feature.name)
                });
                return array;
            }
        }
    }
</script>