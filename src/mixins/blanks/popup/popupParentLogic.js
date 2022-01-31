export const popupParentLogic = {
    data(){
        return {
            popups: {
                recall: {
                    active: false
                },
                order: {
                    active: false,
                    title: '',
                    date: '',
                },
                question: {
                    active: false,
                }
            },
        }
    },
    methods: {
        closePopup(name){
            this.popups[name].active = false;
        },
        openPopup(name){
            this.popups[name].active = true;
        },
    }
};