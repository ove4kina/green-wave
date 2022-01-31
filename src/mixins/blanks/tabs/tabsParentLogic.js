export const tabsParentLogic = {
    data(){
        return{
            tabs: {
                activeIndex: 0
            }
        }
    },
    methods: {
        changeActiveTabIndex(index){
            if(this.sliderInit){
                this.sliderInit = false;
                this.$nextTick(()=>{
                    this.sliderInit = true;
                })
            }
            this.tabs.activeIndex = index;
        }
    }
};