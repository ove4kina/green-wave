<template lang="pug">

    include ../../tools/mixins.pug

    +b.SECTION.actual-people-main
        +e.top
            img(src="/public/images/actual-camp-main/top.svg")
        +e.bottom
            img(src="/public/images/actual-camp-main/bg-bottom-mobile.svg").mobile
            img(src="/public/images/actual-camp-main/bg-bottom-tablet.svg").tablet
            img(src="/public/images/actual-camp-main/bg-bottom-desktop.svg").desktop
        +e.container.container
            +e.H1.title.title--big Актуальные смены
            +e.text.text
                p В этом разделе вы можете найти всю интересующую вас информацию о работе нашего лагеря, программах, а также получить ответы на частые вопросы.
            +e.programs.programs
                +e.item.people-card__(
                    v-for="camp in camps"
                )
                    +e.image
                        img(src="/public/images/other-squads/journalist-girl.png")
                        +e.tags
                            <!--                            +e.tag.tag&#45;&#45;pink-light 7-12 лет-->

                            +e.tag.tag(
                                v-for="tag in camp.tags"
                                :class="[`tag--${ tag.color ? tag.color : 'pink-light'}`]"
                            ) {{ tag.name }}
                    +e.ROUTER-LINK(
                        :to="'/camp/' + camp.url"
                    ).name {{camp.name}}
                <!--+e.item.people-card__-->
                    <!--+e.image-->
                        <!--img(src="/public/images/other-squads/ecology-girl.png")-->
                        <!--+e.tags-->
                            <!--+e.tag.tag&#45;&#45;white-pale Набор с 27.12.2018-->
                            <!--+e.tag.tag&#45;&#45;pink-light 7-12 лет-->
                    <!--+e.A(href="#").name Экологический лагерь «Зеленый миг»-->
                <!--+e.item.people-card__-->
                    <!--+e.image-->
                        <!--img(src="/public/images/other-squads/art-girl.png")-->
                        <!--+e.tags-->
                            <!--+e.tag.tag&#45;&#45;yellow-bright Идет набор-->
                            <!--+e.tag.tag&#45;&#45;pink-light 7-12 лет-->
                    <!--+e.A(href="#").name Мир искусства-->
                <!--+e.item.people-card__-->
                    <!--+e.image-->
                        <!--img(src="/public/images/other-squads/art-girl.png")-->
                        <!--+e.tags-->
                            <!--+e.tag.tag&#45;&#45;yellow-bright Идет набор-->
                            <!--+e.tag.tag&#45;&#45;pink-light 7-12 лет-->
                    <!--+e.A(href="#").name Мир искусства-->
</template>


<script>
    export default {
        props: ['camps'],
        data() {
            return {

            }
        }
    }
</script>