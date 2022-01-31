<template lang="pug">
    include ../../tools/mixins.pug

    +b.HEADER.header#header(
        ref="header"
        :style="{'transform': top}"
    )
        +e.container--main.container(
            :class="{'white': menu.active}"
        )
            +e.left
                +e.ROUTER-LINK.logo(
                    to="/"
                )
                    img.light(
                        src="/public/images/header/logo-light.svg"
                        v-if="color === 'white' && !menu.active"
                    )
                    img.dark(
                        src="/public/images/header/logo-dark.svg"
                        v-if="color === 'blue' || menu.active"
                    )
                +e.menu
                    +e.ROUTER-LINK.link.link--standart(
                        v-for="(link,index) in menu.links"
                        :key="index"
                        :to="link.href"
                        :class="['link--' + computedColor]"
                    )
                        span {{link.name}}
            +e.right
                +e.socials
                    +e.A.social--vk(
                        :class="'header__social--' + computedColor"
                        target="_blank"
                        href="https://vk.com/green_wave_camp"
                    )
                    +e.A.social--fb(
                        :class="'header__social--' + computedColor"
                        href="https://www.facebook.com/Центр-одаренных-детей-Волна-107211174123621"
                        target="_blank"
                    )
                    +e.A.social--instagram(
                        :class="'header__social--' + computedColor"
                        href="https://instagram.com/volna_talant"
                        target="_blank"
                    )
                +e.A.phone.link--standart(
                    :class="['link--' + computedColor, 'header__phone--' + computedColor]"
                    href="tel:8442968685"
                )
                    span 8 (8442) 96-86-85
                +e.BUTTON.button.button.--square-icon.--ring.--bg-blue.--shadow-blue.--text-white(
                    v-on:click="openPopup"
                )
                    span
                +e.hamburger.hamburger__(
                    :class="['hamburger--' + computedColor,{'active': menu.active}]"
                    v-on:click="toggleMenu"
                )
                    +e.line
                        span
                    +e.line
                        span
                        span
                    +e.line
                        span
        +e.mobile-menu(
            :class="{'active': menu.active}"
            ref="mobileMenu"
        )
            +e.container.container
                +e.SITE-CARD-COMPONENT.site-card(
                    :color="'blue'"
                    @openPopup="openPopup"
                )
</template>

<script>
    import { disablePageScroll, enablePageScroll } from 'scroll-lock';
    import {deviceSize} from "../../mixins/frontEnd/deviceSize";
    import {getScroll} from "../../mixins/frontEnd/getScroll";
    import SiteCard from '../blanks/SiteCard.vue'
    export default {
        props: ['color'],
        mixins: [deviceSize,getScroll],
        data(){
            return{
                top: null,
                headerHeight: null,
                menu: {
                    active: false,
                    links: [
                        {
                            name: 'О нас',
                            href: '/catalog/about'
                        },
                        {
                            name: 'Смены',
                            href: '/camps'
                        },
                        {
                            name: 'Программы',
                            href: '/programs'
                        },
                        {
                            name: 'Медиа-портал',
                            href: '/reports'
                        },
                        {
                            name: 'Родителям',
                            href: '/catalog/parents'
                        },
                        {
                            name: 'Педагогам',
                            href: '/catalog/teachers'
                        },
                        {
                            name: 'Новости',
                            href: '/blog'
                        }
                    ],
                }

            }
        },
        mounted(){
            this.headerHeight = this.$refs.header.getBoundingClientRect().height;
            this.mutableColor = this.color;
            window.addEventListener('resize', this.onResize);
            if(window.innerWidth >= 1200) {
                this.setHeaderTranslate();
                window.top.addEventListener('scroll', (e)=>{
                    console.log(e)
                });
                document.getElementById('app').addEventListener('scroll', this.setHeaderTranslate);
            } else {
                document.getElementById('app').removeEventListener('scroll', this.setHeaderTranslate);
            }
        },
        computed: {
            computedColor: function () {
                if(this.menu.active){
                    return 'blue';
                } else {
                    return this.color;
                }
            }
        },
        methods:{
            onResize(){
                this.removeScrollLock();
            },
            setHeaderTranslate(){
                let element = document.getElementById('app');
                this.top = `translateY(-${element.scrollTop}px)`;
                if(element.scrollTop >= this.headerHeight && typeof this.headerHeight !== 'undefined'){
                    this.top = `translateY(-100%)`;
                }
            },
            removeScrollLock(){
                if(window.innerWidth >= 1200 && this.menu.active){
                    enablePageScroll(this.$refs.mobileMenu);
                    this.menu.active = false
                }
            },
            toggleMenu(){
                this.menu.active = !this.menu.active;

                if(this.menu.active) {
                    disablePageScroll(this.$refs.mobileMenu);
                } else {
                    enablePageScroll(this.$refs.mobileMenu);
                }
            },
            openPopup() {
                if(!this.deviceSize.desktop) {
                    this.toggleMenu();
                }
                this.$emit('openPopup');

            }
        },
        destroyed() {
            if(window.innerWidth >= 1200){
                document.getElementById('app').removeEventListener('scroll', this.hideHeader);
            }
            enablePageScroll(this.$refs.mobileMenu);
        },
        components: {
            'site-card-component': SiteCard
        }
    }
</script>