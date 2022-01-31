<template lang="pug">
    include ../../tools/mixins.pug

    +b.SECTION.socials
        +e.wave--top
            img(src="/public/images/socials/wave-top.svg")
        +e.wave--bottom
            img(src="/public/images/socials/wave-bottom.svg")
        +e.container.container
            +e.title.title--small.--center  Мы в социальных сетях
            +e.text.text
                p Регулярные анонсы и отчеты с мероприятий, социальное общение и новые знакомства — все по ссылкам ниже
            +e.list
                +e.A(href="https://instagram.com/volna_talant" target="_blank").item.social--instagram
                +e.A(href="https://www.facebook.com/Центр-одаренных-детей-Волна-107211174123621" target="_blank").item.social--fb
                +e.A(href="https://vk.com/green_wave_camp" target="_blank").item.social--vk
                +e.A(href="https://www.youtube.com/channel/UCfHKDi0Zk_p47_z6aZg5UnQ?view_as=subscriber" target="_blank").item.social--youtube
                +e.A(href="https:/t.me/volnatalant" target="_blank").item.social--telegram
</template>

<script>
    export default {

    }
</script>
