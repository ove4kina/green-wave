import vuescroll from 'vuescroll';
export const initCustomScroll = {
    data(){
        return {
            customScrollOptions: {
                vuescroll: {
                    mode: 'native',
                    sizeStrategy: 'percent',
                    detectResize: true,
                },
                scrollPanel: {
                    scrollingX: false,
                },
                rail: {
                    background: 'transparent',
                    size: '3px',
                    specifyBorderRadius: '2px',
                },
                bar: {
                    background: '#E7E7E7',
                    specifyBorderRadius: '2px',
                    size: '3px'
                }
            }
        }
    },
    components: {
        vuescroll
    }
};
