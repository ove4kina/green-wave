<template lang="pug">
    include ../../tools/mixins.pug

    +b.SECTION.report
        +e.container.container
            +e.ROUTER-LINK(
                to="/reports"
            ).back.link__.--blue.--return.--border-none
                span Назад к медиа-порталу
            +e.title--big.title--big {{ report.name }}
            +e.text.text
                ul.text
                    li
                        span Дата проведения
                        p {{ formatDates }}
                        <!--                    li-->
                        <!--                        span Количество участников-->
                        <!--                        p 100 человека-->
            +e.text.text(v-html="report.content")
        +e.container.container
            +e.title--small.title--small Фотографии ({{ gallery.length }})
        +e.photos.image-slider__(
            v-swiper:photosSwiper="options"
            :class="{'disabled': disabled}"
        )
            +e.container--absolute.container
                +e.BUTTON.button--prev.button__.--nav(
                    :class="{'hide': buttons.top.hide.prev}"
                )
                +e.BUTTON.button--next.button__.--nav(
                    :class="{'hide': buttons.top.hide.next}"
                )
            .swiper-wrapper
                +e.item.swiper-slide(
                    ref="slides"
                    v-for="slide in gallery"
                    :class="{'swiper-no-swiping': disabled}"
                )
                    +e.background
                    img.swiper-lazy(
                        v-img="{ src: '/media/gallery/' + report.id + '/' + slide.src, group: '1' }"
                        :data-src="'/media/gallery/' + report.id + '/' + slide.src"
                    )
            <!--        +e.container.container-->
            <!--            +e.title&#45;&#45;small.title&#45;&#45;small Видео (2)-->
            <!--        +e.videos.image-slider__.&#45;&#45;big(-->
            <!--            v-swiper:videosSwiper="options"-->
            <!--        )-->
            <!--            +e.container&#45;&#45;absolute.container-->
            <!--                +e.BUTTON.button&#45;&#45;prev.button__.&#45;&#45;nav(-->
            <!--                    :class="{'hide': buttons.bottom.hide.prev}"-->
            <!--                )-->
            <!--                +e.BUTTON.button&#45;&#45;next.button__.&#45;&#45;nav(-->
            <!--                    :class="{'hide': buttons.bottom.hide.next}"-->
            <!--                )-->
            <!--            .swiper-wrapper-->
            <!--                +e.item.swiper-slide(-->
            <!--                    ref="videos"-->
            <!--                    v-for="slide in slides"-->
            <!--                )-->
            <!--                    img(-->
            <!--                        :src="slide.img"-->
            <!--                    )-->

</template>

<script>

    import {format} from 'date-fns';
    export default {
        props: ['report','gallery'],
        data() {
            let vue = this;
            return {
                disabled: false,
                init: false,
                sliders: {
                    top:{
                        overSize: null
                    },
                    bottom:{
                        overSize: null
                    }
                },
                buttons: {
                    top:{
                        hide: {
                            prev: true,
                            next: true
                        }
                    },
                    bottom:{
                        hide: {
                            prev: true,
                            next: true
                        }
                    }
                },
                options: {
                    speed: 300,
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                    slidesOffsetAfter: 500,
                    navigation: {
                        prevEl: '.image-slider__button--prev',
                        nextEl: '.image-slider__button--next',
                    },
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
                    },
                    on: {
                        progress: function(e){
                            if(!vue.init){
                                vue.checkSlidesSizes();
                            }
                            if(this.el.className.indexOf('report__photos') !== -1 && vue.sliders.top.overSize){
                                if(e === 0){
                                    vue.buttons.top.hide.prev = true;
                                } else {
                                    vue.buttons.top.hide.prev = false;
                                }
                                if(e === 1){
                                    vue.buttons.top.hide.next = true;
                                } else {
                                    vue.buttons.top.hide.next = false;
                                }
                            }
                            // if(this.el.className.indexOf('report__videos') !== -1 && vue.sliders.bottom.overSize){
                            //     if(e === 0){
                            //         vue.buttons.bottom.hide.prev = true;
                            //     } else {
                            //         vue.buttons.bottom.hide.prev = false;
                            //     }
                            //     if(e === 1){
                            //         vue.buttons.bottom.hide.next = true;
                            //     } else {
                            //         vue.buttons.bottom.hide.next = false;
                            //     }
                            // }
                        },
                    }
                },
            };
        },
        created(){

        },
        destroyed(){

        },
        mounted(){
            this.checkSlidesSizes();
        },
        computed: {
            formatDates: function () {
                let startDate,endDate;
                startDate = format(new Date(this.report.dateStart), 'dd.MM.yyyy');
                endDate = format(new Date(this.report.dateEnd), 'dd.MM.yyyy');
                return `${startDate} - ${endDate}`;
            }
        },
        methods: {
            checkSlidesSizes(){
                if(this.$refs.slides){
                    this.$refs.slides.map((slide)=>{
                        this.disabled = slide.getBoundingClientRect().right < window.innerWidth;
                    })
                }
            },
        },
        components: {

        }
    };
</script>