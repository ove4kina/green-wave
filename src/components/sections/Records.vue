<template lang="pug">
    include ../../tools/mixins.pug

    +b.SECTION.records
        +e.top
            img(src="/public/images/records/shape.svg")
        +e.bottom
            img(src="/public/images/records/shapeBot.svg")
        +e.container.container
            +e.title.title--medium Ближайшие открытые записи на смены и курсы
            +e.buttons
                +e.BUTTON.button--prev.button__.--nav
                +e.BUTTON.button--next.button__.--nav
        +e.slider.swiper-container
            .swiper-wrapper
                +e.card.course-card__.swiper-slide(
                    v-for="card in cards"
                )
                    +e.image--lazy
                        img.swiper-lazy(
                            :data-src="card.avatar"
                        )
                    +e.content
                        +e.tags
                            +e.tag.tag(
                                v-for="tag in card.tags"
                                :class="['tag--' + (tag.color ? tag.color : 'pink-light')]"
                            ) {{ tag.name }}
                        +e.title
                            span {{ card.name }}
                        +e.text(v-html="card.title")
                        +e.ROUTER-LINK(
                            :to="card.url"
                        ).button.button__.--border-green.--text-green.--icon.--link.--big
                            span {{ card.type === 'camp' ? 'Посмотреть расписание' : 'Посмотреть курсы' }}
</template>

<script>
    import Swiper from 'swiper'
    export default {
        props:['cards'],
        data() {
            return {
                swiper: null,
                options: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                    slidesOffsetAfter: 0,
                    navigation: {
                        prevEl: '.records__button--prev',
                        nextEl: '.records__button--next',
                    },
                    lazy: {
                        loadPrevNext: true,
                        loadedClass: 'loaded',
                        loadPrevNextAmount: 5
                    },
                    breakpoints: {
                        1200: {
                            slidesOffsetAfter: 300,
                        },
                        2300:{
                            slidesOffsetAfter: 500,
                        }
                    }
                }
            }
        },
        mounted() {
            this.swiper = new Swiper('.records__slider', this.options);
        }
    }
</script>