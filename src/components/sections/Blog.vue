<template lang="pug">
    include ../../tools/mixins.pug

    +b.SECTION.blog
        +e.container.container
            +e.title.title--big Новостная лента
            <!--            +e.SELECT-COMPONENT.select(-->
            <!--                :activeIndex="select.activeIndex"-->
            <!--                :list="select.list"-->
            <!--                :placeholder="select.placeholder"-->
            <!--                @change="changeSelectActiveItem"-->
            <!--            )-->
            +e.wrapper
                +e.ROUTER-LINK.card.news-card__.--small(
                    v-for="(article, index) in articles"
                    :key="index"
                    :to="'/article/' + article.url"
                    :class="{'news-card--wide': false}"
                )
                    img(
                        :src="'/media/articles/' + article.id + '/' + article.avatar"
                    )
                    +e.DIV.tags
                        +e.tag.tag(
                            v-for="tag in article.tags"
                            :class="['tag--yellow']"
                        ) {{ tag.name }}
                    p
                        span {{ article.name }}
            <!--            +e.BUTTON.button.button__.&#45;&#45;big.&#45;&#45;border-gray.&#45;&#45;icon.&#45;&#45;load-->
            <!--                span Загрузить еще 5 штук-->
</template>

<script>

    import Select from '../blanks/Select.vue'
    import {selectParentLogic} from "../../mixins/blanks/select/selectParentLogic";

    export default {
        props: ['articles'],
        mixins: [selectParentLogic],
        data() {
            return {
                select: {
                    placeholder: 'Фильтровать',
                    list: [
                        {
                            value: '01.11.2019 - 22.11.2019',
                            id: 2
                        },
                        {
                            value: '01.11.2019 - 22.11.2019',
                            id: 2
                        }

                    ]
                },
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
            'select-component': Select
        }
    };
</script>