<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.SECTION.text-info#about
        +e.container.container.text
            +e.title.title--standart Кому подойдет
            p {{ title }}

            h3 Развиваем навыки и знания
            ul.images-3-6
                li(
                    v-for="(skill,index) in skills"
                    :key="index"
                )
                    img(
                        :src="'/public/images/icons-small/' + skill.source"
                    )
                    p {{ skill.title }}

            div(
                v-html="content"
            )
</template>

<script>
    export default {
        props:['title','content','skills']
    }
</script>