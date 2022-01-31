<template lang="pug">
    include ../../tools/mixins.pug
    +b.MAIN.main.--pages
        +e.background--pages
            img(src="/public/images/main/pages/wave-mobile.svg").wave-mobile
            img(src="/public/images/main/pages/wave-desktop.svg").wave-desktop
            img(src="/public/images/main/pages/2.jpg").shape
        +e.container--pages.container
            +e.notify(v-if="scheduleDates") {{ scheduleDates }}
            +e.text
                h1 {{ name }}
                p {{ title }}
            +e.buttons
                +e.button--pages.--order.button--big.--bg-green.--shadow-green.--text-white.--mail.--icon(
                    @click="scrollTo('schedules')"
                )
                    span Отправить заявку
                +e.A.button--pages.--more.button--underline(
                    @click="scrollTo('about')"
                )
                    span Подробнее
</template>

<script>
    import {animateScroll} from '../../mixins/frontEnd/animateScroll';
    export default {
        props:['name','title','scheduleDates'],
        mixins: [animateScroll],
        methods: {
            openPopup() {
                this.$emit('openPopup');
            }
        }
    }
</script>
