<template lang="pug">
    include ../../tools/mixins.pug
    +b.group(
        :class="{'group--disabled': disabled}"
    )
        +e.H4.subtitle--margin Смена пройдёт
        +e.dates--big {{content.date.start}} — {{content.date.end}}
        +e.alert(
            v-if="content.alert"
            :class="'group__alert--' + content.alert.color"
        ) {{content.alert.text }}
        +e.cost
            +e.info--left
                +e.subtitle Стоимость, руб./чел.
                +e.strong {{'от ' + content.cost}}
            +e.info--right
                +e.subtitle {{disabled ? 'Всего мест' : 'Осталось мест'}}

                +e.strong #[span {{disabled ? '' : content.places.left}}] {{disabled  ? '' + content.places.total : ' / ' + content.places.total}}
        +e.BUTTON.button.button--bg-green.--big.--icon.--plane.--text-white(
            :class="[{'button--disabled': disabled}, {'button--lock': disabled}]"
            :disabled="disabled"
            v-on:click="openPopup"
        )
            span {{disabled ? 'Запись не началась' : 'Записаться'}}
</template>

<script>
    export default {
        props: ['content', 'disabled'],
        data() {
            return {

            }
        },
        methods: {
            openPopup() {
                this.$emit('openOrderPopup');
            }
        },
    }
</script>