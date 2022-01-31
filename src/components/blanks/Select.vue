<template lang="pug">
    include ../../tools/mixins.pug

    +b.select(
        :class="{'active': select.active}"
    )
        +e.value(
            v-on:click="toggleSelect"
            :class="[valueColor]"
        ) {{activeIndex === null ? placeholder : list[activeIndex].value}}
        +e.UL.list(
            :style="{'height': select.listHeight}"
            v-if="list.length > 5"
        )
            vuescroll(
                :ops="customScrollOptions"
            )
                +e.LI.item(
                    v-for="(item,index) in list"
                    v-on:click="changeActiveItem(index)"
                    :class="{'active': activeIndex === index}"
                ) {{item.value}}
        +e.UL.list(
            v-if="list.length <= 5"
            :style="{'height': select.listHeight}"
        )
            +e.LI.item(
                v-for="(item,index) in list"
                v-on:click="changeActiveItem(index)"
                :class="{'active': activeIndex === index}"
            ) {{item.value}}
</template>

<script>
    import {onEscHandler} from "../../mixins/frontEnd/onEscHandler";
    import {initCustomScroll} from "../../mixins/frontEnd/initCustomScroll";

    export default {
        props: ['list','activeIndex','placeholder'],
        mixins: [onEscHandler,initCustomScroll],
        data(){
            return {
                select: {
                    active: false,
                    height: null,
                    listHeight: null
                }
            }
        },
        mounted(){
            if(this.list.length < 6){
                this.select.listHeight = 'auto'
            }
        },
        computed: {
            valueColor: function(){
                if(this.activeIndex === null){
                    return 'gray';
                } else {
                    return 'black';
                }
            }
        },
        methods: {
            changeActiveItem(index){
                this.$emit('change', index);
                this.closeSelect();
            },
            closeSelect(){
                this.select.active = false;
            },
            toggleSelect(){
                this.select.active = !this.select.active;
            },
            eventOnKeyDown(e){
                this.onEscHandler(e,this.closeSelect)
            }
        },
        watch:{
            'select.active': function (newValue) {
                if(newValue){
                    this.$nextTick(()=>{
                        document.addEventListener('click', this.closeSelect);
                        document.addEventListener('keydown', this.eventOnKeyDown);
                    })
                } else {
                    document.removeEventListener('click', this.closeSelect)
                    document.removeEventListener('keydown', this.eventOnKeyDown)
                }
            }
        },
    }
</script>