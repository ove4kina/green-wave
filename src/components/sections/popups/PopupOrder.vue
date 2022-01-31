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
            +e.scroller(
                :class="{'popup__scroller--absolute': wrapperAbsolute}"
            )
                +e.content
                    +e.wrapper--big(
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
                                p Онлайн-запись
                                span Заполните форму, чтобы зарегистрировать участников и после мы с вами свяжемся.
                            +e.information--date
                                p {{title}}
                                p {{date}}
                            +e.information--people(
                                v-if="participants.length !== 0"
                            )
                                p Количество участников
                                p {{participants.length}} чел.
                            +e.layout
                                +e.steps(
                                    :style="{'height': steps.height}"
                                )
                                    +e.step--participant(
                                        ref="stepParticipant"
                                        :class="{'active': steps.active === 'participant','hide': steps.active === 'owner'}"
                                    )
                                        +e.person(
                                            v-for="(participant, index) in participants"
                                        )
                                            +e.line
                                                +e.title Участник №{{index + 1}}
                                            +e.line
                                                +e.SELECT-COMPONENT.select(
                                                    :activeIndex="participant.sex.value"
                                                    :list="select.list"
                                                    :placeholder="select.placeholder"
                                                    @change="changeSelectActiveItem($event,participant,'sex')"
                                                )
                                                +e.COUNTER-COMPONENT.counter(
                                                    :value="participant.age.value"
                                                    :placeholder="counter.placeholder"
                                                    :min="counter.min"
                                                    @change="changeCounter(participant,$event)"
                                                )
                                            +e.line
                                                +e.INPUT-COMPONENT.input(
                                                    v-model="participant.firstName.value"
                                                    :placeholder="'Фамилия'"
                                                    :error="participant.firstName.error"
                                                    :name="'firstName'"
                                                    @changeValue="changeInputValue($event,participant,'firstName')"
                                                )
                                            +e.line
                                                +e.INPUT-COMPONENT.input(
                                                    v-model="participant.secondName.value"
                                                    :placeholder="'Имя'"
                                                    :error="participant.secondName.error"
                                                    :name="'secondName'"
                                                    @changeValue="changeInputValue($event,participant,'secondName')"
                                                )
                                            +e.line
                                                +e.INPUT-COMPONENT.input(
                                                    v-model="participant.thirdName.value"
                                                    :placeholder="'Отчество'"
                                                    :error="participant.thirdName.error"
                                                    :name="'Отчество'"
                                                    @changeValue="changeInputValue($event,participant,'thirdName')"
                                                )
                                            +e.line
                                                +e.INPUT-COMPONENT.input(
                                                    v-model="participant.snils.value"
                                                    :placeholder="'СНИЛС'"
                                                    :error="participant.snils.error"
                                                    :name="'snils'"
                                                    @changeValue="changeInputValue($event,participant,'snils')"
                                                )
                                            +e.line
                                                +e.INPUT-COMPONENT.input(
                                                    v-model="participant.birthCertificate.value"
                                                    :placeholder="'Номер свидетельства о рождении'"
                                                    :error="participant.birthCertificate.error"
                                                    :name="'birthdayNumber'"
                                                    @changeValue="changeInputValue($event,participant,'birthCertificate')"
                                                )
                                            +e.line
                                                +e.INPUT-COMPONENT.input(
                                                    v-model="participant.address.value"
                                                    :placeholder="'Фактическое место проживания'"
                                                    :error="participant.address.error"
                                                    :name="'address'"
                                                    @changeValue="changeInputValue($event,participant,'address')"
                                                )
                                        +e.line--buttons
                                            +e.BUTTON.button--line.--add.button--big.--icon.--add-man.--border-gray(
                                                v-on:click="addParticipant"
                                                type="button"
                                            )
                                                span Добавить участника
                                            +e.BUTTON.button--line.--next.button--big.--bg-green.--icon.--icon-after.--arrow.--text-white(
                                                v-on:click="changeStep('owner')"
                                                type="button"
                                            )
                                                span Далее
                                    +e.step--owner(
                                        ref="stepOwner"
                                        :class="{'active': steps.active === 'owner', 'hide': steps.active !== 'owner'}"
                                    )
                                        +e.line
                                            +e.title Ваши контактные данные
                                        +e.line
                                            +e.INPUT-COMPONENT.input(
                                                v-model="inputs.owner.name.value"
                                                :placeholder="inputs.owner.name.placeholder"
                                                :error="inputs.owner.name.error"
                                                :name="inputs.owner.name.name"
                                                @changeValue="changeInputValue($event,inputs.owner,'name')"
                                            )
                                        +e.line
                                            +e.INPUT-COMPONENT.input(
                                                v-model="inputs.owner.phone.value"
                                                :placeholder="inputs.owner.phone.placeholder"
                                                :error="inputs.owner.phone.error"
                                                :name="inputs.owner.phone.name"
                                                :type="inputs.owner.phone.type"
                                                @changeValue="changeInputValue($event,inputs.owner,'phone')"
                                            )
                                        +e.line
                                            +e.INPUT-COMPONENT.input(
                                                v-model="inputs.owner.email.value"
                                                :placeholder="inputs.owner.email.placeholder"
                                                :error="inputs.owner.email.error"
                                                :name="inputs.owner.email.name"
                                                :type="inputs.owner.email.type"
                                                @changeValue="changeInputValue($event,inputs.owner,'email')"
                                            )
                                        +e.line--buttons
                                            +e.BUTTON.button--line.--back.button--big.--icon.--arrow-one.--border-gray(
                                                v-on:click="changeStep('participant')"
                                                type="button"
                                            )
                                                span Назад к участникам
                                            +e.BUTTON.button--line.--send.button--big.--bg-green.--icon.--icon-after.--mail.--text-white(
                                                v-on:click="send"
                                                type="button"
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
            ref="vuescroll"
            v-if="deviceSize.desktop"
        )
            +e.scroller(
                data-scroll-lock-scrollable
                :class="{'popup__scroller--absolute': wrapperAbsolute}"
            )
                +e.content
                    +e.wrapper--big(
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
                                p Онлайн-запись
                                span Заполните форму, чтобы зарегистрировать участников и после мы с вами свяжемся.
                            +e.information--date
                                p {{title}}
                                p {{date}}
                            +e.information--people(
                                v-if="participants.length !== 0"
                            )
                                p Количество участников
                                p {{participants.length}} чел.
                            +e.layout
                                +e.steps(
                                    :style="{'height': steps.height}"
                                )
                                    +e.step--participant(
                                        ref="stepParticipant"
                                        :class="{'active': steps.active === 'participant','hide': steps.active === 'owner'}"
                                    )
                                        +e.person(
                                            v-for="(participant, index) in participants"
                                        )
                                            +e.line
                                                +e.title Участник №{{index + 1}}
                                            +e.line
                                                +e.SELECT-COMPONENT.select(
                                                    :activeIndex="participant.sex.value"
                                                    :list="select.list"
                                                    :placeholder="select.placeholder"
                                                    @change="changeSelectActiveItem($event,participant,'sex')"
                                                )
                                                +e.COUNTER-COMPONENT.counter(
                                                    :value="participant.age.value"
                                                    :placeholder="counter.placeholder"
                                                    :min="counter.min"
                                                    @change="changeCounter(participant,$event)"
                                                )
                                            +e.line
                                                +e.INPUT-COMPONENT.input(
                                                    v-model="participant.firstName.value"
                                                    :placeholder="'Фамилия'"
                                                    :error="participant.firstName.error"
                                                    :name="'firstName'"
                                                    @changeValue="changeInputValue($event,participant,'firstName')"
                                                )
                                            +e.line
                                                +e.INPUT-COMPONENT.input(
                                                    v-model="participant.secondName.value"
                                                    :placeholder="'Имя'"
                                                    :error="participant.secondName.error"
                                                    :name="'secondName'"
                                                    @changeValue="changeInputValue($event,participant,'secondName')"
                                                )
                                            +e.line
                                                +e.INPUT-COMPONENT.input(
                                                    v-model="participant.thirdName.value"
                                                    :placeholder="'Отчество'"
                                                    :error="participant.thirdName.error"
                                                    :name="'Отчество'"
                                                    @changeValue="changeInputValue($event,participant,'thirdName')"
                                                )
                                            +e.line
                                                +e.INPUT-COMPONENT.input(
                                                    v-model="participant.snils.value"
                                                    :placeholder="'СНИЛС'"
                                                    :error="participant.snils.error"
                                                    :name="'snils'"
                                                    @changeValue="changeInputValue($event,participant,'snils')"
                                                )
                                            +e.line
                                                +e.INPUT-COMPONENT.input(
                                                    v-model="participant.birthCertificate.value"
                                                    :placeholder="'Номер свидетельства о рождении'"
                                                    :error="participant.birthCertificate.error"
                                                    :name="'birthdayNumber'"
                                                    @changeValue="changeInputValue($event,participant,'birthCertificate')"
                                                )
                                            +e.line
                                                +e.INPUT-COMPONENT.input(
                                                    v-model="participant.address.value"
                                                    :placeholder="'Фактическое место проживания'"
                                                    :error="participant.address.error"
                                                    :name="'address'"
                                                    @changeValue="changeInputValue($event,participant,'address')"
                                                )
                                        +e.line--buttons
                                            +e.BUTTON.button--line.--add.button--big.--icon.--add-man.--border-gray(
                                                v-on:click="addParticipant"
                                                type="button"
                                            )
                                                span Добавить участника
                                            +e.BUTTON.button--line.--next.button--big.--bg-green.--icon.--icon-after.--arrow.--text-white(
                                                v-on:click="changeStep('owner')"
                                                type="button"
                                            )
                                                span Далее
                                    +e.step--owner(
                                        ref="stepOwner"
                                        :class="{'active': steps.active === 'owner', 'hide': steps.active !== 'owner'}"
                                    )
                                        +e.line
                                            +e.title Ваши контактные данные
                                        +e.line
                                            +e.INPUT-COMPONENT.input(
                                                v-model="inputs.owner.name.value"
                                                :placeholder="inputs.owner.name.placeholder"
                                                :error="inputs.owner.name.error"
                                                :name="inputs.owner.name.name"
                                                @changeValue="changeInputValue($event,inputs.owner,'name')"
                                            )
                                        +e.line
                                            +e.INPUT-COMPONENT.input(
                                                v-model="inputs.owner.phone.value"
                                                :placeholder="inputs.owner.phone.placeholder"
                                                :error="inputs.owner.phone.error"
                                                :name="inputs.owner.phone.name"
                                                :type="inputs.owner.phone.type"
                                                @changeValue="changeInputValue($event,inputs.owner,'phone')"
                                            )
                                        +e.line
                                            +e.INPUT-COMPONENT.input(
                                                v-model="inputs.owner.email.value"
                                                :placeholder="inputs.owner.email.placeholder"
                                                :error="inputs.owner.email.error"
                                                :name="inputs.owner.email.name"
                                                :type="inputs.owner.email.type"
                                                @changeValue="changeInputValue($event,inputs.owner,'email')"
                                            )
                                        +e.line--buttons
                                            +e.BUTTON.button--line.--back.button--big.--icon.--arrow-one.--border-gray(
                                                v-on:click="changeStep('participant')"
                                                type="button"
                                            )
                                                span Назад к участникам
                                            +e.BUTTON.button--line.--send.button--big.--bg-green.--icon.--icon-after.--mail.--text-white(
                                                v-on:click="send"
                                                type="button"
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
</template>

<script>
    import Input from '../../blanks/Input.vue';
    import Counter from '../../blanks/Counter.vue'
    import Select from '../../blanks/Select.vue'

    import {initCustomScroll} from "../../../mixins/frontEnd/initCustomScroll";
    import {counterParentLogic} from "../../../mixins/blanks/counter/counterParentLogic";
    import {selectParentLogic} from "../../../mixins/blanks/select/selectParentLogic";
    import {popupLogic} from "../../../mixins/blanks/popup/popupLogic";
    import {deviceSize} from "../../../mixins/frontEnd/deviceSize";

    export default {
        mixins: [initCustomScroll,counterParentLogic,selectParentLogic, popupLogic,deviceSize],
        props: [
            'title',
            'date'
        ],
        data(){
            return{
                counter: {
                    min: 6,
                },
                wrapperAbsolute: false,
                participants: [
                    {
                        firstName: {
                            value: '',
                            error: false,
                        },
                        secondName: {
                            value: '',
                            error: false,
                        },
                        thirdName: {
                            value: '',
                            error: false,
                        },
                        snils: {
                            value: '',
                            error: false,
                        },
                        birthCertificate: {
                            value: '',
                            error: false,
                        },
                        address: {
                            value: '',
                            error: false,
                        },
                        sex:  {
                            value: 0,
                            error: false
                        },
                        age:  {
                            value: 10,
                            error: false
                        },
                    }
                ],
                select: {
                    placeholder: 'Пол',
                    list: [
                        {
                            value: 'Мальчик',
                        },
                        {
                            value: 'Девочка',
                        },

                    ]
                },
                inputs: {
                    owner: {
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
                steps: {
                    height: null,
                    active: 'participant'
                }
            }
        },
        methods: {
            changeInputValue(event, participant, name){
                // this.inputs[context][event.name].value = event.value;
                participant[name].value = event.value;
            },
            addParticipant(){
                if(this.validateParticipants()) {
                    this.participants.push(
                        {
                            firstName: {
                                value: '',
                                error: false,
                            },
                            secondName: {
                                value: '',
                                error: false,
                            },
                            thirdName: {
                                value: '',
                                error: false,
                            },
                            snils: {
                                value: '',
                                error: false,
                            },
                            birthCertificate: {
                                value: '',
                                error: false,
                            },
                            address: {
                                value: '',
                                error: false,
                            },
                            sex:  {
                                value: 0,
                                error: false
                            },
                            age:  {
                                value: 10,
                                error: false
                            },
                        }
                    );

                    setTimeout(()=> {
                        let rem = 16;
                        if(window.innerWidth >= 414 && window.innerWidth < 640){
                            rem = 20;
                        } else if(window.innerWidth >= 640 && window.innerWidth < 1200){
                            rem = 16;
                        } else if(window.innerWidth >= 1200 && window.innerWidth < 1800) {
                            rem = window.innerWidth/100;
                        } else if(window.innerWidth >= 1800) {
                            rem = 18
                        }
                        let offsetTop = this.$refs.body.getBoundingClientRect().top < 0 ? 0 : this.$refs.body.getBoundingClientRect().top;
                        if(window.innerWidth < 1200){
                            this.popup.height =  `${this.$refs.body.scrollHeight + 2.5 * rem}px`;
                        } else {
                            this.popup.height =  `${this.$refs.body.scrollHeight + 3.33333 * rem}px`;
                        }
                        this.wrapperAbsolute = (parseInt(this.popup.height, 10) + offsetTop) < window.innerHeight;
                    })
                }
            },
            changeStep(name) {
                switch (name) {
                    case 'participant':
                        this.steps.height = `${this.$refs.stepParticipant.scrollHeight}px`;
                        break;
                    case 'owner':
                        if(this.validateParticipants()) {
                            this.steps.height = `${this.$refs.stepOwner.scrollHeight}px`;
                            this.wrapperAbsolute = true;
                            break;
                        }
                        return;
                }

                this.steps.active = name;

                setTimeout(()=>{
                    let offsetTop = this.$refs.body.getBoundingClientRect().top < 0 ? 0 : this.$refs.body.getBoundingClientRect().top;
                    this.popup.height =  `${this.$refs.body.getBoundingClientRect().height}px`;
                    this.wrapperAbsolute = (parseInt(this.popup.height, 10) + offsetTop) < window.innerHeight;
                },200)
            },
            send() {
                if(this.validate()){
                    this.popup.loading = true;
                    this.$emit('send',{
                        participants: this.participants,
                        name: this.inputs.owner.name.value,
                        phone: this.inputs.owner.phone.value,
                        email: this.inputs.owner.email.value
                    });
                    setTimeout(()=>{
                        this.onSendResponse();
                    },1000);
                }
            },
            clearForm() {
                this.inputs = {
                    participant: {
                        firstName: {
                            value: '',
                                placeholder: 'Имя',
                                error: false,
                                name: 'firstName'
                        },
                        secondName: {
                            value: '',
                                placeholder: 'Фамилия',
                                error: false,
                                name: 'secondName'
                        },
                        thirdName: {
                            value: '',
                                placeholder: 'Отчество',
                                error: false,
                                name: 'thirdName'
                        },
                        snils: {
                            value: '',
                                placeholder: 'Номер СНИЛС',
                                error: false,
                                name: 'snils'
                        },
                        birthCertificate: {
                            value: '',
                                placeholder: 'Номер свидетельства о рождении',
                                error: false,
                                name: 'birthCertificate'
                        },
                        location: {
                            value: '',
                                placeholder: 'Фактическое место проживания',
                                error: false,
                                name: 'location'
                        },
                    },
                    owner: {
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
                                name: 'name',
                                type: 'email'
                        }
                    }
                };
                this.participants = [
                    {
                        firstName: {
                            value: '',
                            error: false,
                        },
                        secondName: {
                            value: '',
                            error: false,
                        },
                        thirdName: {
                            value: '',
                            error: false,
                        },
                        snils: {
                            value: '',
                            error: false,
                        },
                        birthCertificate: {
                            value: '',
                            error: false,
                        },
                        address: {
                            value: '',
                            error: false,
                        },
                        sex:  {
                            value: 0,
                            error: false
                        },
                        age:  {
                            value: 10,
                            error: false
                        },
                    }
                ];
               setTimeout(()=>{
                   this.select.activeIndex = 0;
                   this.steps.height = `${this.$refs.stepParticipant.scrollHeight}px`;
                   this.select.activeIndex = 0;
                   this.counter.value = 12;
                   this.changeStep('participant');
               });
            },

            validateChild(participant) {
                participant.firstName.error = participant.firstName.value === '';
                participant.secondName.error = participant.secondName.value === '';
                participant.thirdName.error = participant.thirdName.value === '';
                participant.snils.error = participant.snils.value === '';
                participant.birthCertificate.error = participant.birthCertificate.value === '';
                participant.address.error = participant.address.value === '';
                return (!participant.firstName.error && !participant.secondName.error && !participant.thirdName.error && !participant.snils.error && !participant.birthCertificate.error && !participant.address.error);
            },

            validateParticipants() {
                let participantValidate = true;

                for(let i = 0; i < this.participants.length; i++) {
                    if(!this.validateChild(this.participants[i])) {
                        participantValidate = false;
                    }
                }

                return participantValidate;
            },

            validate() {
                this.inputs.owner.name.error = this.inputs.owner.name.value === '';
                this.inputs.owner.phone.error = this.inputs.owner.phone.value === '';
                this.inputs.owner.email.error = this.inputs.owner.email.value === '';

                return (!this.inputs.owner.name.error && !this.inputs.owner.phone.error && !this.inputs.owner.email.error);
            },
        },

        mounted(){
            this.select.activeIndex = 0;
            this.changeStep('participant');
        },
        components: {
            'input-component': Input,
            'counter-component': Counter,
            'select-component': Select
        }
    }
</script>