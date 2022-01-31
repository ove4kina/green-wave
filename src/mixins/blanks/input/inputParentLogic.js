export const inputParentLogic = {
    data(){
        return{

        }
    },
    methods: {
        changeInputValue(event){
            this.inputs[event.name].value = event.value;
        }
    }
};