<template lang="pug">
    include ../../tools/mixins.pug

    +b.SECTION.history
        +e.container.container
            +e.title.title--medium Становитесь частью нашей истории
            +e.IMG.image-background(src="/public/images/history/award.svg")
        +e.slider.image-slider__(
            v-swiper:imagesSwiper="options"
            :class="{'disabled': disabled}"
        )
            .swiper-wrapper
                +e.item.swiper-slide(
                    v-for="slide in slides"
                    ref="slides"
                    :class="{'swiper-no-swiping': disabled}"
                )
                    +e.background
                    img.swiper-lazy(
                        v-img="{ src: slide.img, group: '1' }"
                        :data-src="slide.img"
                    )
        +e.container.container
            +e.text.text
                p Каждый год мы становимся больше, а вместе с тем подрастают и наши талантливые выпускники.
                p В нашем лагере сформирована система рейтинга заслуг и талантов, в которой вы можете посмотреть собственный рейтинг и поставить для себя новые цели. Здесь и сейчас формируются ценные кадры и лучшие умы нашей страны!
            +e.BUTTON.button.button__.--big.--disabled.--icon.--lock
                span Рейтинг в процессе заполнения
</template>

<script>
    import SliderCards from "../blanks/SliderCards.vue";
    export default {
        data(){
            return{
                disabled: false,
                options: {
                    speed: 300,
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                    slidesOffsetAfter: 500,
                    lazy: {
                        loadPrevNext: true,
                        loadedClass: 'loaded',
                        loadPrevNextAmount: 5
                    },
                    breakpoints: {
                        639: {
                            spaceBetween: 20,
                            slidesOffsetAfter: 0,
                        },
                        1199: {
                            slidesOffsetAfter: 0,
                        },
                        2300: {
                            slidesOffsetAfter: 300,
                        }
                    }
                },
                slides: [
                    {
                        img: '/public/images/history/1.jpg'
                    },
                    {
                        img: '/public/images/history/2.jpg'
                    },
                    {
                        img: '/public/images/history/3.jpg'
                    },
                    {
                        img: '/public/images/history/4.jpg'
                    },
                    {
                        img: '/public/images/history/1.jpg'
                    },
                    {
                        img: '/public/images/history/2.jpg'
                    },
                    {
                        img: '/public/images/history/3.jpg'
                    },
                    {
                        img: '/public/images/history/4.jpg'
                    },
                ]
            }
        },
        mounted(){
            this.checkSlidesSizes();
        },
        methods:{
            checkSlidesSizes(){
                this.$refs.slides.map((slide)=>{
                    this.disabled = slide.getBoundingClientRect().right < window.innerWidth;
                })
            }
        },
        components: {
            'slider-cards-component': SliderCards,
        }
    }
</script>