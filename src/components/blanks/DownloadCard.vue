<template lang="pug">
    include ../../tools/mixins.pug
    +b.download-card
        +e.A.column--title(
            :href="content.file"
        ) {{content.title}}
        +e.column--filesize {{ formatBytes(content.filesize,true) }}

</template>

<script>
    export default {
        props: [
            'content'
        ],
        data() {
            return {}
        },
        methods: {
            formatBytes(bytes, si) {
                let thresh = si ? 1000 : 1024;
                if (Math.abs(bytes) < thresh) {
                    return bytes + ' B';
                }
                let units = si
                    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
                    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
                let u = -1;
                do {
                    bytes /= thresh;
                    ++u;
                } while (Math.abs(bytes) >= thresh && u < units.length - 1);
                return bytes.toFixed(1) + ' ' + units[u];
            }
        }
    }
</script>