import {deviceSize} from "../../../mixins/frontEnd/deviceSize";
import {onEscHandler} from "/mixins/frontEnd/onEscHandler";
import {disablePageScroll, enablePageScroll} from 'scroll-lock';

import {inputParentLogic} from "../../../mixins/blanks/input/inputParentLogic";
import Input from '../../../components/blanks/Input.vue';

import Textarea from "../../../components/blanks/Textarea.vue";

export const popupLogic = {
    mixins: [onEscHandler, deviceSize, inputParentLogic],
    props: ['active'],
    data(){
        return{
            popup: {
                loading: false,
                send: false,
                height: null
            },
        }
    },
    mounted(){
        setTimeout(()=>{
            let offsetTop = this.$refs.body.getBoundingClientRect().top < 0 ? 0 : this.$refs.body.getBoundingClientRect().top;
            this.popup.height = `${this.$refs.body.scrollHeight}px`;
            this.wrapperAbsolute = (parseInt(this.popup.height, 10) + offsetTop) < window.innerHeight;
        },500);
    },
    methods: {
        closePopup() {
            this.$emit('closePopup');
        },
        clearPopup(){
            this.popup.loading = false;
            this.popup.send = false;
            if(this.clearForm){
                this.clearForm();
            }
            setTimeout(()=>{
                let offsetTop = this.$refs.body.getBoundingClientRect().top < 0 ? 0 : this.$refs.body.getBoundingClientRect().top;
                this.popup.height = `${this.$refs.body.scrollHeight}px`;
                this.wrapperAbsolute = (parseInt(this.popup.height, 10) + offsetTop) < window.innerHeight;
            },200)
        },
        onSendResponse() {
            this.popup.loading = false;
            this.popup.send = true;
            setTimeout(()=>{
                if(!this.deviceSize.mobile) {
                    this.popup.height = `${this.$refs.response.getBoundingClientRect().height}px`;
                    this.wrapperAbsolute = true;
                }
            },200)
        },
        onClosePopup(e){
            this.onEscHandler(e,this.closePopup);
        }
    },
    watch: {
        active: function (newValue) {
            if(newValue) {
                disablePageScroll(this.$refs.popup);
                document.addEventListener('keyup', this.onClosePopup);
            }else {
                enablePageScroll();
                document.removeEventListener('keyup', this.onClosePopup);
                setTimeout(()=> {
                    this.clearPopup();
                }, 300);
            }
        }
    },
    components: {
        'input-component': Input,
        'textarea-component': Textarea,
    }
};