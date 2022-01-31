 <template lang="pug">
    include ../../tools/mixins.pug

    +b.slider-cards.swiper-container(:class="{'disabled': disabled}")
        +e.navigation
            +e.BUTTON.button--prev.button--nav
            +e.BUTTON.button--next.button--nav
        +e.body(
            v-swiper:cards="swiperOption"
        )
            .swiper-wrapper
                +e.item.people-card__.swiper-slide(
                    v-for="card in list"
                    ref="cards"
                    :class="{'swiper-no-swiping': disabled}"
                )
                    +e.image--lazy
                        img.swiper-lazy(
                            :data-src="'/public/images/other-programs/chemistry-boy.png'"
                        )
                        +e.tags
                            +e.tag.tag(
                                :class="['tag--' + (tag.color ? tag.color : 'yellow')]"
                                v-for="tag in card.tags"
                            ) {{tag.name}}
                    +e.ROUTER-LINK(:to="`/${section}/${card.url}`").name {{ card.name }}


</template>

<script>
    export default {
        props: [
            'list',
            'section'
        ],
        data() {
            return {
                disabled: false,
                swiperOption: {
                    spaceBetween: 90,
                    slidesPerView: 'auto',
                    slidesOffsetAfter: 500,
                    navigation: {
                        nextEl: '.slider-cards__button--next',
                        prevEl: '.slider-cards__button--prev',
                    },
                    lazy: {
                        loadPrevNext: true,
                        loadedClass: 'loaded',
                        loadPrevNextAmount: 5
                    },
                    breakpoints: {
                        639: {
                            spaceBetween: 20,
                        },
                        1199: {
                            spaceBetween: 30,
                        },
                        1200: {
                            slidesOffsetAfter: 100,
                        },
                    }
                }
            }
        },
        mounted(){
            this.checkSlidesSizes();
        },
        methods: {
            checkSlidesSizes(){
                this.$refs.cards.map((card)=>{
                    this.disabled = card.getBoundingClientRect().right < window.innerWidth;
                })
            }
        }
    }

</script>