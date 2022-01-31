<template lang="pug">
    include ../../tools/mixins.pug
    +b.MAIN.main--yellow.--index
        +e.wave
            img(src="/public/images/main/index/wave-mobile.svg").mobile
            img(src="/public/images/main/index/wave-tablet.svg").tablet
            img(src="/public/images/main/index/wave-desktop.svg").desktop
        +e.background--index
            div.round
            img(src="/public/images/main/index/shape1.png").shape1
            img(src="/public/images/main/index/dots.svg").dots
            img(src="/public/images/main/index/shape2.svg").shape2
        +e.container--index.container
            +e.text--index
                h1 {{ title }}
                p {{ description }}
            +e.buttons
                +e.A.button--index.button--big.--bg-green.--shadow-green.--text-white(
                    @click="scrollTo('camps')"
                ) Смены и лагеря
                +e.A.button--index.button--big.--bg-violet.--shadow-violet.--text-white(
                    @click="scrollTo('programs')"
                ) Программы и курсы
</template>

<script>
    import {animateScroll} from '../../mixins/frontEnd/animateScroll';
    export default {
        props: ['title', 'description'],
        mixins: [animateScroll],
        methods: {

        }
    }
</script>
