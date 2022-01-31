<template lang="pug">
    include ../../tools/mixins.pug

    +b.SECTION.all-people.--special-camp#camps
        +e.point
            img(src="/public/images/profile-camp/point-top-mobile.svg").mobile
            img(src="/public/images/profile-camp/point-top-tablet.svg").tablet
            img(src="/public/images/profile-camp/point-top-desktop.svg").desktop
        +e.container.container
            +e.H2.title.title--standart Профильные смены
            +e.text.text
                p Образовательный процесс в Центре организован на базе ГБДОУ ВО «Зеленая волна» в рамках профильных смен, проводимых в течение календарного года.
        +e.SLIDER-CARDS-COMPONENT.slider-cards(
            :list="camps"
            :section="'camp'"
        )
        +e.bottom
            img(src="/public/images/profile-camp/bg-bottom-mobile.svg").mobile
            img(src="/public/images/profile-camp/bg-bottom-tablet.svg").tablet
            img(src="/public/images/profile-camp/bg-bottom-desktop.svg").desktop


</template>

<script>
    import SliderCards from '../blanks/SliderCards.vue'

    export default {
        name: 'SliderCards',
        props: ['camps'],
        data() {
            return {
            }
        },
        components: {
            'slider-cards-component': SliderCards,
        }
    }
</script>