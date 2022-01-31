<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.SECTION.text-info#about
        +e.container.container
            +e.text.text
                h2 Кому подойдет
                p {{ title }}
                ul.images
                    li(
                        v-for="skill in skills"
                    )
                        img(:src="'/public/images/icons-big/' + skill.source")
                        h4 {{ skill.title }}
                        p {{ skill.description }}
                +e.tasks(
                    v-html="content"
                )

</template>

<script>
    export default {
        props:['title','content','skills']
    }
</script>