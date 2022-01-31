export const inputDatepickerParentLogic = {
    data(){
        return{
            dateRange: {
                start: null,
                end: null
            }
        }
    },
    methods: {
        getDateRange(value){
            this.dateRange.start = value.start
            this.dateRange.end = value.end
        }
    }
}