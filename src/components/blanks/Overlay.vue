<template lang="pug">
    include ../../tools/mixins.pug
    +b.overlay
        //+e.image(src="/public/images/blanks/shape.svg")
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        mounted() {
            let shape = new Image();
            shape.src = '/public/images/blanks/shape.svg';
        },
    }
</script>