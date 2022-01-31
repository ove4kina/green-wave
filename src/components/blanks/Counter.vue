<template lang="pug">
    include ../../tools/mixins.pug
    +b.counter
        +e.button--minus(
            v-on:click="change('minus')"
        )
        +e.value
            span(
                :class="{'hide': hide}"
            ) {{value }}
            |  {{ placeholder}}
        +e.button--plus(
            v-on:click="change('plus')"
        )
</template>

<script>
    export default {
        props: ['value', 'placeholder', 'min'],
        data(){
            return {
                hide: false
            }
        },
        methods: {
            change(sign){
                this.$emit('change', {
                    sign: sign,
                    min: this.min,
                });
            }
        }
    }
</script>

