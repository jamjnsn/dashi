<template>
    <div id="app">
        <topbar></topbar>
        <div class="container">
            <div class="modules">
                <component v-for="(module, index) in modules" v-bind:is="module.type" :settings="module"></component>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                ...this.$settings.data
            }
        },
        mounted () {
        },
        methods: {
            reload() {
                this.$settings.reload()
            }
        },
        components: {
            // Menu,
            // Module
        }
    }
</script>

<style lang="scss">
    @import '../sass/app';
</style>

<style scoped lang="scss">
    .modules {
        margin-top: 50px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
</style>