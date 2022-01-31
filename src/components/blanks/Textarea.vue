<template lang="pug">
    include ../../tools/mixins.pug

    +b.textarea(
        :class="{'error': error}"
    )
        +e.TEXTAREA.value(
            :value="value"
            :type="type"
            :placeholder="placeholder"
            @input="changeValue"
        )
        //+e.placeholder
</template>

<script>
    export default {
        props: ['placeholder', 'value','error', 'type', 'name'],
        data(){
            return {

            }
        },
        methods: {
            changeValue(e){
                let target = e.target || e.srcElement;
                this.$emit('changeValue', {name: this.name, value: target.value})
            }
        }

    }
</script>