<template lang="pug">
    include ../../tools/mixins.pug
    +b.SECTION.about
        +e.container.container
            +e.wrapper
                +e.text.text
                    h2 {{ subTitle }}
                    p {{ subDescription }}
                +e.image
                    img(src="/public/images/about/1.jpg")
</template>

<script>
    export default {
        props: ['subTitle', 'subDescription']
    }
</script>