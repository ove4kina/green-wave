<template lang="pug">
    include ../../tools/mixins.pug

    +b.SECTION.portal
        +e.container.container
            +e.title.title--big Медиа-портал
            +e.text.text
                p Фото-отчеты о прошедших событиях и мероприятиях, а также достижения и обновления в работе «Зеленой Волны».
            +e.wrapper
                <!--+e.MEDIA-CARD-COMPONENT.card(-->
                    <!--v-for="(article, index) in articles"-->
                    <!--:key="index"-->
                    <!--:content="article.content"-->
                    <!--:modifier="article.modifier"-->
                    <!--:outerLink="article.outerLink"-->
                    <!--:innerLink="article.innerLink"-->
                <!--)-->
                +e.MEDIA-CARD-COMPONENT.card(
                    v-for="(report, index) in reports"
                    :key="index"
                    :content="report"
                )
                <!--            +e.BUTTON.button.button__.&#45;&#45;big.&#45;&#45;border-gray.&#45;&#45;icon.&#45;&#45;load-->
                <!--                span Загрузить еще 5 штук-->
</template>

<script>

    import MediaCard from '../blanks/MediaCard.vue'
    export default {
        props: ['reports'],
        data() {
            return {
//                articles: [
//                    {
//                        content: {
//                            img: '/public/images/news/3.jpg',
//                            text: 'Юный журналист',
//                            textColor: 'blue',
//                            tags: {
//                                top: [
//                                    {
//                                        color: 'purple',
//                                        text: 'Смена'
//                                    },
//                                    {
//                                        color: 'orange',
//                                        text: 'Отчет'
//                                    }
//                                ],
//                                bottom: [
//                                    {
//                                        color: 'green',
//                                        text: '22.12.2019 — 26.12.2019'
//                                    },
//                                ]
//                            },
//                        },
//                        modifier: 'wide',
//                    },
//                    {
//                        content: {
//                            img: '/public/images/news/1.jpg',
//                            text: 'Вышел репортаж с нашей зимней сессии под проливным дождем',
//                            textColor: 'white',
//                            tags: {
//                                top: [
//                                    {
//                                        color: 'white',
//                                        text: 'Новое видео'
//                                    }
//                                ],
//                                bottom: []
//                            },
//                        },
//                    },
//                    {
//                        content: {
//                            img: '/public/images/news/2.jpg',
//                            text: 'Созыв партии «Бравые малые»',
//                            textColor: 'blue',
//                            tags: {
//                                top: [
//                                    {
//                                        color: 'dark-green',
//                                        text: 'Мероприятие'
//                                    },
//                                    {
//                                        color: 'orange',
//                                        text: 'Отчет'
//                                    }
//                                ],
//                                bottom: []
//                            },
//                        },
//                    },
//                    {
//                        content: {
//                            img: '/public/images/news/purple.png',
//                            text: 'Наш глубокоуважаемый партнер поделился с нами самым лучшим материалом',
//                            textColor: 'white',
//                            tags: {
//                                top: [
//                                    {
//                                        color: 'white',
//                                        text: 'Партнерский материал'
//                                    },
//                                    {
//                                        color: 'red',
//                                        text: 'Важно'
//                                    }
//                                ],
//                                bottom: []
//                            },
//                        },
//                        outerLink: true,
//                    },
//                    {
//                        content: {
//                            img: '/public/images/news/3.jpg',
//                            text: 'Химия. Подготовка к олимпиаде',
//                            textColor: 'blue',
//                            tags: {
//                                top: [
//                                    {
//                                        color: 'dark-purple',
//                                        text: 'Программа'
//                                    },
//                                    {
//                                        color: 'orange',
//                                        text: 'Отчет'
//                                    }
//                                ],
//                                bottom: [
//                                    {
//                                        color: 'green',
//                                        text: '22.12.2019 — 26.12.2019'
//                                    },
//                                    {
//                                        color: 'purple',
//                                        text: '8 класс'
//                                    },
//                                ]
//                            },
//                        },
//                    },
//                    {
//                        content: {
//                            img: '/public/images/news/purple.png',
//                            text: 'Посмотрите наш новый курс вместе с Симоновым Д. Г.',
//                            textColor: 'white',
//                            tags: {
//                                top: [
//                                    {
//                                        color: 'yellow',
//                                        text: 'Новый курс'
//                                    }
//                                ],
//                                bottom: []
//                            },
//                        },
//                        innerLink: true,
//                    },
//                    {
//                        content: {
//                            img: '/public/images/news/3.jpg',
//                            text: 'Химия. Подготовка к олимпиаде',
//                            textColor: 'blue',
//                            tags: {
//                                top: [
//                                    {
//                                        color: 'dark-purple',
//                                        text: 'Программа'
//                                    },
//                                    {
//                                        color: 'orange',
//                                        text: 'Отчет'
//                                    }
//                                ],
//                                bottom: [
//                                    {
//                                        color: 'green',
//                                        text: '22.12.2019 — 26.12.2019'
//                                    },
//                                ]
//                            },
//                        },
//                    },
//                ],
            };
        },
        created(){

        },
        destroyed(){

        },
        mounted(){

        },
        methods: {

        },
        components: {
            'media-card-component': MediaCard
        }
    };
</script>