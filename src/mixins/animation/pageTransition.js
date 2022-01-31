export const pageTransition =  {
    data() {
        return {
            animationPage: {
                hide: false,
                time: 400,
            },
        }
    },
    created() {
        if(typeof window !== 'undefined'){
            if(window.innerWidth >= 1200){
                this.setInitStage();
            }
        }
    },
    mounted() {
        document.getElementById('app').scrollTop = 0;
        if(window.innerWidth >= 1200){
            this.releasePage();
        }
    },
    beforeRouteLeave(to, from, next) {
        if(window.innerWidth >= 1200){
            this.hidePage();
            setTimeout(() => {
                next();
            }, this.animationPage.time)

        } else {
            next();
        }
    },
    beforeRouteUpdate(to, from, next) {
        document.getElementById('app').scrollTop = 0;
        if(window.innerWidth >= 1200){
            if(to.name === 'page-info' && from.name === 'page-info') {
                this.hidePage();
                setTimeout(() => {
                    next();
                }, this.animationPage.time)
            } else{
                next();
            }


        } else {
            next();
        }
    },
    updated() {
        if(this.$router.history.current.name === 'page-info' && this.$router.pageFrom === 'page-info') {
            setTimeout(()=> {
                this.setUpdateStage();
            }, this.animationPage.time)
        }

    },
    methods: {
        hidePage(){
            this.animationPage.hide = true
        },
        setInitStage(){
            this.animationPage.hide = true
        },
        setUpdateStage(){
            this.animationPage.hide = false
        },
        releasePage(){
            this.animationPage.hide = false
        }
    }
};