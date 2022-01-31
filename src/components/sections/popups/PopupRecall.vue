<template lang="pug">
    include ../../../tools/mixins.pug
    +b.SECTION.popup(
        :class="{'active': active, 'loading': popup.loading ,'send': popup.send}"
        ref="popup"
        v-on:click="closePopup"
    )
        template(
            v-if="!deviceSize.desktop"
        )
            +e.scroller
                +e.content(
                    :class="{'popup__content--absolute': wrapperAbsolute}"
                )
                    +e.wrapper--small(
                    v-on:click.stop="true === true"
                    :style="{'height': popup.height}"
                    )
                        +e.close(
                            v-on:click="closePopup"
                        )
                        +e.stage--body(
                            ref="body"
                        )
                            +e.text--decription
                                p Обратная связь
                                span Заполните форму, чтобы зарегистрировать участников и после мы с вами свяжемся.
                            +e.layout
                                +e.line
                                    +e.INPUT-COMPONENT.input(
                                    v-model="inputs.name.value"
                                    :placeholder="inputs.name.placeholder"
                                    :error="inputs.name.error"
                                    :name="inputs.name.name"
                                    @changeValue="changeInputValue"
                                    )
                                +e.line
                                    +e.INPUT-COMPONENT.input(
                                    v-model="inputs.phone.value"
                                    :placeholder="inputs.phone.placeholder"
                                    :error="inputs.phone.error"
                                    :name="inputs.phone.name"
                                    :type="inputs.phone.type"
                                    @changeValue="changeInputValue"
                                    )
                                +e.line
                                    +e.INPUT-COMPONENT.input(
                                    v-model="inputs.email.value"
                                    :placeholder="inputs.email.placeholder"
                                    :error="inputs.email.error"
                                    :name="inputs.email.name"
                                    :type="inputs.email.type"
                                    @changeValue="changeInputValue"
                                    )
                                +e.line--buttons
                                    +e.BUTTON.button.button--big.--bg-green.--icon.--mail.--text-white(
                                        v-on:click="send"
                                    )
                                        span Отправить
                                +e.line
                                    +e.disclamer Нажимая кнопку «Отправить», вы подтверждаете согласие на обработку данных в соответствии с #[a(href="/catalog/privacy") политикой обработки персональных данных]
                        +e.stage--response(
                            ref="response"
                        )
                            +e.text--response
                                p Благодарим вас за обращение
                                span Мы свяжемся с вами и ответим на все интересующие вас вопросы.
                            +e.BUTTON.button.button--big.--bg-blue.--text-white(
                                v-on:click="closePopup"
                            )
                                span Закрыть
                        +e.stage--preloader
                            .lds-roller
                                div
                                div
                                div
                                div
                                div
                                div
                                div
                                div
        vuescroll(
            :ops="customScrollOptions"
            v-if="deviceSize.desktop"
        )
            +e.scroller
                +e.content(
                    :class="{'popup__content--absolute': wrapperAbsolute}"
                )
                    +e.wrapper--small(
                        v-on:click.stop="true === true"
                        :style="{'height': popup.height}"
                    )
                        +e.close(
                            v-on:click="closePopup"
                        )
                        +e.stage--body(
                            ref="body"
                        )
                            +e.text--decription
                                p Обратная связь
                                span Заполните форму, чтобы зарегистрировать участников и после мы с вами свяжемся.
                            +e.layout
                                +e.line
                                    +e.INPUT-COMPONENT.input(
                                        v-model="inputs.name.value"
                                        :placeholder="inputs.name.placeholder"
                                        :error="inputs.name.error"
                                        :name="inputs.name.name"
                                        @changeValue="changeInputValue"
                                    )
                                +e.line
                                    +e.INPUT-COMPONENT.input(
                                        v-model="inputs.phone.value"
                                        :placeholder="inputs.phone.placeholder"
                                        :error="inputs.phone.error"
                                        :name="inputs.phone.name"
                                        :type="inputs.phone.type"
                                        @changeValue="changeInputValue"
                                    )
                                +e.line
                                    +e.INPUT-COMPONENT.input(
                                        v-model="inputs.email.value"
                                        :placeholder="inputs.email.placeholder"
                                        :error="inputs.email.error"
                                        :name="inputs.email.name"
                                        :type="inputs.email.type"
                                        @changeValue="changeInputValue"
                                    )
                                +e.line--buttons
                                    +e.BUTTON.button.button--big.--bg-green.--icon.--mail.--text-white(
                                        v-on:click="send"
                                    )
                                        span Отправить
                                +e.line
                                    +e.P.disclamer Нажимая кнопку «Отправить», вы подтверждаете согласие на обработку данных в соответствии с #[a(href="/catalog/privacy") политикой обработки персональных данных]
                        +e.stage--response(
                            ref="response"
                        )
                            +e.text--response
                                p Благодарим вас за обращение
                                span Мы свяжемся с вами и ответим на все интересующие вас вопросы.
                            +e.BUTTON.button.button--big.--bg-blue.--text-white(
                                v-on:click="closePopup"
                            )
                                span Закрыть
                        +e.stage--preloader
                            .lds-roller
                                div
                                div
                                div
                                div
                                div
                                div
                                div
                                div
</template>

<script>
    import {initCustomScroll} from "../../../mixins/frontEnd/initCustomScroll";
    import {popupLogic} from "../../../mixins/blanks/popup/popupLogic";
    import axios from 'axios';
    export default {
        mixins: [initCustomScroll, popupLogic],
        data(){
            return{
                wrapperAbsolute: false,
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
                        type: 'phone'
                    },
                    email: {
                        value: '',
                        placeholder: 'E-mail',
                        error: false,
                        name: 'email',
                        type: 'email'
                    }
                }
            }
        },
        methods: {
            send() {
                if(this.validate()){
                    this.popup.loading = true;

                    axios.post('http://green-wave-api.burno.io/api/form/recall', {
                        phone: this.inputs.phone.value,
                        name: this.inputs.name.value,
                        email: this.inputs.email.value,
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
                }
            },
            validate() {
                this.inputs.name.error = this.inputs.name.value === '';
                this.inputs.phone.error = this.inputs.phone.value === '';
                this.inputs.email.error = this.inputs.email.value === '';

                return (!this.inputs.name.error && !this.inputs.phone.error && !this.inputs.email.error);
            },
            clearForm() {
                this.inputs = {
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
                        type: 'phone'
                    },
                    email: {
                        value: '',
                        placeholder: 'E-mail',
                        error: false,
                        name: 'email',
                        type: 'email'
                    }
                }
            },
        },
    }
</script>