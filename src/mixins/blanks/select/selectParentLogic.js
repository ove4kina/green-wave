export const selectParentLogic = {
    data(){
        return{
            select: {
                activeIndex: null
            }
        }
    },
    methods: {
        changeSelectActiveItem(id,participant,name){
            participant[name].value = parseInt(id,10)
        }
    }
}