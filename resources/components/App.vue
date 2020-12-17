<template>
    <div id="app" :style="theme">
        <topbar></topbar>
        <div class="container">
            <div class="modules">
                <component 
                    v-for="(module, index) in settings.modules" 
                    v-bind:is="module.type" 
                    :settings="module">
                    </component>
            </div>
        </div>
        <settings></settings>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                settings: this.$settings.data
            }
        },
        mounted () {
        },
        methods: {
        },
        computed: {
            theme() {
                return {
                    '--accent-color': this.settings.theme.accentColor
                }
            }
        },
        watch: {
            settings: {
                handler(val) {
                    this.$settings.save()
                },
                deep: true
            }
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
        align-items: flex-start;
    }
</style>