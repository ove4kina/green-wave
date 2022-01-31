<template lang="pug">
    include ../../tools/mixins.pug
    +b.SECTION.order
        +e.container.container
            +e.H2.title.title--small Начните путь к новым достижениям
            +e.text.text
                p Оставьте форму заполнения онлайн и мы свяжемся с вами в ближайшее время. Также можем проконсультировать по любому интересующему вас вопросу.
            +e.form.form__(
                :class="{'loading': form.loading ,'send': form.send}"
            )
                +e.stage--body
                    +e.line
                        +e.INPUT-COMPONENT.input(
                            v-model="inputs.name.value"
                            :placeholder="inputs.name.placeholder"
                            :name="inputs.name.name"
                            @changeValue="changeInputValue"
                        )
                    +e.line
                        +e.INPUT-COMPONENT.input(
                            v-model="inputs.phone.value"
                            :placeholder="inputs.phone.placeholder"
                            :name="inputs.phone.name"
                            :type="inputs.email.tel"
                            @changeValue="changeInputValue"
                        )
                    +e.line
                        +e.INPUT-COMPONENT.input(
                            v-model="inputs.email.value"
                            :placeholder="inputs.email.placeholder"
                            :name="inputs.email.name"
                            :type="inputs.email.type"
                            @changeValue="changeInputValue"
                        )
                    +e.line
                        +e.TEXTAREA-COMPONENT.input(
                            v-model="inputs.text.value"
                            :placeholder="inputs.text.placeholder"
                            :name="inputs.text.name"
                            :type="inputs.text.type"
                            @changeValue="changeInputValue"
                        )
                    +e.line
                        +e.BUTTON.button.button--big.--bg-green.--shadow-green.--text-white.--icon.--mail(
                            v-on:click="sendForm"
                        )
                            span Отправить заявку
                        +e.privacy Нажимая кнопку «Отправить заявку», вы подтверждаете согласие на обработку данных в соответствии с #[a(href="/catalog/privacy") политикой обработки персональных данных]
                +e.stage--preloader
                    +e.line
                        .lds-roller
                            div
                            div
                            div
                            div
                            div
                            div
                            div
                            div
                +e.stage--response(
                    ref="response"
                )
                    +e.line
                        +e.text--response
                            p Благодарим вас за обращение
                            span Мы свяжемся с вами и ответим на все интересующие вас вопросы.

        +e.background
            img(src="/public/images/order/people.jpg").people
</template>

<script>
    import Input from '../blanks/Input.vue'
    import Textarea from '../blanks/Textarea.vue'
    import {inputParentLogic} from "../../mixins/blanks/input/inputParentLogic";
    import axios from 'axios';

    export default {
        mixins: [inputParentLogic],
        data(){
            return{
                inputs: {
                    name: {
                        value: '',
                        placeholder: 'Ваше имя',
                        error: false,
                        name: 'name'
                    },
                    phone: {
                        value: '',
                        placeholder: 'Телефон',
                        error: false,
                        name: 'phone',
                        type: 'tel'
                    },
                    email: {
                        value: '',
                        placeholder: 'E-mail',
                        error: false,
                        name: 'email',
                        type: 'email'
                    },
                    text: {
                        value: '',
                        placeholder: 'Комментарий',
                        error: false,
                        name: 'text'
                    }
                },
                form: {
                    loading: false,
                    send: false,
                },
            }
        },
        methods: {
            sendForm() {
                if(this.validate()){
                    this.form.loading = true;

                    axios.post('http://green-wave-api.burno.io/api/form/recall', {
                        phone: this.inputs.phone.value,
                        name: this.inputs.name.value,
                        email: this.inputs.email.value,
                        comment: this.inputs.text.value,
                    })
                        .then((response) => {
                            let data = response.data;
                            if(data.status === 'ok') {
                                setTimeout(()=>{
                                    this.onSendResponse();
                                },1000);
                            }
                        })
                        .catch(error => {
                        });

                    setTimeout(()=>{
                        this.onSendResponse();
                    },1000);
                }
            },
            validate() {
                return true;
            },
            onSendResponse(){
                this.form.loading = false;
                this.form.send = true;
            },
        },
        components: {
            'input-component': Input,
            'textarea-component': Textarea
        }
    }
</script>