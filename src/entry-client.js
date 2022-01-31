import Vue from 'vue'
import 'es6-promise/auto'
import {createApp} from './app'
import ProgressBar from './components/blanks/ProgressBar.vue'

import Vuebar from 'vuebar';
Vue.use(Vuebar);

import VueScrollTo from 'vue-scrollto';
Vue.use(VueScrollTo,{
    duration: 1000,
    easing: "ease-out",
});
import VueImg from 'v-img';
Vue.use(VueImg);
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount();
document.body.appendChild(bar.$el);




Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        const {asyncData} = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
});


const {app, router, store} = createApp();

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    // Add router hook for handling asyncData.
    // Doing it after initial route is resolved so that we don't double-fetch
    // the data that we already have. Using router.beforeResolve() so that all
    // async components are resolved.

    router.beforeResolve((to, from, next) => {
        router.pageFrom = from.name;
        router.pageFromAnimation = from.meta.animation;
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        });
        const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
        if (!asyncDataHooks.length) {
            return next()
        }
        bar.start()
        Promise.all(asyncDataHooks.map(hook => hook({store, route: to})))
            .then(() => {
                bar.finish()
                next()
            })
            .catch(next)

    });
    // actually mount to DOM
    app.$mount('#app')

});


// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker.js')
}
