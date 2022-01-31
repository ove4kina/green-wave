<template lang="pug">
    include ../../tools/mixins.pug

    +b.SECTION.news
        +e.container.container.text
            +e.title.title--small Последние новости и отчеты
            p Мы регулярно публикуем #[router-link(to="/blog") новости] об изменениях и прошедших мероприятиях, а также #[router-link(to="/reports") отчеты прошедших смен и курсов]
            +e.slider
                +e.ROUTER-LINK.card.news-card__(
                    :to="'/article/' + article.url"
                    v-for="(article,index) in returnArticles"
                    :key="index"
                )
                    img(
                        :src="'/media/articles/' + article.id + '/' + article.avatar"
                    )
                    +e.tags
                        +e.tag.tag(
                            v-for="tag in article.tags"
                            :class="['tag--yellow']"
                        ) {{ tag.name }}
                    p
                        span {{ article.name }}



</template>

<script>
    export default {
        props: ['articles'],
        data(){
            return {

            }
        },
        computed: {
            returnArticles: function () {
                return this.articles.slice(-3);
            }
        }
    }
</script>