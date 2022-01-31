<template lang="pug">
    include ../../tools/mixins.pug

    +b.site-card__
        +e.list
            +e.ROUTER-LINK.item--title.link--big(
                :class="'link--' + color"
                to="/catalog/about"
            )
                span О нас
            +e.ROUTER-LINK.item.link--standart(
                :class="'link--' + color"
                to="/catalog/parents"
            )
                span Родителям
            +e.ROUTER-LINK.item.link--standart(
                :class="'link--' + color"
                to="/catalog/parents"
            )
                span Партнеры
            +e.ROUTER-LINK.item.link--standart(
                :class="'link--' + color"
                to="/blog"
            )
                span Новости
        +e.list
            +e.item--title.link--big.--disabled(
                :class="'link--' + color"
            )
                span Ученикам
            +e.ROUTER-LINK.item.link--standart(
                to="/camps"
                :class="'link--' + color"
            )
                span Смены
            +e.ROUTER-LINK.item.link--standart(
                to="/programs"
                :class="'link--' + color"
            )
                span Программы
            +e.ROUTER-LINK.item.link--standart(
                to="/reports"
                :class="'link--' + color"
            )
                span Медиа-портал
        +e.list
            +e.item--title.link--big.--disabled(
                :class="'link--' + color"
            )
                span Родителям
            +e.ROUTER-LINK.item.link--standart(
                to="/catalog/parents"
                :class="'link--' + color"
            )
                span Критерии отбора
            +e.ROUTER-LINK.item.link--standart(
                to="/"
                :class="'link--' + color"
            )
                span Условия размещения
            +e.ROUTER-LINK.item.link--standart(
                to="/"
                :class="'link--' + color"
            )
                span Питание
            +e.ROUTER-LINK.item.link--standart(
                to="/"
                :class="'link--' + color"
            )
                span Правила пребывания
            +e.ROUTER-LINK.item.link--standart(
                to="/"
                :class="'link--' + color"
            )
                span Документы
        +e.list
            +e.item--title.link--big.--disabled(
                :class="'link--' + color"
            )
                span Педагогам
            +e.ROUTER-LINK.item.link--standart(
                to="/"
                :class="'link--' + color"
            )
                span Методологии преподавания
            +e.ROUTER-LINK.item.link--standart(
                to="/"
                :class="'link--' + color"
            )
                span Вакансии
        +e.list--wide
            +e.item--title.link--big.--disabled(
                :class="'link--' + color"
            )
                span Связаться с нами
            +e.A.item.link--big(
                href="tel:8442968685"
                :class="'link--' + color"
            )
                span +7 (8442) 96-86-85
            +e.A.item.link--big(
                href="mailto:office@centrleto.ru"
                :class="'link--' + color"
            )
                span office@centrleto.ru
            +e.BUTTON.button.button--small.--bg-blue.--shadow-blue.--text-white(
                v-on:click="openPopup"
            )
                span Обратная связь

</template>

<script>
    export default {
        props: ['color'],
        data(){
            return {

            }
        },
        methods: {
            openPopup() {
                this.$emit('openPopup');
            }
        }
    }
</script>