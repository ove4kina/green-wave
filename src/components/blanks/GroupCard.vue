<template lang="pug">
    include ../../tools/mixins.pug
    +b.group(
        :class="{'group--disabled': disabled}"
    )
        +e.H3.grade(
            :class="{'group__grade--disabled': disabled}"
        ) {{content.name}}
        +e.dates(
            v-if="!disabled"
        ) {{content.date.start}} — {{content.date.end}}
        +e.disabled-info(
            v-if="disabled"
        ) {{ content.comment }}
        +e.cost(
            v-if="!disabled"
        )
            +e.info--left
                +e.subtitle Стоимость, руб./чел.
                +e.strong {{'от ' + content.cost}}
            +e.info--right
                +e.subtitle Осталось мест
                +e.strong #[span {{content.places.left}}] / {{content.places.total}}
        +e.BUTTON.button.button--bg-green.--big.--icon.--plane.--text-white(
            :class="[{'button--disabled': disabled}, {'button--stop': disabled}]"
            :disabled="disabled"
            v-on:click="openPopup"
        )
            span {{disabled ? 'Запись закрыта' : 'Записаться'}}
</template>

<script>
    export default {
        props: ['content','disabled'],
        data() {
            return {

            }
        },
        methods: {
            openPopup() {
                this.$emit('openOrderPopup', {
                    date: `${this.content.date.start} - ${this.content.date.end}`
                });
            }
        }
    }
</script>