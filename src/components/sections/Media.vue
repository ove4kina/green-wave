<template lang="pug">
    include ../../tools/mixins.pug

    +b.SECTION.media(
        v-if="content.length > 0"
    )
        +e.container.container
            +e.wrapper
                +e.title.title--standart Медиа-отчеты
                +e.right(
                    v-if="showGroup"
                )
                    span Группа
                    +e.SELECT-COMPONENT.select(
                        :activeIndex="select.activeIndex"
                        :list="select.list"
                        :placeholder="select.placeholder"
                        @change="changeSelectActiveItem"
                    )
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
                        v-img="{ src: slide.src, group: '1' }"
                        :data-src="slide.src"
                        :class="{'swiper-no-swiping': disabled}"
                        v-if="!updateSwiper"
                    )
        +e.container.container
            <!--            +e.text Фотографии с проведенных мероприятий-->
            +e.ROUTER-LINK(
                :to="'/reports'"
            ).button.button__.--bg-blue.--text-white.--medium.--icon.--arrow
                span Узнать больше

</template>

<script>

    import Select from '../blanks/Select.vue'

    export default {
        props: ['content','showGroup'],
        data() {
            return {
                disabled: false,
                updateSwiper: false,
                select: {
                    activeIndex: null,
                    placeholder: 'Выберите даты',
                    list: []
                },
                options: {
                    speed: 300,
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                    slidesOffsetAfter: 500,
                    preloadImages: true,
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
                            slidesOffsetAfter: 0,
                        },
                        2300: {
                            slidesOffsetAfter: 300,
                        }
                    },
                    on: {
                        init:() => {
                            setTimeout(()=>{
                                this.imagesSwiper.lazy.load()
                            })

                        }
                    }
                },
                slides: []
            }
        },
        methods: {
            init() {
                this.select = {
                    activeIndex: null,
                    placeholder: 'Выберите даты',
                    list: []
                };
                setTimeout(() => {
                    this.content.map((schedule) => {
                        this.select.list.push({
                            value: schedule.date
                        });
                    });

                    this.select.activeIndex = this.select.list.length - 1;
                    this.changeSlides();
                    setTimeout(() => {
                        this.checkSlidesSizes();
                    })
                })
            },
            changeSelectActiveItem(index) {
                this.select.activeIndex = index;

                this.changeSlides();
                setTimeout(() => {
                    this.checkSlidesSizes();
                })
            },
            checkSlidesSizes() {
                if(typeof this.$refs.slides !== 'undefined') {
                    this.$refs.slides.map((slide) => {
                        this.disabled = slide.getBoundingClientRect().right < window.innerWidth;
                    })
                }
            },
            changeSlides() {
                this.slides = [];
                if(this.content.length > 0) {
                    this.content[this.select.activeIndex].photos.map((photo) => {
                        this.slides.push(photo)
                    });
                }
            }
        },
        mounted() {
            this.init()
        },
        watch: {
            'select.activeIndex': function () {
                this.updateSwiper = true;
                setTimeout(()=>{
                    this.updateSwiper = false;
                    setTimeout(()=>{
                        this.imagesSwiper.lazy.load()
                    })
                })
            },
            $route (to, from) {
                this.init()
            }
        },
        components: {
            'select-component': Select
        }
    }
</script>