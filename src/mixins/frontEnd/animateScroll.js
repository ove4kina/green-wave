import animateScrollTo from 'animated-scroll-to';

export const animateScroll = {
    data(){
        return{

        }
    },
    methods: {
        scrollTo(id){
            let element = id === 'header' ? 0 : document.getElementById(id),
                scrollableElement = window.innerWidth >= 1200 ? document.getElementById('app') : window;
            console.log(id)
            animateScrollTo(
                    element,
                {
                    elementToScroll: scrollableElement,
                    easing:  t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
                    speed: 500,
                });
        }
    }
}