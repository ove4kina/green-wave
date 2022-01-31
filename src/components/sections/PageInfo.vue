<template lang="pug">
    include ../../tools/mixins.pug
    +b.SECTION.page-info
        +e.container.container
            +e.text.text(v-html="catalog.content_first")
            +e.text.text
                router-link.card(
                    v-for="(item,index) in catalog.items"
                    :key="index"
                    v-if="item.show_catalog_item === '1'"
                    :to="catalog.url + '/' + item.url"
                ) {{ item.name }}
            +e.text.text(
                v-html="catalog.content_second"
            )
</template>

<script>
    export default {
        props: ['catalog'],
        data() {
            return {
            }
        }
    }
</script>