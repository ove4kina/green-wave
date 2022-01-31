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
            +e.H2.title.title--standart Другие смены
            +e.programs.programs
                +e.item.people-card__(
                    v-for="camp in camps"
                )
                    +e.image
                        img(src="/public/images/other-squads/journalist-girl.png")
                        +e.tags
                            +e.tag.tag--yellow-bright(
                                v-for="tag in camp.tags"
                            ) {{ tag.name }}
                            <!--                            +e.tag.tag&#45;&#45;pink-light 7-12 лет-->
                    +e.ROUTER-LINK(:to="'/camp/' + camp.url").name {{ camp.name }}
</template>

<script>
    export default{
        props: ['camps']
    }
</script>
