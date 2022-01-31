<template lang="pug">
    include ../../tools/mixins.pug
    +b.SECTION.teachers(
        v-if="init"
    )
        +e.dots
            img(src="/public/images/teachers/dots-mobile.svg").mobile
            img(src="/public/images/teachers/dots-tablet.svg").tablet
            img(src="/public/images/teachers/dots-desktop.svg").desktop
        +e.top
            img(src="/public/images/teachers/top-mobile.svg").mobile
            img(src="/public/images/teachers/top-tablet.svg").tablet
            img(src="/public/images/teachers/top-desktop.svg").desktop
        +e.bottom
            img(src="/public/images/teachers/bottom-mobile.svg").mobile
            img(src="/public/images/teachers/bottom-tablet.svg").tablet
            img(src="/public/images/teachers/bottom-desktop.svg").desktop
        +e.container.container
            +e.wrapper.wrapper
                +e.H2.title.title--standart Преподаватели
                +e.UL.list
                    +e.item.teacher__(
                        v-for="(author, index) in authors"
                    )
                        +e.photo
                            img(
                                :src="`http://volna-talant.ru/media/authors/${author.id}/${author.avatar}`"
                            )
                        +e.name {{author.first_name}} {{author.second_name}} {{author.third_name}}
                        +e.post {{author.position}}

</template>

<script>
    export default {
        props: ['authors'],
        data() {
            return {
                init: true,
            }
        },
        mounted(){
            if(this.authors.length === 0){
                this.init = false;
            }
        }
    }
</script>