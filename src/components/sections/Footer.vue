<template lang="pug">
    include ../../tools/mixins.pug
    +b.FOOTER.footer
        +e.container.container
            +e.top
                +e.logo
                    img(
                        src="/public/images/header/logo-light.svg"
                    )
                +e.text.text
                    p ГБДОУ ВО «Зеленая волна» — это яркие идеи и уникальные возможности для детей и подростков, которые желают раскрывать свои таланты и достигать новых высот
                +e.A.button.button--medium.--border-white.--text-white.--icon.--arrow-top(
                    @click="scrollTo('header')"
                )
                    span Наверх
            +e.SIDE-CARD-COMPONENT.body(
                :color="'white'"
                @openPopup="openPopup"
            )
            +e.bottom
                +e.left
                    p ИНН 3405003245 КПП 340501001 ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ ДЕТСКОЕ ОЗДОРОВИТЕЛЬНОЕ УЧРЕЖДЕНИЕ ВОЛГОГРАДСКОЙ ОБЛАСТИ «ЗЕЛЕНАЯ ВОЛНА», 2019 — 2020
                +e.right
                    p Админ-панель
                    +b.A(href="/catalog/privacy").link--small.--white
                        span Политика обработки персональных данных
</template>

<script>
    import SiteCard from '../blanks/SiteCard.vue'
    import {animateScroll} from '../../mixins/frontEnd/animateScroll';
    export default {
        mixins: [animateScroll],
        methods: {
            openPopup() {
                this.$emit('openPopup');
            }
        },
        components: {
            'side-card-component': SiteCard
        }
    }
</script>