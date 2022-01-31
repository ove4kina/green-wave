<template lang="pug">
    include ../../tools/mixins.pug
    +b.MAIN.main-info(
        :class="'main-info--' + colorSection"
    )
        +e.container.container
            +e.H2.title.title--big(
                :class="colorTitle"
            ) {{title}}

        +e.wave
            img(src="/public/images/main/info/wave.svg")

        template(
            v-if="color === 'yellow'"
        )
            +e.shape--mobile.--peach
                img(src="/public/images/main/info/shape-peach-mobile.svg")

            +e.shape--desktop.--peach
                img(src="/public/images/main/info/shape-peach-desktop.svg")
        template(
            v-if="color === 'green'"
        )
            +e.shape--mobile.--blue
                img(src="/public/images/main/info/shape-blue.svg")

            +e.shape--desktop.--blue
                img(src="/public/images/main/info/shape-blue.svg")
        template(
            v-if="color === 'violet'"
        )
            +e.shape--mobile.--green-ring
                img(src="/public/images/main/info/shape-green-ring-mobile.svg")

            +e.shape--desktop.--green-ring
                img(src="/public/images/main/info/shape-green-ring-desktop.svg")

</template>

<script>
    export default {
        props: ['color', 'title'],
        data() {
            return {

            }
        },
        computed: {
            colorSection: function() {
                if(typeof this.color === 'undefined') {
                    return 'yellow';
                }
                return this.color;
            },
            colorTitle: function () {
                if(this.color === 'yellow') {
                    return null;
                }
                if(typeof this.color !== 'undefined') {
                    return 'title--white';
                }
            },
        }
    }
</script>