export const counterParentLogic = {
    data(){
        return {
            counter: {
                placeholder: 'лет'
            }
        }
    },
    methods: {
        changeCounter(participant,data){
            let defaultMin = 6;

            if(typeof data.min !== 'undefined') {
                defaultMin = data.min;
            }

            switch (data.sign) {
                case 'minus':
                    if(parseInt(participant.age.value,10) > defaultMin) {
                        participant.age.value--
                    }
                    break;
                case 'plus':
                    participant.age.value++
                    break;
            }
        }
    }
}