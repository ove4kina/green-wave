import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Index from '../components/pages/Index.vue';

import Program from '../components/pages/Program.vue';

import Camp from '../components/pages/Camp.vue';

import Blog from '../components/pages/Blog.vue';

import Portal from '../components/pages/Portal.vue';

import Report from '../components/pages/Report.vue';

import Camps from '../components/pages/Camps.vue';

import Programs from '../components/pages/Programs.vue';

import Article from '../components/pages/Article.vue';

import TextPage from "../components/pages/TextPage.vue";

import ParentsInfo from "../components/pages/ParentsInfo.vue";

import TeachersInfo from "../components/pages/TeachersInfo.vue";

import PageInfo from "../components/pages/PageInfo.vue";

import Privacy from '../components/pages/Privacy.vue';

import NotFound from '../components/pages/NotFound.vue';

export function createRouter() {
    return new Router({
        mode: 'history',
        fallback: false,
        scrollBehavior: (to, from, savedPosition) => {
            document.getElementById('app').scrollIntoView();
            return null;
        },
        routes: [
            {
                path: '',
                name: 'main',
                component: Index,
            },
            {
                path: '/program/:url',
                name: 'program',
                component: Program,
            },
            {
                path: '/reports',
                name: 'portal',
                component: Portal
            },
            {
                path: '/report/:url',
                name: 'report',
                component: Report,
            },
            {
                path: '/camp/:url',
                name: 'camp',
                component: Camp,
            },
            {
                path: '/blog',
                name: 'blog',
                component: Blog,
            },
            {
                path: '/camps',
                name: 'camps',
                component: Camps,
            },
            {
                path: '/programs',
                name: 'programs',
                component: Programs,
            },
            {
                path: '/article/:url',
                name: 'article',
                component: Article,
            },
            {
                path: '/parents',
                name: 'parents-info',
                component: ParentsInfo,
            },
            {
                path: '/teachers',
                name: 'teachers-info',
                component: TeachersInfo,
            },
            {
                path: '/catalog/:url',
                name: 'page-info',
                component: PageInfo,
            },
            {
                path: '/catalog/:url/:urlItem',
                name: 'text-page',
                component: TextPage,
            },
            {
                path: '/privacy',
                name: 'privacy',
                component: Privacy,
            },
            {
                path: '*',
                name: '404',
                component: NotFound,
            }
        ]
    });
}