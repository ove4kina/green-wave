<template lang="pug">
    include ../../tools/mixins.pug

    +b.tabs
        +e.container
            +e.list(
                :class="typeof modifier !== 'undefined' ? 'tabs__list--' + modifier : null"
            )
                +e.item(
                    v-for="(item, index) in list"
                    :class="[{'active': index===activeIndex}, typeof modifier !== 'undefined' ? 'tabs__item--' + modifier : null]"
                    v-on:click="changeIndex(index)"
                ) {{ item }}
</template>

<script>
    export default {
        props: [
            'list',
            'activeIndex',
            'modifier'
        ],
        data() {
            return {}
        },
        methods: {
            changeIndex(index) {
                this.$emit('changeIndex', index)
            }
        }
    }
</script>