<template>
    <div id="app">
        Welcome!
    </div>
</template>

<script>

export default {
    data () {
        return {}
    },
    mounted () {
    },
    methods: {
        reload() {
            this.$settings.reload()
        }
    }
}
</script>

<style lang="scss">
@import '~bulma';
</style>