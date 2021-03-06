function getTitle(vm) {
    const {title} = vm.$options
    if (title) {
        return typeof title === 'function'
            ? title.call(vm)
            : title
    }
}

function getMeta(vm) {
    const {meta} = vm.$options
    if (meta) {
        return typeof meta === 'function'
            ? meta.call(vm)
            : meta
    }
}

function getBrowser(vm) {
    const {browser} = vm.$options
    if (browser) {
        return typeof browser === 'function'
            ? browser.call(vm)
            : browser
    }
}

const serverTitleMixin = {
    created() {
        const title = getTitle(this)
        const meta = getMeta(this)
        const browser = getBrowser(this)
        if (title) {
            this.$ssrContext.title = `${title} | Зеленая волна`
        }
        if (meta) {
            this.$ssrContext.meta = `${meta}`
        }
        if (browser) {
            this.$ssrContext.browser = `${browser}`
        }
    }
}

const clientTitleMixin = {
    mounted() {
        const title = getTitle(this)
        if (title) {
            document.title = `${title} | Зеленая волна`
        }
    }
}

export default process.env.VUE_ENV === 'server'
    ? serverTitleMixin
    : clientTitleMixin
