<template lang="pug">
    include ../../tools/mixins.pug

    +b.ROUTER-LINK.media-card__(
        :class="[modifierClass,outerLinkClass,innerLinkClass]"
        :to="`/report/${content.url}`"
    )
        img(
            :src="'/media/reports/' + content.id + '/avatar/' + content.avatar"
        )
        +e.DIV.tags--top
            +e.tag.tag(
                v-for="tag in content.tags.top"
                :class="['tag--' + tag.color]"
            ) {{ tag.text }}
        +e.DIV.bottom
            +e.DIV.tags--bottom
                +e.tag.tag(
                    v-for="tag in content.tags.bottom"
                    :class="['tag--yellow']"
                ) {{ tag.name }}
            p(:class="'blue'")
                span {{ content.name }}
            //p(:class="[content.textColor]")
            //    span {{ content.name }}
</template>

<script>
    export default {
        props: ['content', 'modifier','outerLink', 'innerLink'],
        data(){
            return {

            }
        },
        computed: {
            modifierClass: function () {
                if(typeof this.modifier !== 'undefined'){
                    switch (this.modifier){
                        case 'wide':{
                            return 'media-card--wide'
                        }
                    }
                }
            },
            outerLinkClass: function () {
                if(typeof this.outerLink !== 'undefined'){
                    return 'media-card--outer-link';
                }
            },
            innerLinkClass: function () {
                if(typeof this.innerLink !== 'undefined'){
                    return 'media-card--inner-link';
                }
            }
        },
        methods: {

        }

    }
</script>